import { db } from "@/firebase";

import { Game } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { doc, getDoc } from "firebase/firestore";

export const Route = createFileRoute("/game/$gameId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (!params.gameId) return;

    try {
      const gameDoc = doc(db, "games", params.gameId);
      const gameSnapshot = await getDoc(gameDoc);

      if (gameSnapshot.exists()) {
        return {
          id: gameSnapshot.id,
          ...gameSnapshot.data(),
        } as Game;
      } else {
        console.error("Game not found");
      }
    } catch (error) {
      console.error("Error fetching game details:, error");
    }
  },
  pendingComponent: Loading,
  beforeLoad: () => ({ title: "Game" }),
});

function Loading() {
  return <p>Loading...</p>;
}

function RouteComponent() {
  const game = Route.useLoaderData();

  if (!game) {
    return <div>No game found</div>;
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
