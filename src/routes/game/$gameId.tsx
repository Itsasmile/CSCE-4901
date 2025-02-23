import { useState, useContext } from "react";
import { GameDescription } from "@/components/GameDescription";
import { ReviewSection } from "@/components/ReviewSection";
import { db } from "@/db-connection";
import { gamesTables, reviewsTables } from "@/db/schema";
import { AuthContext } from "@/context/AuthContext";
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

      const rawReviews = await db
        .select()
        .from(reviewsTables)
        .where(eq(reviewsTables.gameId, Number.parseInt(params.gameId)));

      if (game) {
        return { game: game as unknown as Game, reviews: rawReviews };
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

function RouteComponent() {
  const data = Route.useLoaderData();
  const authState = useContext(AuthContext);
  const user = authState?.user;

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState(data?.reviews || []);

  if (!data?.game) {
    return <div>No game found</div>;
  }

  const handlePostReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to post a review.");
      return;
    }

    try {
      const newReview = {
        authorId: user.id,
        content,
        rating,
        gameId: data.game.id,
        timestamp: new Date().toISOString(),
      };

      await db.insert(reviewsTables).values(newReview);

      setReviews((prevReviews) => [...prevReviews, newReview]);
      setContent("");
      setRating(5);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <GameDescription
        accessibility={data.game.accessibility}
        categories={data.game.categories}
        description={data.game.description}
        developer={"Some Developer"}
        genre={data.game.categories[0]}
        imageUrl={data.game.image}
        rating={data.game.rating}
        releaseDate={new Date().toLocaleDateString()}
        title={data.game.title}
      />

      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        <ReviewSection reviews={reviews} />
      ) : (
        <p>No reviews available for this game.</p>
      )}

      {/* Review Form */}
      {user && (
        <form onSubmit={handlePostReview} className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Write your review here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="flex items-center gap-2 mt-2">
            <label className="font-semibold">Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded px-2 py-1 w-16"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Post Review
          </button>
        </form>
      )}
    </div>
  );
}
