import { Game } from "@/types";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firebase services

export interface HomeState {
  allGames: Game[];
  currentPage: number;
  selectedCategory: string;
  searchTerm: string;
  totalPages: number;
}

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
      const name = game.name.toLowerCase();
      const category = game.category.toLowerCase();
      const platform = game.platform.toLowerCase();
      const accessibility = game.accessibility?.toLowerCase();

      if (state.selectedCategory === "All") {
        return (
          name.includes(lowerCaseSearchTerm) ||
          category.toLowerCase().includes(lowerCaseSearchTerm) ||
          platform.toLowerCase().includes(lowerCaseSearchTerm) ||
          accessibility?.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }

      if (state.selectedCategory === "Name") {
        return name.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (state.selectedCategory === "Category") {
        return category.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (state.selectedCategory === "Platform") {
        return platform.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (
        state.selectedCategory === "Accessibility" &&
        game.accessibility
      ) {
        return accessibility.toLowerCase().includes(lowerCaseSearchTerm);
      }

      return false;
    });

    return filteredGames;
  }

  const fetchGames = async () => {
    try {
      const gamesCollection = collection(db, "games");
      const gamesSnapshot = await getDocs(gamesCollection);
      const gamesList = gamesSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Game
      );

      setState({
        ...state,
        allGames: gamesList,
        totalPages: Math.ceil(gamesList.length / 6),
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
    setState({
      ...state,
      selectedCategory: value,
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
