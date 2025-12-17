import type { Post, User, Comment, Hotspot } from '~/lib/types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'ditengahtaman',
    displayName: 'Di Tengah Taman',
    avatarUrl: 'https://via.placeholder.com/100x100/4A5568/ffffff?text=DT',
    bio: 'Interior design enthusiast. Sharing my BTO journey.',
    location: 'Sroom BTO, 113sqm in Tengah',
    instagramHandle: '@ditengahtaman',
    followersCount: 94,
    followingCount: 36,
    postsCount: 11,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user-2',
    username: 'laikanwojia',
    displayName: 'Lai Kan Wo Jia',
    avatarUrl: 'https://via.placeholder.com/100x100/6366F1/ffffff?text=LK',
    bio: 'Our Gain City BTO group buy haul',
    location: 'Singapore',
    followersCount: 77,
    followingCount: 42,
    postsCount: 7,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user-3',
    username: 'northshoreabode',
    displayName: 'North Shore Abode',
    avatarUrl: 'https://via.placeholder.com/100x100/10B981/ffffff?text=NS',
    bio: 'Coastal living in the north',
    location: 'Punggol',
    followersCount: 53,
    followingCount: 28,
    postsCount: 14,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  }
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    user: mockUsers[0],
    title: 'The house tour; we bought ALL our furnitures from Malaysia!! 😱',
    description: 'Virtual House Tour - Welcome to our 5-room BTO in Tengah! We saved so much by buying all our furniture from Malaysia. Check out the hotspots to see what we got!',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-1.avif?v=1765955382',
    imageUrls: [
      'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop'
    ],
    category: 'HDB',
    subCategory: 'BTO',
    propertySize: 1200,
    bedrooms: 5,
    tags: ['Mid-Century Modern', 'Couple Living'],
    hotspots: [
      {
        id: 'hotspot-1',
        postId: 'post-1',
        x: 25,
        y: 45,
        productId: 'gid://shopify/Product/1',
        productHandle: 'modern-3-seater-sofa',
        productTitle: 'Modern 3-Seater Sofa',
        productPrice: '$899',
        productImageUrl: 'https://via.placeholder.com/200x200/gray/white?text=Sofa'
      },
      {
        id: 'hotspot-2',
        postId: 'post-1',
        x: 60,
        y: 35,
        productId: 'gid://shopify/Product/2',
        productHandle: 'ceiling-fan-with-light',
        productTitle: 'FANCO HELI DC Ceiling Fan',
        productPrice: '$408',
        productImageUrl: 'https://via.placeholder.com/200x200/gray/white?text=Fan'
      },
      {
        id: 'hotspot-3',
        postId: 'post-1',
        x: 75,
        y: 60,
        productId: 'gid://shopify/Product/3',
        productHandle: 'dining-table-set',
        productTitle: 'Dining Table & Chairs',
        productPrice: '$1,299',
        productImageUrl: 'https://via.placeholder.com/200x200/gray/white?text=Table'
      }
    ],
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
    likesCount: 148,
    commentsCount: 4,
    savesCount: 114,
    viewsCount: 101466
  },
  {
    id: 'post-2',
    userId: 'user-2',
    user: mockUsers[1],
    title: 'Our Gain City BTO group buy haul ✨',
    description: 'Check out what we got from our group buy! Saved over $2000 compared to retail.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-2.avif?v=1765955382',
    imageUrls: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&fit=crop'
    ],
    category: 'HDB',
    subCategory: 'BTO',
    propertySize: 1000,
    bedrooms: 4,
    tags: ['Modern', 'Minimalist'],
    hotspots: [],
    createdAt: '2024-12-02T00:00:00Z',
    updatedAt: '2024-12-02T00:00:00Z',
    likesCount: 77,
    commentsCount: 1,
    savesCount: 89,
    viewsCount: 33200
  },
  {
    id: 'post-3',
    userId: 'user-1',
    user: mockUsers[0],
    title: 'HOME TOUR: Inside Our $40K Muji-inspired 5-room HDB',
    description: 'A complete walkthrough of our minimalist home renovation. Every piece was carefully selected for both form and function.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-3.avif?v=1765955382',
    imageUrls: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop'
    ],
    category: 'HDB',
    subCategory: 'RESALE',
    propertySize: 1200,
    bedrooms: 5,
    tags: ['Muji', 'Japanese', 'Minimalist'],
    hotspots: [],
    createdAt: '2024-11-15T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z',
    likesCount: 234,
    commentsCount: 14,
    savesCount: 189,
    viewsCount: 89900
  },
  {
    id: 'post-4',
    userId: 'user-3',
    user: mockUsers[2],
    title: 'The Flow House',
    description: 'Our open-concept design maximizes natural light and creates a seamless flow between spaces.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-4.avif?v=1765955382',
    imageUrls: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&h=800&fit=crop'
    ],
    category: 'CONDO',
    subCategory: null,
    propertySize: 900,
    bedrooms: 2,
    tags: ['Modern', 'Open Concept'],
    hotspots: [],
    createdAt: '2024-11-20T00:00:00Z',
    updatedAt: '2024-11-20T00:00:00Z',
    likesCount: 156,
    commentsCount: 9,
    savesCount: 122,
    viewsCount: 69900
  },
  {
    id: 'post-5',
    userId: 'user-2',
    user: mockUsers[1],
    title: 'Simple & healthy recipe 🍲',
    description: 'Sharing my go-to weeknight dinner recipe that takes only 30 minutes!',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-5.avif?v=1765955382',
    imageUrls: [
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=800&fit=crop'
    ],
    category: 'HDB',
    subCategory: 'BTO',
    propertySize: 850,
    bedrooms: 3,
    tags: ['Recipe', 'Lifestyle'],
    hotspots: [],
    createdAt: '2024-11-25T00:00:00Z',
    updatedAt: '2024-11-25T00:00:00Z',
    likesCount: 73,
    commentsCount: 5,
    savesCount: 45,
    viewsCount: 15600
  },
  {
    id: 'post-6',
    userId: 'user-3',
    user: mockUsers[2],
    title: 'Cat/Guest Room - Keeping it clean, simple and practical',
    description: 'How we designed a multi-functional room that serves as both a guest room and a safe space for our cats.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-6.avif?v=1765955382',
    imageUrls: [
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&h=800&fit=crop'
    ],
    category: 'HDB',
    subCategory: 'RESALE',
    propertySize: 1100,
    bedrooms: 4,
    tags: ['Pet-Friendly', 'Multi-functional'],
    hotspots: [],
    createdAt: '2024-11-10T00:00:00Z',
    updatedAt: '2024-11-10T00:00:00Z',
    likesCount: 134,
    commentsCount: 15,
    savesCount: 96,
    viewsCount: 45800
  },
  {
    id: 'post-7',
    userId: 'user-1',
    user: mockUsers[0],
    title: 'Scandinavian Living Room Makeover',
    description: 'Transformed our living room with clean lines and natural materials.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-7.avif?v=1765955382',
    imageUrls: ['https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-7.avif?v=1765955382'],
    category: 'HDB',
    subCategory: 'BTO',
    propertySize: 950,
    bedrooms: 3,
    tags: ['Scandinavian', 'Living Room'],
    hotspots: [],
    createdAt: '2024-11-08T00:00:00Z',
    updatedAt: '2024-11-08T00:00:00Z',
    likesCount: 298,
    commentsCount: 23,
    savesCount: 186,
    viewsCount: 78900
  },
  {
    id: 'post-8',
    userId: 'user-2',
    user: mockUsers[1],
    title: 'Industrial Chic Kitchen Renovation',
    description: 'Our journey to create an industrial-style kitchen in our HDB.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-8.avif?v=1765955382',
    imageUrls: ['https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-8.avif?v=1765955382'],
    category: 'HDB',
    subCategory: 'RESALE',
    propertySize: 1050,
    bedrooms: 4,
    tags: ['Industrial', 'Kitchen'],
    hotspots: [],
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
    likesCount: 412,
    commentsCount: 31,
    savesCount: 267,
    viewsCount: 92300
  },
  {
    id: 'post-9',
    userId: 'user-3',
    user: mockUsers[2],
    title: 'Cozy Bedroom Retreat',
    description: 'Creating a peaceful sanctuary in our master bedroom.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-9.avif?v=1765955382',
    imageUrls: ['https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-9.avif?v=1765955382'],
    category: 'CONDO',
    subCategory: null,
    propertySize: 850,
    bedrooms: 2,
    tags: ['Bedroom', 'Cozy'],
    hotspots: [],
    createdAt: '2024-11-03T00:00:00Z',
    updatedAt: '2024-11-03T00:00:00Z',
    likesCount: 523,
    commentsCount: 42,
    savesCount: 389,
    viewsCount: 103400
  },
  {
    id: 'post-10',
    userId: 'user-1',
    user: mockUsers[0],
    title: 'Smart Home Office Setup',
    description: 'WFH productivity maximized with smart storage solutions.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-10.avif?v=1765955382',
    imageUrls: ['https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-10.avif?v=1765955382'],
    category: 'HDB',
    subCategory: 'BTO',
    propertySize: 900,
    bedrooms: 3,
    tags: ['Home Office', 'Smart Storage'],
    hotspots: [],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z',
    likesCount: 367,
    commentsCount: 29,
    savesCount: 245,
    viewsCount: 87600
  },
  {
    id: 'post-11',
    userId: 'user-2',
    user: mockUsers[1],
    title: 'Balcony Garden Paradise',
    description: 'Turning our balcony into a green oasis in the city.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-11.avif?v=1765955382',
    imageUrls: ['https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-11.avif?v=1765955382'],
    category: 'CONDO',
    subCategory: null,
    propertySize: 950,
    bedrooms: 2,
    tags: ['Balcony', 'Garden'],
    hotspots: [],
    createdAt: '2024-10-28T00:00:00Z',
    updatedAt: '2024-10-28T00:00:00Z',
    likesCount: 445,
    commentsCount: 37,
    savesCount: 312,
    viewsCount: 95700
  },
  {
    id: 'post-12',
    userId: 'user-3',
    user: mockUsers[2],
    title: 'Modern Minimalist Bathroom',
    description: 'Clean lines and smart storage in our bathroom renovation.',
    mainImageUrl: 'https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-12.avif?v=1765955382',
    imageUrls: ['https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-12.avif?v=1765955382'],
    category: 'HDB',
    subCategory: 'RESALE',
    propertySize: 1100,
    bedrooms: 4,
    tags: ['Bathroom', 'Minimalist'],
    hotspots: [],
    createdAt: '2024-10-25T00:00:00Z',
    updatedAt: '2024-10-25T00:00:00Z',
    likesCount: 289,
    commentsCount: 21,
    savesCount: 198,
    viewsCount: 67800
  }
];

