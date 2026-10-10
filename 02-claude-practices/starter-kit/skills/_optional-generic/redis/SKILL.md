---
name: redis
description: Redis skill - enforces caching strategies, key naming, TTL policies, session management, rate limiting, pub/sub patterns, and Redis cluster best practices.
command: cache
---

# Redis Skill

## When Triggered

Activate when:
- Redis/ioredis/bull code is involved
- Caching logic is added or modified
- Session, rate limiting, or queue features
- User says `/cache` or `/enterprise cache`

## Redis Usage Patterns

### 1. Key Naming Convention (MANDATORY)
```
[service]:[entity]:[identifier]:[sub-key]

Examples:
  user-service:user:123:profile
  order-service:order:456:status
  api-gateway:rate-limit:192.168.1.1
  session:user:789
  cache:product:catalog:page:1
  lock:order:456:processing
  queue:notifications:pending
```

**Rules:**
- Always use colon `:` as separator
- Always prefix with service name
- Never use spaces or special characters
- Keep keys human-readable

### 2. Connection Configuration
```typescript
// config/redis.ts
import Redis from 'ioredis';

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB, 10) || 0,

  // MANDATORY: Connection resilience
  retryStrategy(times: number) {
    const delay = Math.min(times * 200, 5000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  connectTimeout: 10000,

  // MANDATORY: Key prefix per service
  keyPrefix: `${process.env.SERVICE_NAME}:`,
};

// Singleton pattern
let redisClient: Redis;
export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(redisConfig);
    redisClient.on('error', (err) => logger.error('Redis error:', err));
    redisClient.on('connect', () => logger.info('Redis connected'));
  }
  return redisClient;
}
```

### 3. Caching Patterns

**Cache-Aside (most common)**
```typescript
@Injectable()
export class ProductCacheService {
  constructor(private readonly redis: Redis) {}

  async getProduct(id: string): Promise<Product> {
    const cacheKey = `cache:product:${id}`;

    // 1. Try cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 2. Cache miss → fetch from DB
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException();

    // 3. Store in cache with TTL (MANDATORY: always set TTL)
    await this.redis.setex(cacheKey, 3600, JSON.stringify(product)); // 1hr TTL

    return product;
  }

  // MANDATORY: Invalidation on write
  async updateProduct(id: string, data: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepo.update(id, data);

    // Invalidate cache
    await this.redis.del(`cache:product:${id}`);
    await this.redis.del('cache:product:catalog:*'); // List cache too

    // Publish invalidation event for other service instances
    await this.redis.publish('cache:invalidate', JSON.stringify({
      type: 'product',
      id,
    }));

    return product;
  }
}
```

**Write-Through Cache**
```typescript
async saveOrder(order: Order): Promise<Order> {
  // Write to DB AND cache simultaneously
  const [saved] = await Promise.all([
    this.orderRepo.save(order),
    this.redis.setex(
      `cache:order:${order.id}`,
      1800, // 30min TTL
      JSON.stringify(order)
    ),
  ]);
  return saved;
}
```

### 4. TTL Strategy (MANDATORY)
```typescript
const TTL = {
  // Hot data (frequently accessed)
  SESSION: 86400,           // 24 hours
  USER_PROFILE: 3600,       // 1 hour
  PRODUCT_DETAIL: 1800,     // 30 minutes

  // Warm data
  PRODUCT_CATALOG: 600,     // 10 minutes
  SEARCH_RESULTS: 300,      // 5 minutes

  // Cold data
  REPORTS: 60,              // 1 minute
  RATE_LIMIT: 60,           // 1 minute window

  // Locks
  DISTRIBUTED_LOCK: 30,     // 30 seconds max
};

// RULE: NEVER store without TTL (memory leak risk)
// BAD:  redis.set('key', value)
// GOOD: redis.setex('key', TTL.PRODUCT_DETAIL, value)
```

### 5. Rate Limiting
```typescript
@Injectable()
export class RateLimitService {
  async checkRateLimit(
    identifier: string,
    maxRequests: number = 100,
    windowSeconds: number = 60,
  ): Promise<{ allowed: boolean; remaining: number }> {
    const key = `rate-limit:${identifier}`;
    const current = await this.redis.incr(key);

    if (current === 1) {
      await this.redis.expire(key, windowSeconds);
    }

    return {
      allowed: current <= maxRequests,
      remaining: Math.max(0, maxRequests - current),
    };
  }
}
```

### 6. Distributed Locking
```typescript
async acquireLock(resource: string, ttlMs: number = 30000): Promise<string | null> {
  const lockId = uuid();
  const key = `lock:${resource}`;

  // SET NX with expiry (atomic)
  const result = await this.redis.set(key, lockId, 'PX', ttlMs, 'NX');

  return result === 'OK' ? lockId : null;
}

async releaseLock(resource: string, lockId: string): Promise<boolean> {
  // Lua script for atomic check-and-delete
  const script = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  const result = await this.redis.eval(script, 1, `lock:${resource}`, lockId);
  return result === 1;
}
```

### 7. Session Management
```typescript
const sessionConfig = {
  store: new RedisStore({
    client: redisClient,
    prefix: 'session:',
    ttl: 86400, // 24 hours
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 86400000,
    sameSite: 'strict',
  },
};
```

### 8. Queue Pattern (BullMQ)
```typescript
import { Queue, Worker } from 'bullmq';

// Producer
const emailQueue = new Queue('notifications:email', {
  connection: redisClient,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});

await emailQueue.add('welcome-email', {
  to: user.email,
  template: 'welcome',
});

// Consumer
const worker = new Worker('notifications:email', async (job) => {
  await emailService.send(job.data);
}, {
  connection: redisClient,
  concurrency: 5,
});
```

## Violations to Catch

- SET without TTL (memory leak)
- Inconsistent key naming (no prefix, wrong separator)
- Storing large objects (>1MB) in Redis
- No connection error handling
- Using Redis as primary database (should be cache/session only)
- No cache invalidation strategy
- Missing retry logic on Redis operations
- Storing sensitive data without encryption
- No key prefix per service (key collisions)
- Using blocking operations (KEYS *) in production
- No pub/sub for multi-instance cache invalidation
