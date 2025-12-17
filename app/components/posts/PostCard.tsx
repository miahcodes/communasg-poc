import {Link} from 'react-router';
import clsx from 'clsx';
import type { Post } from '~/lib/types';

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Link
      to={`/posts/${post.id}`}
      className={clsx('post-card group relative block', className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={post.mainImageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category badges */}
        <div className="absolute left-2 top-2 flex gap-1">
          {post.category && (
            <span className={clsx(
              'badge',
              post.category === 'HDB' && 'badge-hdb',
              post.category === 'BTQ' && 'badge-btq',
              post.category === 'CONDO' && 'badge-condo'
            )}>
              {post.category}
              {post.subCategory && ` (${post.subCategory})`}
            </span>
          )}
        </div>

        {/* View count */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{formatCount(post.viewsCount)}</span>
        </div>

        {/* Engagement metrics overlay */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          {post.likesCount > 0 && (
            <div className="flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs text-gray-800">
              <span className="text-red-500">♥</span>
              <span>{formatCount(post.likesCount)}</span>
            </div>
          )}
          {post.commentsCount > 0 && (
            <div className="flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs text-gray-800">
              <span>💬</span>
              <span>{formatCount(post.commentsCount)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
          {post.title}
        </h3>

        {post.user && (
          <div className="flex items-center gap-2">
            <img
              src={post.user.avatarUrl || `https://ui-avatars.com/api/?name=${post.user.username}&size=20`}
              alt={post.user.username}
              className="h-5 w-5 rounded-full"
            />
            <span className="text-xs text-gray-600">@{post.user.username}</span>
            <span className="text-xs text-gray-400">
              {formatCount(post.savesCount)} saves
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
