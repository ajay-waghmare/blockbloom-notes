---
name: microservices
description: Enforces microservices architecture patterns - service decomposition, API gateway, inter-service communication, circuit breakers, service discovery, and containerization.
command: micro
---

# Microservices Architecture Skill

## When Triggered

Activate when:
- User creates a new service
- Code touches inter-service communication
- Docker/K8s files are modified
- API gateway configuration changes
- User says `/micro` or `/enterprise micro`

## Service Structure Standard

Every microservice MUST follow:

```
[service-name]/
├── src/
│   ├── config/
│   │   ├── index.ts              ← Central config (env vars)
│   │   ├── database.ts           ← DB connection config
│   │   ├── redis.ts              ← Redis connection config
│   │   └── messaging.ts          ← Message broker config
│   ├── controllers/
│   │   └── [resource].controller.ts  ← HTTP handlers ONLY
│   ├── services/
│   │   ├── [resource].service.ts     ← Business logic
│   │   └── [resource].service.interface.ts ← Contract
│   ├── repositories/
│   │   └── [resource].repository.ts  ← Data access ONLY
│   ├── models/
│   │   ├── entities/             ← DB entities
│   │   ├── dtos/                 ← Input/Output DTOs
│   │   └── mappers/              ← Entity <-> DTO
│   ├── events/
│   │   ├── publishers/           ← Emit events
│   │   └── subscribers/          ← Handle events
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error-handler.middleware.ts
│   │   └── logging.middleware.ts
│   ├── utils/
│   ├── health/
│   │   └── health.controller.ts  ← /health endpoint (MANDATORY)
│   └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── Dockerfile
├── .env.example
└── package.json
```

## Architecture Rules

### 1. Service Independence
- Each service has its OWN database (no shared databases)
- Services communicate via APIs or events, NEVER direct DB access
- Each service is independently deployable

### 2. API Gateway Pattern
```typescript
// Gateway routes - single entry point
const routes = {
  '/api/users/*': { target: 'http://user-service:3001' },
  '/api/orders/*': { target: 'http://order-service:3002' },
  '/api/payments/*': { target: 'http://payment-service:3003' },
  '/api/products/*': { target: 'http://medusa:9000' },
  '/api/content/*': { target: 'http://strapi:1337' },
};
// Gateway handles: auth, rate limiting, logging, CORS
```

### 3. Inter-Service Communication

**Synchronous (REST/gRPC)** - for queries:
```typescript
// GOOD: Using HTTP client with circuit breaker
@Injectable()
export class UserClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly circuitBreaker: CircuitBreakerService,
  ) {}

  async getUser(id: string): Promise<UserDTO> {
    return this.circuitBreaker.execute(
      'user-service',
      () => this.httpService.get(`/api/users/${id}`),
      () => this.getFallbackUser(id), // fallback on failure
    );
  }
}
```

**Asynchronous (Events)** - for commands/state changes:
```typescript
// GOOD: Emit event, don't call directly
await this.eventBus.publish('order.created', {
  orderId, userId, items, total
});
// Other services subscribe and react independently
```

### 4. Circuit Breaker Pattern (MANDATORY)
```typescript
// Every external service call MUST have:
// 1. Timeout
// 2. Retry with backoff
// 3. Circuit breaker
// 4. Fallback

const circuitBreakerConfig = {
  failureThreshold: 5,        // Open after 5 failures
  resetTimeout: 30000,         // Try again after 30s
  requestTimeout: 3000,        // 3s timeout per request
  retries: 3,                  // Retry 3 times
  retryDelay: 1000,            // 1s between retries
};
```

### 5. Health Checks (MANDATORY for every service)
```typescript
// Every service MUST expose /health
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: process.env.SERVICE_NAME,
      version: process.env.VERSION,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      dependencies: {
        database: this.checkDB(),
        redis: this.checkRedis(),
        messageBroker: this.checkBroker(),
      }
    };
  }
}
```

### 6. Docker Standard
```dockerfile
# Multi-stage build (MANDATORY)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -s /bin/sh -D appuser
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
```

### 7. Docker Compose (Development)
```yaml
version: '3.8'
services:
  api-gateway:
    build: ./services/api-gateway
    ports: ['8080:8080']
    depends_on: [user-service, order-service]

  user-service:
    build: ./services/user-service
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - BROKER_URL=amqp://rabbitmq
    depends_on: [postgres, redis, rabbitmq]

  postgres:
    image: postgres:16-alpine
    volumes: ['pgdata:/var/lib/postgresql/data']

  redis:
    image: redis:7-alpine

  rabbitmq:
    image: rabbitmq:3-management-alpine
```

## Violations to Catch

- Service calling another service's database directly
- No health endpoint
- No circuit breaker on external calls
- Shared database between services
- Business logic in controllers
- No Docker multi-stage build
- Hardcoded service URLs (should use env vars / service discovery)
- No request timeout configured
- Synchronous chain of 3+ service calls (should be event-driven)
