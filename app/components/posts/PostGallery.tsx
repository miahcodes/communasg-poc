import clsx from 'clsx';
import { PostCard } from './PostCard';
import type { Post } from '~/lib/types';

interface PostGalleryProps {
  posts: Post[];
  className?: string;
  loading?: boolean;
}

export function PostGallery({ posts, className, loading }: PostGalleryProps) {
  if (loading) {
    return (
      <div className={clsx('post-gallery', className)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square rounded-lg bg-gray-200" />
            <div className="mt-2 space-y-2">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg
          className="h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <p className="text-gray-500">No posts found</p>
        <p className="text-sm text-gray-400 mt-1">Check back later for new content</p>
      </div>
    );
  }

  return (
    <div className={clsx('post-gallery', className)}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}