---
name: strapi
description: Strapi CMS skill - enforces content type design, custom controller patterns, lifecycle hooks, plugin development, REST/GraphQL API standards, and role-based access.
command: strapi
---

# Strapi CMS Skill

## When Triggered

Activate when:
- `@strapi/*` packages detected
- Content type definitions are created/modified
- User says `/strapi` or `/enterprise strapi`

## Strapi Project Structure
```
strapi/
├── config/
│   ├── database.ts           ← DB config (PostgreSQL)
│   ├── server.ts             ← Server config
│   ├── admin.ts              ← Admin panel config
│   ├── middlewares.ts         ← Global middlewares
│   └── plugins.ts            ← Plugin configs
├── src/
│   ├── api/                   ← Content types & APIs
│   │   └── [content-type]/
│   │       ├── content-types/
│   │       │   └── [name]/
│   │       │       └── schema.json    ← Content type schema
│   │       ├── controllers/
│   │       │   └── [name].ts          ← Custom controller logic
│   │       ├── services/
│   │       │   └── [name].ts          ← Business logic
│   │       ├── routes/
│   │       │   └── [name].ts          ← Custom routes
│   │       └── policies/
│   │           └── [policy].ts        ← Access policies
│   ├── components/            ← Reusable components
│   │   └── [category]/
│   │       └── [component].json
│   ├── plugins/               ← Custom plugins
│   │   └── [plugin-name]/
│   │       ├── server/
│   │       │   ├── controllers/
│   │       │   ├── services/
│   │       │   └── routes/
│   │       └── admin/
│   │           └── src/
│   ├── middlewares/            ← Custom middlewares
│   └── policies/              ← Global policies
├── database/
│   └── migrations/
├── public/
│   └── uploads/
└── package.json
```

## Content Type Design Rules

```json
// GOOD: Well-structured content type
// src/api/product/content-types/product/schema.json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 255
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "price": {
      "type": "decimal",
      "required": true,
      "min": 0
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "products"
    },
    "seo": {
      "type": "component",
      "component": "shared.seo",
      "required": false
    }
  }
}
```

## Custom Controller Pattern
```typescript
// src/api/product/controllers/product.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::product.product',
  ({ strapi }) => ({
    // Override find to add custom logic
    async find(ctx) {
      // Add population and filtering
      ctx.query = {
        ...ctx.query,
        populate: ['category', 'seo', 'images'],
      };

      const { data, meta } = await super.find(ctx);

      // Custom transformation
      const sanitized = data.map(product => ({
        ...product,
        priceFormatted: `$${product.attributes.price.toFixed(2)}`,
      }));

      return { data: sanitized, meta };
    },

    // Custom action
    async findBySlug(ctx) {
      const { slug } = ctx.params;

      const entity = await strapi.db.query('api::product.product').findOne({
        where: { slug },
        populate: ['category', 'seo', 'images'],
      });

      if (!entity) {
        return ctx.notFound('Product not found');
      }

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    },
  })
);
```

## Service Pattern
```typescript
// src/api/product/services/product.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::product.product',
  ({ strapi }) => ({
    async syncWithMedusa(medusaProductId: string) {
      // Integration logic with Medusa
      const medusaProduct = await strapi
        .plugin('medusa-connector')
        .service('medusa')
        .getProduct(medusaProductId);

      return strapi.entityService.update(
        'api::product.product',
        medusaProduct.strapiId,
        { data: { price: medusaProduct.price } }
      );
    },
  })
);
```

## Lifecycle Hooks
```typescript
// src/api/product/content-types/product/lifecycles.ts
export default {
  async beforeCreate(event) {
    const { data } = event.params;
    // Auto-generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/\s+/g, '-');
    }
  },

  async afterCreate(event) {
    const { result } = event;
    // Publish event to message broker for other services
    await strapi.plugin('event-bus').service('publisher').publish(
      'content.product.created',
      { id: result.id, title: result.title }
    );
    // Invalidate Redis cache
    await strapi.plugin('redis').service('cache').invalidate('products:*');
  },

  async afterUpdate(event) {
    const { result } = event;
    await strapi.plugin('redis').service('cache').invalidate(`product:${result.id}`);
  },
};
```

## Integration with Enterprise Stack
```
Strapi ──webhook/event──→ Medusa (sync product content)
Strapi ──cache──→ Redis (content caching)
Strapi ──db──→ PostgreSQL (content storage)
Strapi ──events──→ Event Bus (content change notifications)
API Gateway ──/api/content/*──→ Strapi
```

## Violations to Catch

- Business logic in controllers (should be in services)
- Content types without required field validations
- Missing slug/uid fields for SEO-important content
- Direct DB queries instead of using Entity Service API
- No lifecycle hooks for cache invalidation
- Missing RBAC policies on sensitive content types
- Hardcoded values in controllers
- Not using factories.createCoreController/Service
- Missing populate in queries (N+1 problem)
- No draft/publish workflow on public content
