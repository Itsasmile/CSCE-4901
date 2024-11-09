import { ReactNode } from "react";
import GameComponent from "@/components/GameComponent";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useHomeState } from "@/hooks/useHomeState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Home(): ReactNode {
  const {
    searchTerm,
    currentPage,
    allGames,
    totalPages,
    selectCategory,
    setCurrentPage,
    setSearchTerm,
  } = useHomeState();

  const gamesPerPage = 6;

  return (
    <section className="bg-background">
      <article className="bg-secondary py-8">
        <div className="container mx-auto text-center text-foreground">
          <h2 className="text-4xl font-sans font-bold mb-4">We share what we love</h2>
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
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 p-2 rounded-l-lg border-none"
              placeholder="What are you looking for? (Name, Category, Platform, etc)"
            />
          </div>
        </div>
      </article>

      <article className="main-content container mx-auto py-10">
        <section className="flex flex-wrap justify-between">
          {allGames
            .slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage)
            .map((game) => (
              <GameComponent game={game} />
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
      </article>
    </section>
  );
}

export default Home;
