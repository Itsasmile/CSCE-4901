import { ReactNode } from "react";
import { Game } from "@/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  game: Game;
}

export default function GameComponent({ game }: Props): ReactNode {
  const navigate = useNavigate();

  return (
    <div key={game.id} className="w-1/3 p-4">
      <Card className="h-[28rem] flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{game.name}</CardTitle>
          <img
            src={game.image_url}
            alt={game.name}
            className="mb-4 cursor-pointer"
            onClick={() => navigate({ to: `/game/${game.id}` })}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <CardDescription className="font-roboto text-base font-normal text-foreground leading-snug my-2">
            {game.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="text-sm font-normal flex gap-2.5">
          <p>Category: {game.category}</p>
          <p>Platform: {game.platform}</p>
          <p>Rating: {game.rating}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
