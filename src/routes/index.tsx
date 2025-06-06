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
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: Home,
});

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

interface Pr {
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  searchTerm: string;
}

function Stuff({ selectedCategory, setSearchTerm, searchTerm }: Pr): ReactNode {
  if (selectedCategory === "Accessibility")
    return (
      <Select
        value={accessibilityOptions[0]}
        onValueChange={(value) => setSearchTerm(value)}
      >
        <SelectTrigger className="w-[150px] bg-foreground rounded-md py-2 text-background">
          <SelectValue placeholder="Accessibility" />
        </SelectTrigger>
        <SelectContent>
          {accessibilityOptions.map((x) => (
            <SelectItem key={x} value={x}>{x}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

  if (selectedCategory === "Category")
    return (
      <Select
        value={gameCategories[0]}
        onValueChange={(value) => setSearchTerm(value)}
      >
        <SelectTrigger className="w-[150px] bg-foreground rounded-md py-2 text-background">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          {gameCategories.map((x) => (
            <SelectItem key={x} value={x}>{x}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

  if (selectedCategory === "Platform")
    return (
      <Select
        value={platforms[0]}
        onValueChange={(value) => setSearchTerm(value)}
      >
        <SelectTrigger className="w-[150px] bg-foreground rounded-md py-2 text-background">
          <SelectValue placeholder="Platforms" />
        </SelectTrigger>
        <SelectContent>
          {platforms.map((x) => (
            <SelectItem key={x} value={x}>{x}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-2/4 bg-background"
      placeholder="What are you looking for? (Name, Category, Platform, etc)"
    />
  );
}

function Home(): ReactNode {
  const {
    searchTerm,
    currentPage,
    totalPages,
    selectCategory,
    setCurrentPage,
    setSearchTerm,
    getFilteredGames,
    selectedCategory,
  } = useHomeState();

  const gamesPerPage = 12;

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

            <Stuff
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              setSearchTerm={setSearchTerm}
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
