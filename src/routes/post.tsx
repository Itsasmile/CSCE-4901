import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { gamesTables } from "@/db/schema";
import { db } from "@/db-connection";
import { MultiSelect } from "@/components/ui/multi-select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/post")({
  component: RouteComponent,
});
const gameCategories = [
  "Action RPG",
  "Survival Horror",
  "Metroidvania",
  "Roguelike",
  "Tower Defense",
  "Battle Royale",
  "City Builder",
  "Farming Simulator",
  "Turn-Based Strategy",
  "Card Battler",
  "Hack and Slash",
  "Rhythm Game",
  "Soulslike",
  "Text-Based Adventure",
  "MMORPG",
  "Sandbox",
  "Bullet Hell",
  "Stealth",
  "Party Game",
  "Auto Battler",
];

const accessibilityOptions = [
  "Colorblind Modes",
  "High Contrast Mode",
  "Text Size Adjustments",
  "Customizable UI",
  "Screen Reader Support",
  "No Flashing Effects",
  "Subtitles & Closed Captions",
  "Speaker Identification in Subtitles",
  "Visual Sound Indicators",
  "Customizable Subtitle Backgrounds",
  "Rebindable Controls",
  "One-Handed Mode",
  "Toggle vs. Hold Options",
  "Assist Modes",
  "Adaptive Controller Support",
  "Motion Controls Sensitivity",
  "Difficulty Adjustments",
  "Game Speed Control",
  "Skip Quick-Time Events (QTEs)",
  "Guided Mode",
  "Customizable HUD",
  "Text-to-Speech & Speech-to-Text",
];

const platforms = [
  "PC",
  "PlayStation 5",
  "Xbox Series X/S",
  "Nintendo Switch",
  "Mobile",
  "PlayStation 4",
  "Xbox One",
  "Web Browser",
];

function RouteComponent() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File>();
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const navigate = useNavigate();

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  
  const handlePostGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageDataUrl: string | undefined = undefined;
  
      if (image) {
        imageDataUrl = await fileToBase64(image);
      }
  
      const game: typeof gamesTables.$inferInsert = {
        title,
        categories,
        platform,
        rating,
        image: imageDataUrl,
        description,
        short_description: shortDescription,
        accessibility,
      };
  
      await db.insert(gamesTables).values(game);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };
  

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Card className="container mx-auto py-10 w-2/4 my-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Post a New Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePostGame} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Game Name</Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <MultiSelect
              selected={categories.map((x) => ({ label: x, value: x }))}
              onChange={(e) => setCategories(e.map((x) => x.value))}
              options={gameCategories.map((x) => ({ label: x, value: x }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select onValueChange={setPlatform} value={platform}>
              <SelectTrigger>
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select
              onValueChange={(value) => setRating(Number(value))}
              value={rating.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((r) => (
                  <SelectItem key={r} value={r.toString()}>
                    {r} Star{r !== 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              onChange={uploadImage}
              accept="image/*"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accessibility">Accessibility</Label>
            <MultiSelect
              selected={accessibility.map((x) => ({ label: x, value: x }))}
              onChange={(e) => setAccessibility(e.map((x) => x.value))}
              options={accessibilityOptions.map((x) => ({
                label: x,
                value: x,
              }))}
            />
          </div>

          <Button type="submit" className="w-full">
            Post Game
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
