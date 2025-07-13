import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Configuration par défaut pour le développement
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('⚠️ Variables Supabase manquantes. Utilisez "Connect to Supabase" pour configurer.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface Event {
  id: string;
  site: 'wassa' | 'wanevent';
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  site: 'wassa' | 'wanevent';
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  caption: string;
  order_index: number;
  created_at: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  image?: string;
  order_index: number;
  created_at: string;
}

export interface EnsembleMember {
  id: string;
  name: string;
  role: string;
  image_url?: string;
  bio?: string;
  order_index: number;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  order_index: number;
  created_at: string;
}