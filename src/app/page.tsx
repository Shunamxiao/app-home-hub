
import { GameListItem } from '@/components/game-list-item';
import { SearchBar } from '@/components/search-bar';
import type { Game } from '@/lib/games';
import { Suspense } from 'react';
import { config } from '@/lib/config';

async function getGamesFromApi(): Promise<Game[]> {
  try {
    const response = await fetch(config.api.gameSearch, { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error('Failed to fetch games from API');
      return [];
    }
    const result = await response.json();
    
    if (result && result.list) {
      return result.list.map((item: any) => ({
        id: item._id,
        pkg: item.pkg,
        name: item.metadata?.cht || item.name,
        iconUrl: item.icon || '/placeholder.svg',
        iconHint: item.tags?.slice(0, 2).join(' ') || 'game icon',
        description: item.summary,
        tags: item.tags || [],
        region: item.metadata?.region || '',
        star: item.star || 0,
      }));
    }

    console.error('API response for game list is not in the expected format:', result);
    return [];
    
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export default async function Home() {
  const games = await getGamesFromApi();

  return (
    <main className="container mx-auto px-2 sm:px-4 py-8">
      <header className="flex flex-col items-center justify-center text-center py-8 md:py-12">
        <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl tracking-wider text-primary drop-shadow-lg">
          游戏宇宙中心
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl">
          您的快乐源泉！发现并下载最棒的手机游戏。
        </p>
        <div className="mt-8 w-full max-w-2xl">
          <Suspense fallback={<div></div>}>
            <SearchBar />
          </Suspense>
        </div>
      </header>
      
      <section className="py-8 md:py-12">
        <h2 className="font-headline text-4xl sm:text-5xl mb-8 tracking-wide text-center">热门游戏</h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4">
            {games.map((game, index) => (
              <GameListItem key={game.id} game={game} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
