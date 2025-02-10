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
