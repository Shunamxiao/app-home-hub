import Image from 'next/image';
import Link from 'next/link';
import type { Game } from '@/lib/games';
import { Button } from '@/components/ui/button';
import { Download, Star } from 'lucide-react';
import { Badge } from './ui/badge';

type GameListItemProps = {
  game: Game;
  rank: number;
};

export function GameListItem({ game, rank }: GameListItemProps) {
  const getRankColor = () => {
    switch(rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-slate-400';
      case 3: return 'text-orange-400';
      default: return 'text-muted-foreground';
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
      <div className={`text-xl font-bold w-8 text-center ${getRankColor()}`}>{rank}</div>
      <Image
        src={game.iconUrl}
        alt={`${game.name} icon`}
        width={64}
        height={64}
        className="rounded-xl"
        data-ai-hint={game.iconHint}
      />
      <div className="flex-grow">
        <h3 className="text-lg font-bold truncate">{game.name}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{game.rating.toFixed(1)}</span>
            </div>
            <span>{game.size}</span>
            <span>{game.downloads}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
            {game.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
        </div>
      </div>
      <Button asChild className="font-bold shrink-0">
        <Link href={game.downloadUrl}>
          <Download className="mr-2 h-4 w-4" />
          下载
        </Link>
      </Button>
    </div>
  );
}
