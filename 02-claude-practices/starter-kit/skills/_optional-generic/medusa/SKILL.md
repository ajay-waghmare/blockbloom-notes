---
name: medusa
description: Medusa.js e-commerce skill - enforces proper module structure, custom API routes, subscriber patterns, payment/fulfillment providers, and Medusa v2 best practices.
command: medusa
---

# Medusa E-Commerce Skill

## When Triggered

Activate when:
- `@medusajs/*` packages detected in project
- User works on e-commerce features
- User says `/medusa` or `/enterprise medusa`

## Medusa v2 Project Structure
```
medusa/
├── src/
│   ├── modules/                  ← Custom business modules
│   │   └── [module-name]/
│   │       ├── index.ts          ← Module definition
│   │       ├── service.ts        ← Module service (business logic)
│   │       ├── models/           ← Data models
│   │       └── migrations/       ← DB migrations
│   ├── api/                      ← Custom API routes
│   │   ├── store/                ← Storefront routes
│   │   │   └── custom/
│   │   │       └── route.ts
│   │   └── admin/                ← Admin routes
│   │       └── custom/
│   │           └── route.ts
│   ├── subscribers/              ← Event subscribers
│   │   └── [event-name].ts
│   ├── jobs/                     ← Scheduled/background jobs
│   │   └── [job-name].ts
│   ├── workflows/                ← Multi-step business workflows
│   │   └── [workflow-name]/
│   │       ├── index.ts
│   │       └── steps/
│   ├── links/                    ← Module links (relations)
│   │   └── [link-name].ts
│   └── admin/                    ← Admin UI extensions
│       ├── routes/
│       └── widgets/
├── medusa-config.ts
├── package.json
└── tsconfig.json
```

## Module Pattern (MANDATORY)
```typescript
// src/modules/loyalty/index.ts
import { Module } from '@medusajs/framework/utils'
import LoyaltyService from './service'

export const LOYALTY_MODULE = 'loyaltyModuleService'

export default Module(LOYALTY_MODULE, {
  service: LoyaltyService,
})
```

```typescript
// src/modules/loyalty/service.ts
import { MedusaService } from '@medusajs/framework/utils'
import { LoyaltyPoints } from './models/loyalty-points'

class LoyaltyService extends MedusaService({
  LoyaltyPoints,
}) {
  // Custom methods beyond CRUD
  async awardPoints(customerId: string, points: number): Promise<void> {
    // Business logic here
  }
}

export default LoyaltyService
```

## API Route Pattern
```typescript
// src/api/store/loyalty/route.ts
import type { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { LOYALTY_MODULE } from '../../../modules/loyalty'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const loyaltyService = req.scope.resolve(LOYALTY_MODULE)
  const points = await loyaltyService.getPoints(req.params.customerId)
  res.json({ points })
}

// ALWAYS add validation middleware
import { validateAndTransformBody } from '@medusajs/framework'
import { AwardPointsSchema } from './validators'

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const loyaltyService = req.scope.resolve(LOYALTY_MODULE)
  const result = await loyaltyService.awardPoints(req.validatedBody)
  res.json(result)
}

export const middlewares = [
  {
    method: 'POST',
    handler: validateAndTransformBody(AwardPointsSchema),
  },
]
```

## Subscriber Pattern
```typescript
// src/subscribers/order-placed-loyalty.ts
import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { LOYALTY_MODULE } from '../modules/loyalty'

export default async function orderPlacedLoyaltyHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const loyaltyService = container.resolve(LOYALTY_MODULE)
  const orderService = container.resolve('orderModuleService')

  const order = await orderService.retrieveOrder(event.data.id)
  const points = Math.floor(order.total / 100) // 1 point per dollar

  await loyaltyService.awardPoints(order.customer_id, points)
}

export const config: SubscriberConfig = {
  event: 'order.placed',
}
```

## Workflow Pattern (Multi-step operations)
```typescript
// src/workflows/create-order-with-loyalty/index.ts
import { createWorkflow, WorkflowResponse } from '@medusajs/framework/workflows-sdk'
import { awardLoyaltyPointsStep } from './steps/award-points'
import { sendConfirmationStep } from './steps/send-confirmation'

const createOrderWithLoyaltyWorkflow = createWorkflow(
  'create-order-with-loyalty',
  (input) => {
    const points = awardLoyaltyPointsStep(input)
    sendConfirmationStep({ ...input, points })
    return new WorkflowResponse({ points })
  }
)

export default createOrderWithLoyaltyWorkflow
```

## Integration with Other Services
```
Medusa (e-commerce) ──events──→ Order Service (microservice)
Medusa ──events──→ Notification Service
Medusa ──REST──→ Strapi (product content)
Medusa ──cache──→ Redis (product catalog cache)
Medusa ──db──→ PostgreSQL (orders, customers, products)
```

## Violations to Catch

- Business logic outside of modules/services
- Direct DB queries instead of using module services
- API routes without input validation
- Subscribers without error handling
- Missing workflow compensation steps
- Hardcoded configurations (use medusa-config.ts)
- Not using Medusa's built-in module resolution (container.resolve)
- Custom entities without migrations
- Admin customizations outside the admin/ directory
