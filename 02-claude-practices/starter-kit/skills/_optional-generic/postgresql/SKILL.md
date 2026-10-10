---
name: postgresql
description: PostgreSQL skill - enforces database design, migrations, query optimization, indexing strategy, connection pooling, TypeORM/Prisma patterns, and data integrity.
command: db
---

# PostgreSQL Database Skill

## When Triggered

Activate when:
- Database models/entities are created or modified
- SQL queries, migrations, or ORM code is written
- Performance issues related to database
- User says `/db` or `/enterprise db`

## Database Design Standards

### Naming Conventions
```sql
-- Tables: snake_case, plural
CREATE TABLE order_items (...);       -- GOOD
CREATE TABLE OrderItem (...);         -- BAD

-- Columns: snake_case
created_at, updated_at, user_id      -- GOOD
createdAt, UpdatedAt                  -- BAD

-- Primary keys: always 'id'
id UUID DEFAULT gen_random_uuid()     -- GOOD
order_item_id                         -- BAD

-- Foreign keys: [table_singular]_id
user_id, order_id, product_id        -- GOOD

-- Indexes: idx_[table]_[columns]
idx_orders_user_id                   -- GOOD
idx_orders_status_created_at         -- GOOD

-- Constraints: chk_[table]_[description], uq_[table]_[columns]
chk_orders_total_positive            -- GOOD
uq_users_email                       -- GOOD
```

### Table Template (MANDATORY fields)
```sql
CREATE TABLE [table_name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Business columns here

  -- MANDATORY: Audit columns
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,          -- Soft delete
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),

  -- Version for optimistic locking
  version INTEGER NOT NULL DEFAULT 1
);

-- MANDATORY: Updated_at trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON [table_name]
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();

-- MANDATORY: Index on foreign keys
CREATE INDEX idx_[table]_[fk_column] ON [table_name]([fk_column]);
```

### Migration Standards
```typescript
// GOOD: Versioned, reversible migration
// migrations/1710000000000-CreateOrdersTable.ts
export class CreateOrdersTable1710000000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        status VARCHAR(50) NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
        total DECIMAL(12,2) NOT NULL CHECK (total >= 0),
        currency VARCHAR(3) NOT NULL DEFAULT 'USD',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMPTZ
      );

      CREATE INDEX idx_orders_user_id ON orders(user_id);
      CREATE INDEX idx_orders_status ON orders(status);
      CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
    `);
  }

  // MANDATORY: Every up() must have a down()
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS orders CASCADE`);
  }
}
```

### Entity Pattern (TypeORM)
```typescript
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Index('idx_orders_user_id')
  userId: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @VersionColumn()
  version: number;
}
```

### Query Optimization Rules

```typescript
// GOOD: Select only needed columns
const users = await repo.find({
  select: ['id', 'name', 'email'],
  where: { status: 'active' },
});

// BAD: Select * (fetches everything)
const users = await repo.find({ where: { status: 'active' } });

// GOOD: Pagination
const [items, total] = await repo.findAndCount({
  skip: (page - 1) * limit,
  take: limit,
  order: { createdAt: 'DESC' },
});

// BAD: Load all records
const items = await repo.find();

// GOOD: Eager load relations when needed
const order = await repo.findOne({
  where: { id },
  relations: ['items', 'items.product'],
});

// BAD: N+1 query problem
const orders = await repo.find();
for (const order of orders) {
  order.items = await itemRepo.find({ where: { orderId: order.id } });
}
```

### Connection Pooling (MANDATORY)
```typescript
// config/database.ts
export const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // MANDATORY: Connection pool settings
  extra: {
    max: 20,                    // Max connections
    min: 5,                     // Min idle connections
    idleTimeoutMillis: 30000,   // Close idle after 30s
    connectionTimeoutMillis: 5000,
    statement_timeout: 30000,    // Kill queries after 30s
  },

  // MANDATORY: SSL in production
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: true, ca: process.env.DB_CA_CERT }
    : false,

  logging: process.env.NODE_ENV !== 'production' ? ['query', 'error'] : ['error'],
};
```

### Indexing Strategy
```sql
-- MUST index: Foreign keys, WHERE clause columns, ORDER BY columns
-- CONSIDER: Composite indexes for common query patterns
-- AVOID: Over-indexing (slows writes)

-- Composite index for common queries
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index for active records
CREATE INDEX idx_orders_active ON orders(created_at)
  WHERE deleted_at IS NULL;

-- GIN index for JSONB columns
CREATE INDEX idx_products_metadata ON products USING GIN(metadata);

-- Full-text search index
CREATE INDEX idx_products_search ON products
  USING GIN(to_tsvector('english', title || ' ' || description));
```

## Violations to Catch

- Tables without created_at/updated_at
- Missing indexes on foreign keys
- SELECT * in production queries
- No pagination on list queries
- Missing down() in migrations
- Hardcoded connection strings
- No connection pooling configured
- Missing CHECK constraints on enum-like columns
- No soft delete (using hard DELETE)
- Raw SQL without parameterization (SQL injection risk)
- Missing UNIQUE constraints where needed
- No optimistic locking (version column) on concurrent-write tables
- DECIMAL not used for money (using FLOAT instead)
