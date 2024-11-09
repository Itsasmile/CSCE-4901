import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import './GameDetail.css';
import { db } from './firebaseConfig';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [comments, setComments] = useState([]);

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
        <GameDetailSection title="Category" content={game.category} />
        <GameDetailSection title="Platform" content={game.platform} />
        <GameDetailSection title="Rating" content={game.rating} />
        <GameDetailSection title="Description" content={game.description} />
        <GameDetailSection title="Additional Description" content={game.description2} />
        {game.accessibility && <GameDetailSection title="Accessibility" content={game.accessibility} />}
        <CommentsSection comments={comments} />
      </div>
    </div>
  );
};

const GameDetailSection = ({ title, content }) => (
  <div className="mb-4">
    <p className="text-gray-700 mb-2 font-bold">{title}:</p>
    <p className="text-gray-600">{content}</p>
  </div>
);
const CommentsSection = ({ comments }) => (
  <div className="mb-4">
    <p className="text-gray-700 mb-2 font-bold">Comments:</p>
    {comments.length > 0 ? (
      comments.map((comment, index) => (
        <p key={index} className="text-gray-600 mb-2">{comment}</p>
      ))
    ) : (
      <p className="text-gray-600">No comments available.</p>
    )}
  </div>
);

export default GameDetail;
