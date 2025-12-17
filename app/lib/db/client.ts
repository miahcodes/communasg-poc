import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client only if credentials are available
// Note: You'll need to set these environment variables for production
const supabaseUrl = typeof window !== 'undefined'
  ? window.ENV?.SUPABASE_URL || ''
  : process.env.SUPABASE_URL || '';

const supabaseAnonKey = typeof window !== 'undefined'
  ? window.ENV?.SUPABASE_ANON_KEY || ''
  : process.env.SUPABASE_ANON_KEY || '';

// Only create client if both URL and key are provided
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    supabase = null;
  }
}

// Type-safe database client wrapper
export class DatabaseClient {
  private static instance: DatabaseClient;

  private constructor() {}

  static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  // Check if Supabase is configured
  isConfigured(): boolean {
    return supabase !== null;
  }

  // Get the raw Supabase client
  getClient(): SupabaseClient | null {
    if (!this.isConfigured()) {
      console.info('Using mock data - Supabase is not configured. To use a real database, set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
      return null;
    }
    return supabase;
  }
}

export const db = DatabaseClient.getInstance();