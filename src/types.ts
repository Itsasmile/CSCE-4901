export interface Game {
  id: number;
  title: string;
  rating: number;
  categories: string[];
  platform: string;
  accessibility: string[];
  description: string;
  short_description?: string;
  image: string;
  createdAt?: string;
}

export interface Review {
  id: number;
  gameId: number; // Ensure it's gameId, not game_id
  authorId: number;
  content: string | null;
  rating: number;
  createdAt: string;
  avatar?: string; // Optional, if not in DB
}
