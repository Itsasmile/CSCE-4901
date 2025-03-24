import { ReactNode } from "react";
import { Game } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "@tanstack/react-router";
import { Badge } from "./ui/badge";
import { StarRating } from "./star-rating";
import { GameImage } from "./game-image";

interface Props {
  game: Game;
  
}

export default function GameComponent({ game }: Props): ReactNode {
  return (
    <Link to={`/game/${game.id}`} key={game.id} className="p-4">
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0">
          <GameImage src={game.image} alt={`Screenshot from ${game.title}`} />
        </CardHeader>
        <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
          <CardTitle className="line-clamp-1">{game.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {game.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{game.categories[0]}</Badge>
              <Badge variant="outline">{game.platform}</Badge>
            </div>
            <StarRating rating={game.rating} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
