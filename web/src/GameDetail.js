import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {doc, getDoc } from 'firebase/firestore';

import './GameDetail.css';
import { db} from './firebaseConfig'; // Import Firebase services
// Firebase configuration

const GameDetail = () => {
  const { id } = useParams(); // Get the game ID from the route parameter
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameDoc = doc(db, 'games', id);
        const gameSnapshot = await getDoc(gameDoc);
        if (gameSnapshot.exists()) {
          setGame({ id: gameSnapshot.id, ...gameSnapshot.data() });
        } else {
          console.error('Game not found');
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-detail container mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <img src={game.image_url} alt={game.name} className="mb-4" />
        <h2 className="text-3xl font-bold mb-4">{game.name}</h2>
        <p className="text-gray-700 mb-2 font-bold">Category:</p>
        <p className="text-gray-600 mb-4">{game.category}</p>
        <p className="text-gray-700 mb-2 font-bold">Platform:</p>
        <p className="text-gray-600 mb-4">{game.platform}</p>
        <p className="text-gray-700 mb-2 font-bold">Rating:</p>
        <p className="text-gray-600 mb-4">{game.rating}</p>
        <p className="text-gray-700 mb-2 font-bold">Description:</p>
        <p className="text-gray-600 mb-4">{game.description}</p>
        <p className="text-gray-700 mb-2 font-bold">Additional Description:</p>
        <p className="text-gray-600">{game.description2}</p>
      </div>
    </div>
  );
};

export default GameDetail;
