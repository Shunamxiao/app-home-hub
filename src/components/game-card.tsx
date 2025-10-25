import Image from 'next/image';
import Link from 'next/link';
import type { Game } from '@/lib/games';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Image
          src={game.iconUrl}
          alt={`${game.name} icon`}
          width={64}
          height={64}
          className="flex-shrink-0 rounded-xl border"
          data-ai-hint={game.iconHint}
        />
        <div className="flex flex-col gap-2 min-w-0">
          <CardTitle className="truncate font-headline text-2xl tracking-wide">{game.name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-semibold">{tag}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{game.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Button asChild className="w-full font-bold text-base group" size="lg">
          <Link href={game.downloadUrl}>
            <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
            Download
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