// Mock comments
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    userId: 'user-2',
    user: mockUsers[1],
    content: 'Love the color palette you chose! Where did you get the furniture from in Malaysia?',
    likesCount: 5,
    createdAt: '2024-12-01T12:00:00Z',
    updatedAt: '2024-12-01T12:00:00Z'
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    userId: 'user-3',
    user: mockUsers[2],
    content: 'So spacious! 😍',
    likesCount: 2,
    createdAt: '2024-12-01T14:00:00Z',
    updatedAt: '2024-12-01T14:00:00Z'
  }
];

// Helper function to get mock posts with filters
export function getMockPosts(filters?: {
  category?: string | null;
  limit?: number;
  offset?: number;
}): { posts: Post[]; total: number } {
  let filteredPosts = [...mockPosts];

  if (filters?.category) {
    filteredPosts = filteredPosts.filter(p => p.category === filters.category);
  }

  const total = filteredPosts.length;
  const offset = filters?.offset || 0;
  const limit = filters?.limit || 20;

  return {
    posts: filteredPosts.slice(offset, offset + limit),
    total
  };
}

// Helper to get a single post by ID
export function getMockPostById(id: string): Post | null {
  return mockPosts.find(p => p.id === id) || null;
}

// Helper to get user by username
export function getMockUserByUsername(username: string): User | null {
  return mockUsers.find(u => u.username === username) || null;
}