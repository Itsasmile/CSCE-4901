import { Timestamp } from 'firebase/firestore';

export interface Game {
  id: string;
  name: string;
  rating: string;
  category: string;
  platform: string;
  accessibility: string;
  description: string;
  description2: string;
  image_url: string;
  comments: Review[];
}

export interface Review {
    id: string;
    createdAt: Timestamp;
    content: string;
    gameId: string;
    userId: string;
}