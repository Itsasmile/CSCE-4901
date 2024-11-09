import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firebase services
import { Game } from "@/types";

export default function GamePage(): ReactNode {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  if (!id) return <p>No game found</p>;

  async function fetchGame() {
    if (!id) return;

    try {
      const gameDoc = doc(db, "games", id);
      const gameSnapshot = await getDoc(gameDoc);

      if (gameSnapshot.exists()) {
        setGame({
          id: gameSnapshot.id,
          ...gameSnapshot.data(),
        } as Game);
      } else {
        console.error("Game not found");
      }
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  }

  useEffect(() => {
    fetchGame();
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-3.5 bg-card rounded shadow-md border-input border container mx-auto py-10">
      <img src={game.image_url} alt={game.name} />
      <h2 className="text-3xl font-bold">{game.name}</h2>
      <p className="font-bold">Category:</p>
      <p>{game.category}</p>
      <p className="font-bold">Platform:</p>
      <p>{game.platform}</p>
      <p className="font-bold">Rating:</p>
      <p>{game.rating}</p>
      <p className="font-bold">Description:</p>
      <p>{game.description}</p>
      <p className="font-bold">Additional Description:</p>
      <p>{game.description2}</p>
      <p className="font-bold">Accessibility:</p>
      <p>{game.accessibility}</p>
    </div>
  );
}
