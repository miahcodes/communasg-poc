# Shopify Metaobject Setup Guide for Communa SG

This guide will help you set up Shopify Metaobjects to store your Communa posts and leverage Shopify's CDN for media hosting.

## Benefits of Using Shopify Metaobjects

1. **Free CDN hosting** - All images are hosted on Shopify's global CDN
2. **Direct product linking** - Posts can reference actual Shopify products
3. **Built-in image optimization** - Automatic resizing and format conversion
4. **No additional database needed** - Everything stored in Shopify
5. **GraphQL API access** - Fast queries with built-in caching

## Step 1: Create the Metaobject Definition

1. Go to your Shopify Admin
2. Navigate to **Settings** → **Custom data** → **Metaobjects**
3. Click **Add definition**
4. Create a new metaobject with these settings:

### Basic Information
- **Name**: Communa Post
- **Type**: communa_post

### Field Definitions

Add the following fields in order:

| Field Name | Field Type | Required | Notes |
|------------|------------|----------|-------|
| Title | Single line text | Yes | Post title |
| Description | Multi-line text | Yes | Post description |
| Main Image | File | Yes | Accept only images |
| Gallery Images | List of files | No | Additional images |
| Category | Single line text | Yes | Options: HDB, CONDO, LANDED, APARTMENT |
| Subcategory | Single line text | No | Options: BTO, RESALE, RENTAL, MAISONETTE |
| Property Size | Integer | No | In square feet |
| Bedrooms | Integer | No | Number of bedrooms |
| Featured Products | List of products | No | Products shown in the post |
| Hotspots | JSON | No | Product hotspot coordinates |
| Tags | List of single line text | No | Post tags |
| Author Name | Single line text | Yes | Display name |
| Author Username | Single line text | Yes | Username |
| Author Avatar | File | No | Profile picture |
| Author Location | Single line text | No | Location |
| Likes Count | Integer | No | Default: 0 |
| Comments Count | Integer | No | Default: 0 |
| Saves Count | Integer | No | Default: 0 |
| Views Count | Integer | No | Default: 0 |
| Published At | Date and time | Yes | Publication date |

## Step 2: Create Sample Posts

After creating the metaobject definition:

1. Click **Add entry** to create a new post
2. Fill in the fields with your content
3. For the **Hotspots** field, use this JSON format:

```json
[
  {
    "x": 25,
    "y": 45,
    "productHandle": "modern-3-seater-sofa",
    "productTitle": "Modern 3-Seater Sofa",
    "productPrice": "$899"
  },
  {
    "x": 60,
    "y": 35,
    "productHandle": "ceiling-fan-with-light",
    "productTitle": "FANCO HELI DC Ceiling Fan",
    "productPrice": "$408"
  }
]
```

## Step 3: Upload Images to Shopify

1. Go to **Content** → **Files**
2. Upload all your post images
3. Copy the URLs for use in metaobjects

## Step 4: Link Products

1. In the **Featured Products** field, search and select products from your catalog
2. These will appear as clickable hotspots in the post

## Step 5: Update Your Code

Replace the mock data loader with the Shopify metaobject query:

```typescript
// app/lib/db/posts.server.ts
import { POSTS_METAOBJECT_QUERY, transformMetaobjectToPost } from '~/lib/shopify/metaobjects';

export async function getPostsFromShopify(context: any, filters: PostFilters = {}) {
  const { metaobjects } = await context.storefront.query(POSTS_METAOBJECT_QUERY, {
    variables: {
      first: filters.limit || 20,
      // Add filters as needed
    }
  });

  const posts = metaobjects.edges.map((edge: any) =>
    transformMetaobjectToPost(edge.node)
  );

  return {
    posts,
    total: posts.length,
    hasMore: metaobjects.pageInfo.hasNextPage
  };
}
```

## Step 6: Enable Metaobject Access

1. Go to **Settings** → **Apps and sales channels**
2. Find your Hydrogen channel
3. Ensure it has access to read metaobjects

## Migration Script

To migrate existing data to Shopify Metaobjects, you can use the Admin API:

```javascript
// scripts/migrate-to-metaobjects.js
const { shopifyApi } = require('@shopify/admin-api-client');

async function migratePost(post) {
  const mutation = `
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $metaobject) {
        metaobject {
          id
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    metaobject: {
      type: "communa_post",
      fields: [
        { key: "title", value: post.title },
        { key: "description", value: post.description },
        // Add all fields...
      ]
    }
  };

  // Execute mutation
}
```

## Best Practices

1. **Image Optimization**: Upload high-quality images; Shopify will handle optimization
2. **Product References**: Always link to actual products for better integration
3. **Consistent Naming**: Use consistent handles for easy querying
4. **Regular Backups**: Export metaobject data regularly
5. **Performance**: Use pagination for large datasets

## Advantages Over External Database

- **No additional hosting costs** - Everything runs on Shopify
- **Unified data source** - Products and posts in one place
- **Built-in CDN** - Global image delivery
- **Automatic scaling** - Shopify handles traffic spikes
- **Version control** - Shopify tracks changes
- **Easy backup** - Export/import via admin

## Next Steps

1. Create the metaobject definition in your Shopify admin
2. Add a few sample posts with real product references
3. Update the code to query metaobjects instead of mock data
4. Test the integration
5. Migrate all existing content

This approach leverages Shopify's infrastructure while maintaining the flexibility needed for the Communa SG platform.