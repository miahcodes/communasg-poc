import {
  Await,
  useLoaderData,
  Link,
  useSearchParams,
} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {PostGallery} from '~/components/posts/PostGallery';
import {FilterBar} from '~/components/layout/FilterBar';
import {AppLayout} from '~/components/layout/AppLayout';
import {getPosts} from '~/lib/db/posts.server';
import type {Post} from '~/lib/types';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Communa SG | Home Tours & Interior Design'}];
};

export async function loader(args: Route.LoaderArgs) {
  const {request} = args;
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const page = parseInt(url.searchParams.get('page') || '1');

  // Get posts for the gallery
  const {posts, total, hasMore} = await getPosts({
    category: category as any,
    limit: 20,
    offset: (page - 1) * 20,
    sortBy: 'latest',
  });

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {
    ...deferredData,
    ...criticalData,
    posts,
    totalPosts: total,
    hasMorePosts: hasMore,
    currentCategory: category,
    currentPage: page,
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const handleCarouselScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Find the closest carousel-scroll element relative to the button clicked
    const button = e.currentTarget;
    const carouselContainer = button.closest('.carousel-container');
    const carousel = carouselContainer?.querySelector('.carousel-scroll');

    if (carousel) {
      const scrollAmount = carousel.clientWidth * 0.9; // Scroll almost full width
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <AppLayout>
      <div className="feed-container">
        {/* House Tours Section - Mobile */}
        <div className="mobile-house-tours">
          {/* Section Header */}
          <div className="section-header-mobile">
            <div className="section-title-mobile">
              <span className="house-icon">🏠</span>
              <span>House Tours</span>
            </div>
            <Link to="/house-tours" className="see-all-link">See All</Link>
          </div>

          {/* 2-Column Horizontal Carousel */}
          <div className="carousel-container">
            <div className="carousel-scroll">
              {data.posts.slice(0, 10).map((post, index) => (
                <div key={post.id} className="carousel-card">
                  <Link to={`/posts/${post.id}`} className="card-link">
                    <div className="card-image-container">
                      <img
                        src={post.mainImageUrl}
                        alt={post.title}
                        className="card-image"
                      />

                      {/* Image Overlays */}
                      <button
                        className="card-stack-btn"
                        onClick={(e) => e.preventDefault()}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                          <rect x="3" y="7" width="14" height="14" rx="2" />
                          <path d="M7 3h14v14" />
                        </svg>
                      </button>

                      <div className="card-plus-badge">
                        <span>+ {post.imageUrls?.length || (index + 1)}</span>
                      </div>

                      <div className="card-views">
                        <span className="eye-icon">👁</span>
                        <span>{formatCount(post.viewsCount)}</span>
                      </div>
                    </div>

                    <div className="card-content">
                      <h3 className="card-title">{post.title}</h3>

                      <div className="card-footer">
                        <div className="creator-info">
                          <img
                            src={`https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-mockavatar.avif?v=1765955657`}
                            alt={post.user?.username}
                            className="creator-avatar"
                          />
                          <span className="creator-name">{post.user?.username}</span>
                        </div>

                        <button
                          className="heart-btn"
                          onClick={(e) => e.preventDefault()}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Floating Navigation Button */}
            <button
              className="carousel-nav-btn"
              onClick={handleCarouselScroll}
              aria-label="Scroll carousel right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Section Title */}
        <h2 className="desktop-section-title">House Tours</h2>

        {/* Main Posts Grid - Used for desktop */}
        <div className="posts-grid">
          {data.posts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="post-card-new"
            >
              <div className="post-image-container">
                <img
                  src={post.mainImageUrl}
                  alt={post.title}
                  className="post-image"
                  loading="lazy"
                />

                {/* Badges */}
                <div className="post-badges">
                  {post.category && (
                    <span className={`post-badge ${post.category.toLowerCase()}`}>
                      {post.category}
                      {post.subCategory && ` (${post.subCategory})`}
                    </span>
                  )}
                </div>

                {/* View Stats */}
                <div className="post-stats">
                  <span>👁</span>
                  <span>{formatCount(post.viewsCount)}</span>
                </div>
              </div>

              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>

                {/* Author Info */}
                <div className="post-author">
                  <img
                    src={`https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-mockavatar.avif?v=1765955657`}
                    alt={post.user?.username}
                    className="author-avatar"
                  />
                  <span className="author-name">@{post.user?.username}</span>
                </div>

                {/* Engagement Stats */}
                <div className="post-engagement">
                  <div className="engagement-item">
                    <span>❤️</span>
                    <span>{formatCount(post.likesCount)}</span>
                  </div>
                  <div className="engagement-item">
                    <span>💬</span>
                    <span>{formatCount(post.commentsCount)}</span>
                  </div>
                  <div className="engagement-item">
                    <span>🔖</span>
                    <span>{formatCount(post.savesCount)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Posts Section */}
        <div className="featured-section">
          {/* Mobile Featured Posts - 2 Column Carousel */}
          <div className="mobile-featured-posts">
            <div className="section-header-mobile">
              <div className="section-title-mobile">
                <span>Featured Posts</span>
              </div>
              <Link to="/featured" className="see-all-link">See All</Link>
            </div>

            <div className="carousel-container">
              <div className="carousel-scroll">
                {data.posts.slice(0, 10).map((post) => (
                  <div key={`featured-mobile-${post.id}`} className="carousel-card">
                    <Link to={`/posts/${post.id}`} className="card-link">
                      <div className="card-image-container">
                        <img
                          src={post.mainImageUrl}
                          alt={post.title}
                          className="card-image"
                        />
                        <div className="card-views">
                          <span className="eye-icon">👁</span>
                          <span>{formatCount(post.viewsCount)}</span>
                        </div>
                      </div>

                      <div className="card-content">
                        <h3 className="card-title">{post.title}</h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <button
                className="carousel-nav-btn"
                onClick={handleCarouselScroll}
                aria-label="Scroll featured posts right"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Featured Posts - Grid */}
          <div className="desktop-featured-posts">
            <div className="section-title">
              <span>Featured Posts</span>
              <Link to="/featured" className="see-all-link">See All →</Link>
            </div>

            <div className="posts-grid">
              {data.posts.slice(0, 3).map((post) => (
                <Link
                  key={`featured-${post.id}`}
                  to={`/posts/${post.id}`}
                  className="post-card-new"
                >
                  <div className="post-image-container">
                    <img
                      src={post.mainImageUrl}
                      alt={post.title}
                      className="post-image"
                      loading="lazy"
                    />
                    <div className="post-stats">
                      <span>👁</span>
                      <span>{formatCount(post.viewsCount)}</span>
                    </div>
                  </div>
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {data.totalPosts > 20 && (
          <div className="pagination">
            {data.currentPage > 1 && (
              <Link
                to={`?${new URLSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: String(data.currentPage - 1),
                }).toString()}`}
                className="pagination-link"
              >
                Previous
              </Link>
            )}

            <span className="pagination-info">
              Page {data.currentPage} of {Math.ceil(data.totalPosts / 20)}
            </span>

            {data.hasMorePosts && (
              <Link
                to={`?${new URLSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: String(data.currentPage + 1),
                }).toString()}`}
                className="pagination-link"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

// Helper function for formatting counts
function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
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
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
