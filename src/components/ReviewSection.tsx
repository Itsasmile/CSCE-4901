import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: number;
  gameId: number;
  authorId: number;
  content: string | null;
  rating: number;
  createdAt: string;
  avatar?: string;
  author?: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <p>No reviews yet. Be the first to leave a review!</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={review.id}>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={review.avatar || "/default-avatar.png"}
                    alt={review.author || "Unknown User"}
                  />
                  <AvatarFallback>
                    {review.author ? review.author.charAt(0) : "?"} {}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.author || "Anonymous"}</p> {}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-muted-foreground">{review.content || "No review content"}</p> {/* ✅ Handle missing content */}
              {index < reviews.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
