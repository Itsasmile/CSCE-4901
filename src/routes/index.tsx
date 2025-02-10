import GameComponent from "@/components/GameComponent";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHomeState } from "@/hooks/useHomeState";
import { createFileRoute } from "@tanstack/react-router";
import { ReactNode } from "react";
import gamesJson from "../assets/games.json";
import { gamesTables } from "@/db/schema";
import { Game } from "@/types";
import { db } from "@/db-connection";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home(): ReactNode {
  const {
    searchTerm,
    currentPage,
    totalPages,
    selectCategory,
    setCurrentPage,
    setSearchTerm,
    getFilteredGames,
  } = useHomeState();

  const gamesPerPage = 6;

  const gameCategories: string[] = [
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

  const accessibilityOptions: string[] = [
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

  function getRandomRange<T>(
    arr: T[],
    minLength: number,
    maxLength: number
  ): T[] {
    const start = Math.floor(Math.random() * arr.length);
    const end = Math.min(
      start +
        Math.floor(Math.random() * (maxLength - minLength + 1)) +
        minLength,
      arr.length
    );
    return arr.slice(start, end);
  }

  async function importGames() {
    const games: Game[] = [];

    for (const game of gamesJson) {
      // @ts-expect-error id not required
      games.push({
        title: game.name,
        accessibility: getRandomRange(accessibilityOptions, 1, 5),
        categories: getRandomRange(gameCategories, 1, 4),
        description: game.description,
        short_description: game.description2,
        image: game.image_url,
        platform: game.platform,
        rating: game.rating as number,
      });
    }

    await db.insert(gamesTables).values(games);
  }

  return (
    <section className="min-h-screen space-y-8">
      <article className="bg-secondary py-8">
        <div className="container mx-auto text-center text-foreground">
          <h2 className="text-4xl font-sans font-bold mb-4">
            We share what we love
          </h2>
          <p className="italic mb-6 font-sans">
            "NOTHING IS ABSOLUTE, NOTHING IS FOREVER, NOTHING FROM NOTHING"
          </p>
          <div className="flex justify-center items-center space-x-2">
            <Select
              defaultValue="All"
              onValueChange={(value) => selectCategory(value)}
            >
              <SelectTrigger className="w-[150px] bg-foreground rounded-md py-2 text-background">
                <SelectValue placeholder="Selected Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Name">Name</SelectItem>
                <SelectItem value="Category">Category</SelectItem>
                <SelectItem value="Platform">Platform</SelectItem>
                <SelectItem value="Accessibility">Accessibility</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-2/4 bg-background"
              placeholder="What are you looking for? (Name, Category, Platform, etc)"
            />
          </div>
        </div>
      </article>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>
              {currentPage} / {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className="hover:cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <section className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getFilteredGames()
          .slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage)
          .map((game) => (
            <GameComponent key={game.id} game={game} />
          ))}
      </section>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>
              {currentPage} / {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className="hover:cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
