---
name: eda
description: Event-Driven Architecture skill - enforces event schemas, message broker patterns, saga orchestration, CQRS, event sourcing, dead letter queues, and idempotent consumers.
command: eda
---

# Event-Driven Architecture (EDA) Skill

## When Triggered

Activate when:
- Kafka/RabbitMQ/NATS/Redis Streams code is involved
- Event publishers or subscribers are created/modified
- Saga patterns or choreography is discussed
- User says `/eda` or `/enterprise eda`

## Event Structure Standard

### Event Schema (MANDATORY for every event)
```typescript
// packages/event-schemas/src/[domain]/[event-name].event.ts

export interface BaseEvent {
  eventId: string;           // UUID - unique per event
  eventType: string;         // e.g., 'order.created'
  aggregateId: string;       // e.g., orderId
  aggregateType: string;     // e.g., 'Order'
  version: number;           // Schema version for evolution
  timestamp: string;         // ISO 8601
  correlationId: string;     // Trace across services
  causationId: string;       // What caused this event
  metadata: {
    userId?: string;
    source: string;          // Service that emitted
    environment: string;
  };
  payload: Record<string, unknown>;
}

// Example: Concrete event
export interface OrderCreatedEvent extends BaseEvent {
  eventType: 'order.created';
  aggregateType: 'Order';
  payload: {
    orderId: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    currency: string;
  };
}
```

### Event Naming Convention
```
[domain].[entity].[action]

Examples:
  order.created
  order.item.added
  payment.processed
  payment.failed
  user.registered
  user.email.verified
  inventory.stock.updated
  notification.email.sent
```

## Publisher Pattern
```typescript
// GOOD: Type-safe event publisher
@Injectable()
export class OrderEventPublisher {
  constructor(private readonly broker: MessageBroker) {}

  async publishOrderCreated(order: Order): Promise<void> {
    const event: OrderCreatedEvent = {
      eventId: uuid(),
      eventType: 'order.created',
      aggregateId: order.id,
      aggregateType: 'Order',
      version: 1,
      timestamp: new Date().toISOString(),
      correlationId: RequestContext.getCorrelationId(),
      causationId: RequestContext.getCausationId(),
      metadata: {
        userId: order.userId,
        source: 'order-service',
        environment: process.env.NODE_ENV,
      },
      payload: {
        orderId: order.id,
        userId: order.userId,
        items: order.items,
        totalAmount: order.total,
        currency: order.currency,
      },
    };

    await this.broker.publish('order.events', event);
  }
}
```

## Subscriber Pattern
```typescript
// GOOD: Idempotent consumer with error handling
@Injectable()
export class PaymentSubscriber {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly idempotencyStore: IdempotencyStore,
  ) {}

  @Subscribe('order.created')
  async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    // 1. Idempotency check (MANDATORY)
    if (await this.idempotencyStore.exists(event.eventId)) {
      logger.info(`Event ${event.eventId} already processed, skipping`);
      return;
    }

    try {
      // 2. Process event
      await this.paymentService.processPayment({
        orderId: event.payload.orderId,
        amount: event.payload.totalAmount,
        currency: event.payload.currency,
      });

      // 3. Mark as processed
      await this.idempotencyStore.save(event.eventId);

    } catch (error) {
      // 4. Structured error handling
      if (error instanceof RetryableError) {
        throw error; // Broker will retry
      }
      // Non-retryable → send to DLQ
      await this.broker.sendToDLQ('order.created.dlq', event, error);
    }
  }
}
```

## Saga Pattern (for multi-service transactions)
```typescript
// Order Saga - Orchestrator pattern
export class CreateOrderSaga {
  private steps: SagaStep[] = [
    {
      name: 'reserve-inventory',
      execute: (ctx) => this.inventoryService.reserve(ctx.items),
      compensate: (ctx) => this.inventoryService.release(ctx.items),
    },
    {
      name: 'process-payment',
      execute: (ctx) => this.paymentService.charge(ctx.payment),
      compensate: (ctx) => this.paymentService.refund(ctx.payment),
    },
    {
      name: 'create-shipment',
      execute: (ctx) => this.shippingService.create(ctx.shipping),
      compensate: (ctx) => this.shippingService.cancel(ctx.shipping),
    },
  ];

  async execute(context: OrderContext): Promise<void> {
    const completed: SagaStep[] = [];

    for (const step of this.steps) {
      try {
        await step.execute(context);
        completed.push(step);
      } catch (error) {
        // Compensate in reverse order
        for (const completedStep of completed.reverse()) {
          await completedStep.compensate(context);
        }
        throw new SagaFailedError(step.name, error);
      }
    }
  }
}
```

## Dead Letter Queue (MANDATORY)
```typescript
// Every subscriber topic MUST have a DLQ configured
const dlqConfig = {
  'order.created': {
    dlqTopic: 'order.created.dlq',
    maxRetries: 3,
    retryDelay: [1000, 5000, 30000], // Exponential backoff
    alertAfter: 10,  // Alert if 10+ messages in DLQ
  },
};
```

## CQRS Pattern (when applicable)
```
Commands (Write) → Command Handler → Event Store → Publish Events
Queries (Read)  → Query Handler   → Read Model (materialized view)

Write DB: PostgreSQL (source of truth)
Read DB:  Redis/Elasticsearch (optimized for queries)
```

## Violations to Catch

- Events without eventId or correlationId
- Subscribers without idempotency check
- No DLQ configured for a topic
- Direct service-to-service calls for state changes (should be events)
- Events without schema versioning
- Synchronous request-reply disguised as events
- Missing compensation logic in sagas
- Hardcoded retry counts (should be configurable)
- Events containing entire entity (should contain only what changed)
- No event schema validation before publishing
