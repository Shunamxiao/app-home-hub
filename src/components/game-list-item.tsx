import Image from 'next/image';
import Link from 'next/link';
import type { Game } from '@/lib/games';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Badge } from './ui/badge';

type GameListItemProps = {
  game: Game;
  rank: number;
};

// A simple hash function to get a color index from a string
const getColorIndexFromString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
};

const badgeColors = [
    'bg-sky-100 text-sky-800 border-sky-300',
    'bg-amber-100 text-amber-800 border-amber-300',
    'bg-emerald-100 text-emerald-800 border-emerald-300',
    'bg-violet-100 text-violet-800 border-violet-300',
    'bg-pink-100 text-pink-800 border-pink-300',
    'bg-rose-100 text-rose-800 border-rose-300',
];


export function GameListItem({ game, rank }: GameListItemProps) {
  const getRankColor = () => {
    switch(rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-400';
      case 3: return 'text-orange-500';
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
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-bold truncate">{game.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 truncate">
          {game.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
            {game.tags.slice(0, 2).map((tag, index) => {
              const colorIndex = getColorIndexFromString(tag) % badgeColors.length;
              return (
                <Badge key={tag} variant="outline" className={`text-xs ${badgeColors[colorIndex]}`}>
                  {tag}
                </Badge>
              );
            })}
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
