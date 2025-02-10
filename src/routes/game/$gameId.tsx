import { GameDescription } from "@/components/GameDescription";
import { ReviewSection } from "@/components/ReviewSection";
import { db } from "@/db-connection";
import { gamesTables } from "@/db/schema";

import { Game } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/game/$gameId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (!params.gameId) return;

    try {
      const game = (
        await db
          .select()
          .from(gamesTables)
          .where(eq(gamesTables.id, Number.parseInt(params.gameId)))
      )[0];

      if (game) {
        return game as unknown as Game;
      } else {
        console.error("Game not found");
      }
    } catch (error) {
      console.error("Error fetching game details.", error);
    }

    return undefined;
  },
  pendingComponent: Loading,
  beforeLoad: () => ({ title: "Game" }),
});

function Loading() {
  return <p>Loading...</p>;
}

const reviews = [
  {
    id: 1,
    author: "SpaceGamer42",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Absolutely mind-blowing! The attention to detail in the alien worlds is incredible. I've spent countless hours exploring and still feel like I've only scratched the surface.",
    rating: 5,
  },
  {
    id: 2,
    author: "GalacticQueen",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The story is engaging and the character development is top-notch. However, I found some of the later levels a bit repetitive. Still, it's a solid game overall.",
    rating: 4,
  },
  {
    id: 3,
    author: "NebulaNavigator",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Cosmic Explorers sets a new standard for space exploration games. The physics engine is incredibly realistic, and the multiplayer mode is a blast with friends!",
    rating: 5,
  },
];

function RouteComponent() {
  const game = Route.useLoaderData();
  const date = new Date();

  if (!game) {
    return <div>No game found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GameDescription
        accessibility={game.accessibility}
        categories={game.categories}
        description={game.description}
        developer={"Some Developer"}
        genre={game.categories[0]}
        imageUrl={game.image}
        rating={game.rating}
        releaseDate={date.toLocaleDateString()}
        title={game.title}
      />
      <ReviewSection reviews={reviews} />
    </div>
  );
}
