import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Import Firebase services
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/post")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const navigate = useNavigate();

  const handlePostGame = async (e:FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "games"), {
        name,
        category,
        platform,
        rating,
        image_url: imageUrl,
        description,
        description2,
        accessibility,
      });
      navigate({to:"/"});
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <div className="border-border flex justify-center items-baseline mt-4 h-screen">
      <div className="border-border border bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Post a New Game</h2>
        <form onSubmit={handlePostGame}>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="name">
              Game Name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </Label>
            <Input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="platform">
              Platform
            </Label>
            <Input
              type="text"
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="rating">
              Rating
            </Label>
            <Input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="imageUrl">
              Image URL
            </Label>
            <Input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="description2">
              Additional Description
            </Label>
            <textarea
              id="description2"
              value={description2}
              onChange={(e) => setDescription2(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 mb-2" htmlFor="accessibility">
              Accessibility
            </Label>
            <textarea
              id="accessibility"
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value)}
              className="mt-4 p-2 border rounded-lg w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full mb-2"
          >
            Post Game
          </Button>
        </form>
      </div>
      </div>
  );
}
