// Core data types for Communa SG

export type PostCategory = 'HDB' | 'BTQ' | 'CONDO';
export type PostSubCategory = 'BTO' | 'RESALE' | null;

export interface Post {
  id: string;
  userId: string;
  user?: User;
  title: string;
  description: string;
  mainImageUrl: string;
  imageUrls: string[];
  category: PostCategory;
  subCategory: PostSubCategory;
  propertySize?: number; // in sqft
  bedrooms?: number;
  tags: string[];
  hotspots: Hotspot[];
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  viewsCount: number;
}

export interface Hotspot {
  id: string;
  postId: string;
  x: number; // percentage position on image (0-100)
  y: number; // percentage position on image (0-100)
  productId: string; // Shopify product ID
  productHandle: string;
  productTitle?: string;
  productPrice?: string;
  productImageUrl?: string;
}

export interface User {
  id: string;
  shopifyCustomerId?: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  instagramHandle?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  parentCommentId?: string; // for threading
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserInteraction {
  userId: string;
  postId: string;
  hasLiked: boolean;
  hasSaved: boolean;
  hasViewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Follow {
  followerId: string;
  followingId: string;
  follower?: User;
  following?: User;
  createdAt: string;
}

// Filter and sorting options
export interface PostFilters {
  category?: PostCategory | null;
  subCategory?: PostSubCategory | null;
  tags?: string[];
  userId?: string;
  searchQuery?: string;
  sortBy?: 'latest' | 'popular' | 'trending';
  limit?: number;
  offset?: number;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}