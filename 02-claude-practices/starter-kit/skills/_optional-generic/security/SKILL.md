---
name: security
description: Security skill - enforces JWT/OAuth authentication, RBAC authorization, input validation, rate limiting, CORS, helmet, SQL injection prevention, XSS protection, and OWASP Top 10 compliance.
command: secure
---

# Security Skill

## When Triggered

Activate when:
- Authentication/authorization code is written
- API endpoints are created or modified
- User input handling is involved
- Environment/secrets configuration changes
- User says `/secure` or `/enterprise secure`

## Authentication Standard

### JWT Implementation
```typescript
// GOOD: JWT with refresh token rotation
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly redis: Redis,
  ) {}

  async login(credentials: LoginDTO): Promise<TokenPair> {
    const user = await this.userRepo.findByEmail(credentials.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    // NEVER say "wrong password" - don't reveal which field is wrong

    // Access token: short-lived
    const accessToken = this.jwtService.sign(
      { sub: user.id, role: user.role },
      { expiresIn: '15m' }   // MANDATORY: Short expiry
    );

    // Refresh token: longer-lived, stored in Redis
    const refreshToken = uuid();
    await this.redis.setex(
      `refresh:${refreshToken}`,
      604800,  // 7 days
      JSON.stringify({ userId: user.id, tokenVersion: user.tokenVersion })
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    const stored = await this.redis.get(`refresh:${refreshToken}`);
    if (!stored) throw new UnauthorizedException('Invalid refresh token');

    // Delete used refresh token (rotation - MANDATORY)
    await this.redis.del(`refresh:${refreshToken}`);

    const { userId, tokenVersion } = JSON.parse(stored);
    const user = await this.userRepo.findById(userId);

    // Check token version (allows forced logout)
    if (user.tokenVersion !== tokenVersion) {
      throw new UnauthorizedException('Token revoked');
    }

    return this.generateTokenPair(user);
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await this.redis.del(`refresh:${refreshToken}`);
    // Blacklist access token until expiry
    await this.redis.setex(`blacklist:${userId}`, 900, '1'); // 15min
  }
}
```

### Password Rules
```typescript
// MANDATORY: Password hashing
const SALT_ROUNDS = 12; // Minimum 12

async hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// MANDATORY: Password validation
const passwordSchema = z.string()
  .min(8, 'Minimum 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase')
  .regex(/[a-z]/, 'Must contain lowercase')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');
```

## Authorization - RBAC
```typescript
// Role-based access control
export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  GUEST = 'guest',
}

// Permission-based guard
@Injectable()
export class PermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    const user = context.switchToHttp().getRequest().user;

    return requiredPermissions.every(
      permission => user.permissions.includes(permission)
    );
  }
}

// Usage
@Controller('orders')
export class OrderController {
  @Get()
  @Permissions('orders:read')
  findAll() { /* ... */ }

  @Delete(':id')
  @Permissions('orders:delete')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)  // Extra role check
  delete() { /* ... */ }
}
```

## Input Validation (MANDATORY on every endpoint)
```typescript
// Use Zod or class-validator - NEVER trust user input
import { z } from 'zod';

export const CreateOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive().max(100),
  })).min(1).max(50),
  shippingAddress: z.object({
    street: z.string().min(1).max(200).trim(),
    city: z.string().min(1).max(100).trim(),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    country: z.string().length(2),       // ISO country code
  }),
  couponCode: z.string().max(50).optional(),
  // NEVER accept: role, isAdmin, price (server-controlled fields)
});

// Sanitize HTML to prevent XSS
import DOMPurify from 'isomorphic-dompurify';
const sanitized = DOMPurify.sanitize(userInput);
```

## API Security Middleware Stack
```typescript
// app.ts - MANDATORY middleware order
const app = express();

// 1. Helmet - security headers
app.use(helmet({
  contentSecurityPolicy: true,
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// 2. CORS - restrict origins
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
}));

// 3. Rate limiting
app.use(rateLimit({
  windowMs: 60 * 1000,    // 1 minute
  max: 100,                // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.headers['x-forwarded-for'],
}));

// 4. Body parser with limits
app.use(express.json({ limit: '10kb' }));  // MANDATORY: size limit
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// 5. Request logging (sanitized)
app.use(requestLogger);  // Never log passwords, tokens, or PII

// 6. Auth middleware
app.use('/api', authMiddleware);
```

## Environment & Secrets
```bash
# .env.example (MANDATORY: committed to repo)
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=
DB_PASSWORD=                    # NEVER commit actual values

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=                     # Min 256-bit, generated per environment
JWT_REFRESH_SECRET=
JWT_EXPIRY=15m

# External APIs
STRIPE_SECRET_KEY=              # NEVER commit
MEDUSA_API_KEY=

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

```gitignore
# .gitignore - MANDATORY
.env
.env.local
.env.production
*.pem
*.key
credentials.json
service-account.json
```

## SQL Injection Prevention
```typescript
// GOOD: Parameterized queries
const user = await db.query(
  'SELECT * FROM users WHERE email = $1 AND status = $2',
  [email, 'active']
);

// GOOD: ORM with built-in protection
const user = await repo.findOne({ where: { email } });

// BAD: String concatenation (SQL INJECTION!)
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

## OWASP Top 10 Checklist

| # | Risk | Protection |
|---|------|-----------|
| 1 | Broken Access Control | RBAC + permission guards on every endpoint |
| 2 | Cryptographic Failures | bcrypt for passwords, AES-256 for data, TLS everywhere |
| 3 | Injection | Parameterized queries, input validation, ORM |
| 4 | Insecure Design | Threat modeling, principle of least privilege |
| 5 | Security Misconfiguration | Helmet, CORS, no defaults, no debug in prod |
| 6 | Vulnerable Components | npm audit, automated dependency updates |
| 7 | Auth Failures | JWT rotation, MFA, account lockout |
| 8 | Data Integrity Failures | Signed JWTs, CI/CD pipeline integrity, SRI |
| 9 | Logging Failures | Structured logging, never log secrets, audit trail |
| 10 | SSRF | URL validation, allowlist external calls, no user-controlled URLs |

## Violations to Catch

- Passwords stored in plain text or weak hash (MD5/SHA1)
- JWT without expiry or expiry > 1 hour
- No input validation on API endpoints
- Missing CORS configuration
- Secrets in source code or git history
- No rate limiting
- SQL string concatenation
- Missing helmet/security headers
- Console.log with sensitive data
- No HTTPS enforcement in production
- Default credentials in any environment
- Missing .env in .gitignore
- No brute-force protection on login
- Exposing stack traces in production errors
