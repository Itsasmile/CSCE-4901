import { db } from "@/db-connection";
import { gamesTables } from "@/db/schema";
import { Game } from "@/types";
import { useEffect, useState } from "react";

export interface HomeState {
  allGames: Game[];
  currentPage: number;
  selectedCategory: string;
  searchTerm: string;
  totalPages: number;
}

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

export function useHomeState() {
  const [state, setState] = useState<HomeState>({
    allGames: [],
    currentPage: 1,
    selectedCategory: "All",
    searchTerm: "",
    totalPages: 1,
  });

  useEffect(() => {
    fetchGames();
  }, []);

  function getFilteredGames() {
    const lowerCaseSearchTerm = state.searchTerm?.toLowerCase() || "";
    const filteredGames = state.allGames.filter((game) => {
      const name = game.title.toLowerCase();
      const categories = game.categories;
      const platform = game.platform.toLowerCase();
      const accessibility = game.accessibility;

      if (state.selectedCategory === "All") {
        return (
          name.includes(lowerCaseSearchTerm) ||
          categories.includes(lowerCaseSearchTerm) ||
          platform.toLowerCase().includes(lowerCaseSearchTerm) ||
          accessibility.includes(lowerCaseSearchTerm)
        );
      }

      if (state.selectedCategory === "Name") {
        return name.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (state.selectedCategory === "Category") {
        return categories.some((x) =>
          x.toLowerCase().includes(lowerCaseSearchTerm)
        );
      } else if (state.selectedCategory === "Platform") {
        return platform.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (
        state.selectedCategory === "Accessibility" &&
        game.accessibility
      ) {
        return accessibility.some((x) =>
          x.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      return false;
    });

    return filteredGames;
  }

  const fetchGames = async () => {
    try {
      const games = await db.select().from(gamesTables);

      setState({
        ...state,
        allGames: games.map((x) => x as unknown as Game),
        totalPages: Math.ceil(games.length / 12),
      });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  function setCurrentPage(page: number) {
    if (page === 0 || page > state.totalPages) return;

    setState({
      ...state,
      currentPage: page,
    });
  }

  function selectCategory(value: string) {
    let searchTerm = "";
    if (value === "Accessibility") searchTerm = accessibilityOptions[0];

    setState({
      ...state,
      selectedCategory: value,
      searchTerm: searchTerm,
    });
  }

  function setSearchTerm(value: string) {
    setState({
      ...state,
      searchTerm: value,
    });
  }

  function setGames(games: Game[]) {
    setState({
      ...state,
      allGames: games,
    });
  }

  return {
    setCurrentPage,
    selectCategory,
    setSearchTerm,
    setGames,
    getFilteredGames,
    ...state,
  };
}
