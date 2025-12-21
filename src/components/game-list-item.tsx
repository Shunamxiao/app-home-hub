
'use client';

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
      case 2: return 'text-gray-400';
      case 3: return 'text-orange-500';
      default: return 'text-muted-foreground';
    }
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
      <Link href={`/game/${game.pkg}`} className="flex items-center gap-3 sm:gap-4 flex-grow min-w-0">
        <div className={`text-lg sm:text-xl font-bold w-8 text-center shrink-0 ${getRankColor()}`}>{rank}</div>
        <Image
            src={game.iconUrl}
            alt={`${game.name} icon`}
            width={64}
            height={64}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl shrink-0"
            data-ai-hint={game.iconHint}
        />
        <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold truncate">{game.name}</h3>
                {game.region && <Badge variant="secondary" className="text-xs shrink-0">{game.region}</Badge>}
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                {game.star > 0 && (
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        <span>{game.star.toFixed(1)}</span>
                    </div>
                )}
                <p className="truncate">
                    {game.tags.join(' · ')}
                </p>
            </div>
            <p className="text-xs text-muted-foreground/80 mt-1 truncate">
                {game.description}
            </p>
        </div>
      </Link>
      <Button asChild className="font-bold shrink-0 text-xs sm:text-sm h-10 px-3 sm:px-4 rounded-full">
          <Link href={`/game/${game.pkg}`}>
              获取
          </Link>
      </Button>
    </div>
  );
}
