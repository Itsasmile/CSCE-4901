import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface GameDescriptionProps {
  title: string;
  description: string;
  genre: string;
  developer: string;
  releaseDate: string;
  imageUrl: string;
  rating: number;
  accessibility: string[];
  categories: string[];
}

export function GameDescription({
  title,
  description,
  genre,
  developer,
  releaseDate,
  imageUrl,
  rating,
  categories,
  accessibility,
}: GameDescriptionProps) {
  const categoryBadges = categories.map((category, index) => (
    <Badge key={index} variant="secondary">
      {category}
    </Badge>
  ));

  const accessibilityBadges = accessibility.map((category, index) => (
    <Badge key={index} variant="outline">
      {category}
    </Badge>
  ));

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <Badge variant="secondary">{genre}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <p>
                <strong>Developer:</strong> {developer}
              </p>
              <p>
                <strong>Release Date:</strong> {releaseDate}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Rating</h3>
              <div className="flex items-center space-x-2">
                <Progress value={rating * 20} className="w-full" />
                <span className="font-bold">{rating}/5</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <div className="flex flex-wrap gap-2">{accessibilityBadges}</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">{categoryBadges}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
