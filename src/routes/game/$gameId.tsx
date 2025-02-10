import { db, auth } from "@/firebase"; // Import `auth`
import { Game } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { doc, getDoc, getDocs, collection, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const Route = createFileRoute("/game/$gameId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (!params.gameId) return;

    try {
      const gameDoc = doc(db, "games", params.gameId);
      const gameSnapshot = await getDoc(gameDoc);

      // Fetch comments specific to the game
      const commentsCollection = collection(db, "comments");
      const commentsQuery = query(commentsCollection, where("gameId", "==", params.gameId));
      const commentsSnapshot = await getDocs(commentsQuery);
      const comments = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      




      if (gameSnapshot.exists()) {
        return {
          id: gameSnapshot.id,
          comments: comments,
          ...gameSnapshot.data(),
        } as Game;
      } else {
        console.error("Game not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching game details:", error);
      return null;
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(game?.comments || []);
  const [user, setUser] = useState<any>(null); // Store logged-in user info

  // Listen for authentication state change
  useState(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the logged-in user
    });
  });

  if (!game) {
    return <div>No game found</div>;
  }

  // 📝 Function to Post a Comment
  const postComment = async () => {
    if (!comment.trim()) return;
    if (!user) {
      alert("You need to be logged in to post a comment.");
      return;
    }

    try {
      const newComment = {
        gameId: game.id,
        userId: user.uid, // 🔹 Use actual user ID
        userName: user.displayName || "Anonymous", // Store display name
        content: comment,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "comments"), newComment);
      console.log("Comment posted with ID:", docRef.id);

      // Update comments UI
      setComments([...comments, { id: docRef.id, ...newComment }]);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

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

      {/* Comment Section */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold">Comments:</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-t border-gray-200 pt-4">
              <p className="font-bold">{comment.userName}</p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}

        {/*  Comment Input */}
        <div className="mt-4 flex flex-col">
          <textarea
            className="border rounded p-2"
            placeholder={user ? "Write a comment..." : "Log in to post a comment"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user} // Disable if not logged in
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={postComment}
            disabled={!user} // Disable if not logged in
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
