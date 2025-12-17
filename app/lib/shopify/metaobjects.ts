/**
 * Shopify Metaobjects Configuration for Communa SG Posts
 *
 * To use Shopify's CDN for hosting media, we'll create metaobjects
 * that store post data and reference products directly.
 */

// GraphQL query to fetch posts from Shopify Metaobjects
export const POSTS_METAOBJECT_QUERY = `#graphql
  query PostsMetaobject(
    $first: Int = 20
    $after: String
    $filters: [MetaobjectFilter!]
  ) {
    metaobjects(
      type: "communa_post"
      first: $first
      after: $after
      filters: $filters
    ) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            reference {
              ... on Product {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                featuredImage {
                  url
                  altText
                }
              }
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
` as const;

// Query for a single post
export const POST_METAOBJECT_QUERY = `#graphql
  query PostMetaobject($handle: String!) {
    metaobject(handle: { handle: $handle, type: "communa_post" }) {
      id
      handle
      fields {
        key
        value
        references(first: 10) {
          edges {
            node {
              ... on Product {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                featuredImage {
                  url
                  altText
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      availableForSale
                    }
                  }
                }
              }
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
` as const;

/**
 * Metaobject Definition for Communa Posts
 *
 * To set this up in Shopify Admin:
 * 1. Go to Settings > Custom data > Metaobjects
 * 2. Create a new metaobject called "Communa Post" with handle "communa_post"
 * 3. Add the following fields:
 */
export const COMMUNA_POST_METAOBJECT_DEFINITION = {
  name: "Communa Post",
  type: "communa_post",
  fields: [
    {
      key: "title",
      name: "Title",
      type: "single_line_text_field",
      required: true,
    },
    {
      key: "description",
      name: "Description",
      type: "multi_line_text_field",
      required: true,
    },
    {
      key: "main_image",
      name: "Main Image",
      type: "file_reference",
      validations: {
        file_type_allow: ["IMAGE"],
      },
      required: true,
    },
    {
      key: "gallery_images",
      name: "Gallery Images",
      type: "list.file_reference",
      validations: {
        file_type_allow: ["IMAGE"],
      },
    },
    {
      key: "category",
      name: "Category",
      type: "single_line_text_field",
      validations: {
        choices: ["HDB", "CONDO", "LANDED", "APARTMENT"],
      },
      required: true,
    },
    {
      key: "subcategory",
      name: "Subcategory",
      type: "single_line_text_field",
      validations: {
        choices: ["BTO", "RESALE", "RENTAL", "MAISONETTE"],
      },
    },
    {
      key: "property_size",
      name: "Property Size (sqft)",
      type: "number_integer",
    },
    {
      key: "bedrooms",
      name: "Number of Bedrooms",
      type: "number_integer",
    },
    {
      key: "featured_products",
      name: "Featured Products",
      type: "list.product_reference",
      description: "Products featured in this post",
    },
    {
      key: "hotspots",
      name: "Product Hotspots",
      type: "json",
      description: "JSON array of hotspot coordinates and product references",
    },
    {
      key: "tags",
      name: "Tags",
      type: "list.single_line_text_field",
    },
    {
      key: "author_name",
      name: "Author Name",
      type: "single_line_text_field",
      required: true,
    },
    {
      key: "author_username",
      name: "Author Username",
      type: "single_line_text_field",
      required: true,
    },
    {
      key: "author_avatar",
      name: "Author Avatar",
      type: "file_reference",
      validations: {
        file_type_allow: ["IMAGE"],
      },
    },
    {
      key: "author_location",
      name: "Author Location",
      type: "single_line_text_field",
    },
    {
      key: "likes_count",
      name: "Likes Count",
      type: "number_integer",
      default_value: 0,
    },
    {
      key: "comments_count",
      name: "Comments Count",
      type: "number_integer",
      default_value: 0,
    },
    {
      key: "saves_count",
      name: "Saves Count",
      type: "number_integer",
      default_value: 0,
    },
    {
      key: "views_count",
      name: "Views Count",
      type: "number_integer",
      default_value: 0,
    },
    {
      key: "published_at",
      name: "Published Date",
      type: "date_time",
      required: true,
    },
  ],
};

/**
 * Transform Metaobject to our Post type
 */
export function transformMetaobjectToPost(metaobject: any) {
  const fields = metaobject.fields.reduce((acc: any, field: any) => {
    acc[field.key] = field.value || field.reference || field.references;
    return acc;
  }, {});

  // Parse hotspots JSON if present
  let hotspots = [];
  if (fields.hotspots) {
    try {
      hotspots = JSON.parse(fields.hotspots) as any[];
    } catch (e) {
      console.error('Failed to parse hotspots:', e);
    }
  }

  return {
    id: metaobject.id,
    handle: metaobject.handle,
    title: fields.title,
    description: fields.description,
    mainImageUrl: fields.main_image?.image?.url,
    imageUrls: fields.gallery_images?.edges?.map((edge: any) => edge.node.image.url) || [],
    category: fields.category,
    subCategory: fields.subcategory,
    propertySize: fields.property_size,
    bedrooms: fields.bedrooms,
    tags: fields.tags || [],
    hotspots: hotspots,
    user: {
      displayName: fields.author_name,
      username: fields.author_username,
      avatarUrl: fields.author_avatar?.image?.url,
      location: fields.author_location,
    },
    likesCount: fields.likes_count || 0,
    commentsCount: fields.comments_count || 0,
    savesCount: fields.saves_count || 0,
    viewsCount: fields.views_count || 0,
    createdAt: fields.published_at,
    featuredProducts: fields.featured_products?.edges?.map((edge: any) => edge.node) || [],
  };
}
