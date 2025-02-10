import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  const roundedRating = Math.round(rating);

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
    >
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < roundedRating
              ? "fill-primary text-primary"
              : "fill-muted text-muted-foreground"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
