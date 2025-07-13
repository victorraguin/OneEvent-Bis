import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Vérifier si les variables d'environnement sont réellement configurées (pas les placeholders)
const isSupabaseConfigured = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'placeholder-key';

// Créer le client seulement si Supabase est réellement configuré
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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