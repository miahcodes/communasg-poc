import { useLoaderData } from 'react-router';
import type { Route } from './+types/posts.$handle';
import { getPostById, getRelatedPosts } from '~/lib/db/posts.server';
import { useState } from 'react';
import clsx from 'clsx';

export const meta: Route.MetaFunction = ({
  data,
}: {
  data?: {post?: {title: string; description: string}} | undefined;
}) => {
  if (!data?.post) {
    return [{ title: 'Post Not Found | Communa SG' }];
  }
  return [
    { title: `${data.post.title} | Communa SG` },
    { name: 'description', content: data.post.description },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.handle;

  if (!postId) {
    throw new Response('Not Found', { status: 404 });
  }

  const post = await getPostById(postId);

  if (!post) {
    throw new Response('Not Found', { status: 404 });
  }

  const relatedPosts = await getRelatedPosts(postId, 4);

  return {
    post,
    relatedPosts,
  };
}

export default function PostDetail() {
  const { post, relatedPosts } = useLoaderData<typeof loader>();
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const activeHotspot = post.hotspots.find(h => h.id === activeHotspotId);

  return (
    <div className="post-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a>
        <span> › </span>
        <span>{post.title}</span>
      </div>

      {/* User Header */}
      <div className="post-user-header">
        <div className="user-info">
          <img
            src={post.user?.avatarUrl || `https://ui-avatars.com/api/?name=${post.user?.username}&size=40`}
            alt={post.user?.username}
            className="user-avatar"
          />
          <div>
            <h3 className="user-name">{post.user?.displayName}</h3>
            <p className="user-location">{post.user?.location}</p>
          </div>
        </div>
        <button className="follow-button">Follow</button>
      </div>

      {/* Post Title & Description */}
      <h1 className="post-title">{post.title}</h1>
      <p className="post-description">{post.description}</p>

      {/* Post Metadata */}
      <div className="post-metadata">
        {post.category && (
          <span className={clsx('badge', `badge-${post.category.toLowerCase()}`)}>
            {post.category}
            {post.subCategory && ` (${post.subCategory})`}
          </span>
        )}
        {post.propertySize && (
          <span className="metadata-item">≈{post.propertySize} sqft</span>
        )}
        {post.bedrooms && (
          <span className="metadata-item">{post.bedrooms} BR</span>
        )}
        {post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Main Interactive Image */}
      <div className="interactive-image-container">
        <img
          src={post.imageUrls[selectedImageIndex] || post.mainImageUrl}
          alt={post.title}
          className="main-image"
        />

        {/* Hotspots */}
        {post.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            className={clsx('hotspot-marker', activeHotspotId === hotspot.id && 'active')}
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
            }}
            onClick={() => setActiveHotspotId(
              activeHotspotId === hotspot.id ? null : hotspot.id
            )}
            aria-label={`View ${hotspot.productTitle || 'product'}`}
          >
            <span className="hotspot-plus">+</span>
            <span className="hotspot-pulse" />
          </button>
        ))}

        {/* Product Card */}
        {activeHotspot && (
          <div
            className="product-card-popup"
            style={{
              left: activeHotspot.x > 50 ? 'auto' : `${activeHotspot.x}%`,
              right: activeHotspot.x > 50 ? `${100 - activeHotspot.x}%` : 'auto',
              top: `${activeHotspot.y}%`,
            }}
          >
            <button
              className="close-btn"
              onClick={() => setActiveHotspotId(null)}
            >
              ×
            </button>
            {activeHotspot.productImageUrl && (
              <img
                src={activeHotspot.productImageUrl}
                alt={activeHotspot.productTitle}
                className="product-image"
              />
            )}
            <h4>{activeHotspot.productTitle}</h4>
            <p className="product-price">{activeHotspot.productPrice}</p>
            <a
              href={`/products/${activeHotspot.productHandle}`}
              className="view-product-btn"
            >
              View on website
            </a>
          </div>
        )}
      </div>

      {/* Image Gallery Thumbnails */}
      {post.imageUrls.length > 1 && (
        <div className="image-thumbnails">
          {post.imageUrls.map((url, index) => (
            <button
              key={index}
              className={clsx('thumbnail', selectedImageIndex === index && 'active')}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img src={url} alt={`View ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      {/* Engagement Actions */}
      <div className="post-actions">
        <button className="action-btn">
          <span className="icon">💾</span>
          <span>{post.savesCount} Saves</span>
        </button>
        <button className="action-btn">
          <span className="icon">❤️</span>
          <span>{post.likesCount}</span>
        </button>
        <button className="action-btn">
          <span className="icon">💬</span>
          <span>{post.commentsCount}</span>
        </button>
        <button className="action-btn">
          <span className="icon">🔗</span>
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comment-form">
          <input
            type="text"
            placeholder="Leave your comment"
            className="comment-input"
          />
          <button className="comment-submit">Post</button>
        </div>
        {/* Comments will be added in Phase 4 */}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h3>More similar homes</h3>
          <div className="related-posts-grid">
            {relatedPosts.map((relatedPost) => (
              <a
                key={relatedPost.id}
                href={`/posts/${relatedPost.id}`}
                className="related-post-card"
              >
                <img
                  src={relatedPost.mainImageUrl}
                  alt={relatedPost.title}
                  className="related-post-image"
                />
                <h4>{relatedPost.title}</h4>
                <div className="related-post-stats">
                  <span>👁 {relatedPost.viewsCount}</span>
                  <span>❤️ {relatedPost.likesCount}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
