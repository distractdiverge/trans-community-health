import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Creator } from "@/types/creator";

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {creator.display_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            Sharing experiences with hormone therapy and related health conditions
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">TikTok: </span>
            <a
              href={`https://tiktok.com/@${creator.tiktok_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              @{creator.tiktok_handle}
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline">
          <a href={`/creator/${creator.id}`} className="flex items-center gap-2">
            View Content <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
