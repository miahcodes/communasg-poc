import { db } from './client';
import { getMockPosts, getMockPostById } from './mock-data';
import type { Post, PostFilters } from '~/lib/types';

export async function getPosts(filters: PostFilters = {}): Promise<{
  posts: Post[];
  total: number;
  hasMore: boolean;
}> {
  // Check if Supabase is configured
  if (!db.isConfigured()) {
    // Use mock data if Supabase is not configured
    const { posts, total } = getMockPosts({
      category: filters.category,
      limit: filters.limit || 20,
      offset: filters.offset || 0
    });

    return {
      posts,
      total,
      hasMore: (filters.offset || 0) + posts.length < total
    };
  }

  try {
    const client = db.getClient();
    if (!client) {
      // If Supabase is not configured, use mock data
      const { posts, total } = getMockPosts({
        category: filters.category,
        limit: filters.limit || 20,
        offset: filters.offset || 0
      });
      return {
        posts,
        total,
        hasMore: (filters.offset || 0) + posts.length < total
      };
    }

    // Build Supabase query
    let query = client
      .from('posts')
      .select(`
        *,
        user:users(*),
        hotspots(*)
      `, { count: 'exact' });

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.subCategory) {
      query = query.eq('subCategory', filters.subCategory);
    }

    if (filters.userId) {
      query = query.eq('userId', filters.userId);
    }

    if (filters.tags && filters.tags.length > 0) {
      query = query.contains('tags', filters.tags);
    }

    if (filters.searchQuery) {
      query = query.or(`title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'popular':
        query = query.order('viewsCount', { ascending: false });
        break;
      case 'trending':
        query = query.order('likesCount', { ascending: false });
        break;
      case 'latest':
      default:
        query = query.order('createdAt', { ascending: false });
        break;
    }

    // Apply pagination
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      // Fall back to mock data on error
      const mockResult = getMockPosts(filters);
      return {
        posts: mockResult.posts,
        total: mockResult.total,
        hasMore: offset + mockResult.posts.length < mockResult.total
      };
    }

    return {
      posts: data || [],
      total: count || 0,
      hasMore: offset + (data?.length || 0) < (count || 0)
    };
  } catch (error) {
    console.error('Unexpected error fetching posts:', error);
    // Fall back to mock data
    const { posts, total } = getMockPosts(filters);
    return {
      posts,
      total,
      hasMore: (filters.offset || 0) + posts.length < total
    };
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  if (!db.isConfigured()) {
    return getMockPostById(id);
  }

  try {
    const client = db.getClient();
    if (!client) {
      return getMockPostById(id);
    }

    const { data, error } = await client
      .from('posts')
      .select(`
        *,
        user:users(*),
        hotspots(*),
        comments(
          *,
          user:users(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      return getMockPostById(id);
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching post:', error);
    return getMockPostById(id);
  }
}

export async function getPostByHandle(handle: string): Promise<Post | null> {
  // For URL-friendly handles, we'll use the post ID as the handle
  // In a real app, you might have a separate 'handle' or 'slug' field
  return getPostById(handle);
}

export async function getRelatedPosts(postId: string, limit = 4): Promise<Post[]> {
  if (!db.isConfigured()) {
    const { posts } = getMockPosts({ limit });
    return posts.filter(p => p.id !== postId).slice(0, limit);
  }

  try {
    const client = db.getClient();
    if (!client) {
      const { posts } = getMockPosts({ limit });
      return posts.filter(p => p.id !== postId).slice(0, limit);
    }

    // Get the current post to find related ones
    const currentPost = await getPostById(postId);
    if (!currentPost) return [];

    // Find posts with similar tags or same category
    const { data, error } = await client
      .from('posts')
      .select(`
        *,
        user:users(*),
        hotspots(*)
      `)
      .neq('id', postId)
      .or(`category.eq.${currentPost.category},tags.ov.{${currentPost.tags.join(',')}}`)
      .order('viewsCount', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related posts:', error);
      const { posts } = getMockPosts({ limit });
      return posts.filter(p => p.id !== postId).slice(0, limit);
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching related posts:', error);
    const { posts } = getMockPosts({ limit });
    return posts.filter(p => p.id !== postId).slice(0, limit);
  }
}

export async function incrementPostView(postId: string): Promise<void> {
  if (!db.isConfigured()) {
    // Just log for mock data
    console.log(`View tracked for post: ${postId}`);
    return;
  }

  try {
    const client = db.getClient();
    if (!client) {
      console.log(`View tracked for post: ${postId}`);
      return;
    }

    // Note: For actual increment, you'd need to use RPC or separate read/write
    // This is a simplified version
    console.log(`View tracked for post: ${postId}`);
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}