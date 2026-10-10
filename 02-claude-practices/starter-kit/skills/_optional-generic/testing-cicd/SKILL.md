---
name: testing-cicd
description: Testing & CI/CD skill - enforces unit/integration/e2e testing standards, Jest/Vitest patterns, GitHub Actions pipelines, Docker builds, environment management, and deployment strategies.
command: test-cicd
---

# Testing & CI/CD Skill

## When Triggered

Activate when:
- Test files are created or modified
- CI/CD pipeline files (.github/workflows, Jenkinsfile) are changed
- User discusses testing strategy or deployment
- User says `/test-cicd` or `/enterprise test`

## Testing Standards

### Test File Structure
```
tests/
├── unit/                      ← Fast, isolated, mock everything
│   ├── services/
│   │   └── order.service.spec.ts
│   └── utils/
│       └── validator.spec.ts
├── integration/               ← Test with real DB/Redis
│   ├── repositories/
│   │   └── order.repository.spec.ts
│   └── api/
│       └── order.api.spec.ts
├── e2e/                       ← Full flow tests
│   ├── order-flow.e2e.spec.ts
│   └── auth-flow.e2e.spec.ts
├── fixtures/                  ← Test data
│   ├── users.fixture.ts
│   └── orders.fixture.ts
├── helpers/                   ← Test utilities
│   ├── test-db.ts
│   └── test-factory.ts
└── jest.config.ts
```

### Unit Test Pattern (MANDATORY for services)
```typescript
// tests/unit/services/order.service.spec.ts
describe('OrderService', () => {
  let service: OrderService;
  let mockOrderRepo: jest.Mocked<OrderRepository>;
  let mockEventPublisher: jest.Mocked<EventPublisher>;
  let mockRedisCache: jest.Mocked<CacheService>;

  beforeEach(() => {
    mockOrderRepo = createMock<OrderRepository>();
    mockEventPublisher = createMock<EventPublisher>();
    mockRedisCache = createMock<CacheService>();

    service = new OrderService(mockOrderRepo, mockEventPublisher, mockRedisCache);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createOrder', () => {
    it('should create order and publish event', async () => {
      // Arrange
      const input = OrderFixture.createInput();
      const expected = OrderFixture.createOrder();
      mockOrderRepo.save.mockResolvedValue(expected);

      // Act
      const result = await service.createOrder(input);

      // Assert
      expect(result).toEqual(expected);
      expect(mockOrderRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ userId: input.userId })
      );
      expect(mockEventPublisher.publish).toHaveBeenCalledWith(
        'order.created',
        expect.objectContaining({ orderId: expected.id })
      );
    });

    it('should throw if user not found', async () => {
      mockOrderRepo.save.mockRejectedValue(new UserNotFoundException());

      await expect(service.createOrder(OrderFixture.createInput()))
        .rejects.toThrow(UserNotFoundException);
    });

    it('should invalidate cache after creation', async () => {
      mockOrderRepo.save.mockResolvedValue(OrderFixture.createOrder());

      await service.createOrder(OrderFixture.createInput());

      expect(mockRedisCache.invalidate).toHaveBeenCalledWith('orders:*');
    });
  });
});
```

### Integration Test Pattern
```typescript
// tests/integration/api/order.api.spec.ts
describe('Order API (Integration)', () => {
  let app: INestApplication;
  let db: DataSource;

  beforeAll(async () => {
    // Use test database
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider('REDIS_CLIENT')
    .useValue(createMockRedis())
    .compile();

    app = module.createNestApplication();
    db = module.get(DataSource);
    await app.init();
  });

  beforeEach(async () => {
    await db.query('DELETE FROM orders');
    await db.query('DELETE FROM users');
    // Seed test data
    await seedTestUser(db);
  });

  afterAll(async () => {
    await db.destroy();
    await app.close();
  });

  it('POST /api/orders - creates order', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ items: [{ productId: '123', quantity: 2 }] })
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      status: 'pending',
      items: expect.arrayContaining([
        expect.objectContaining({ productId: '123' }),
      ]),
    });

    // Verify in database
    const dbOrder = await db.query('SELECT * FROM orders WHERE id = $1', [response.body.id]);
    expect(dbOrder).toHaveLength(1);
  });
});
```

### Test Coverage Requirements
```
Minimum coverage targets:
├── Services:      80%+ (business logic is critical)
├── Controllers:   70%+ (API contract testing)
├── Repositories:  60%+ (integration tests)
├── Utils:         90%+ (pure functions, easy to test)
└── Overall:       75%+
```

## CI/CD Pipeline Standards

### GitHub Actions Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io

jobs:
  # Stage 1: Lint & Type Check
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  # Stage 2: Unit Tests (parallel per service)
  unit-tests:
    runs-on: ubuntu-latest
    needs: quality
    strategy:
      matrix:
        service: [user-service, order-service, payment-service]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: cd services/${{ matrix.service }} && npm ci
      - run: cd services/${{ matrix.service }} && npm run test:unit -- --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-${{ matrix.service }}
          path: services/${{ matrix.service }}/coverage/

  # Stage 3: Integration Tests
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7-alpine
        ports: ['6379:6379']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test:integration
        env:
          DB_HOST: localhost
          DB_PORT: 5432
          REDIS_HOST: localhost

  # Stage 4: Build Docker Images
  build:
    runs-on: ubuntu-latest
    needs: integration-tests
    if: github.ref == 'refs/heads/main'
    strategy:
      matrix:
        service: [api-gateway, user-service, order-service, payment-service]
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: ./services/${{ matrix.service }}
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.service }}:${{ github.sha }}
            ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.service }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Stage 5: Deploy
  deploy-staging:
    runs-on: ubuntu-latest
    needs: build
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - run: |
          # Update K8s manifests with new image tags
          # Apply to staging cluster

  deploy-production:
    runs-on: ubuntu-latest
    needs: deploy-staging
    environment: production  # Requires manual approval
    steps:
      - uses: actions/checkout@v4
      - run: |
          # Rolling update to production
```

### Environment Strategy
```
Feature Branch → PR → develop → staging → main → production

develop:    Auto-deploy to dev environment
staging:    Auto-deploy after integration tests pass
production: Manual approval required, rolling deployment
```

## Violations to Catch

- No tests for services with business logic
- Tests without assertions (it('should work', () => {}))
- Tests with hardcoded dates/timestamps
- Missing afterEach cleanup (test pollution)
- No integration tests for API endpoints
- CI pipeline without test stage
- No coverage reporting
- Docker build without multi-stage
- Missing health check in Docker
- No environment-based deployment gates
- Secrets hardcoded in pipeline files
- No parallel test execution for services
