import { GameListItem } from '@/components/game-list-item';
import { SearchBar } from '@/components/search-bar';
import type { Game } from '@/lib/games';

async function getGamesFromApi(): Promise<Game[]> {
  try {
    const response = await fetch('https://api.us.apks.cc/game/search', { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error('Failed to fetch games from API');
      return [];
    }
    const data = await response.json();
    
    // Map the API response to our Game type
    return data.list.map((item: any) => ({
      id: item._id,
      name: item.name,
      iconUrl: item.icon,
      iconHint: item.tags.slice(0, 2).join(' ') || 'game icon',
      description: item.summary,
      tags: item.tags,
      downloadUrl: '#', // Placeholder
      rating: 0, // Placeholder
      size: 'N/A', // Placeholder
      downloads: 'N/A' // Placeholder
    }));
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
        <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl tracking-wider text-primary drop-shadow-lg">
          GameVerse Hub
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">
          Your portal to a universe of fun! Discover and download the best mobile games.
        </p>
        <div className="mt-8 w-full max-w-2xl">
          <SearchBar />
        </div>
      </header>
      
      <section className="py-8 md:py-12">
        <h2 className="font-headline text-4xl sm:text-5xl mb-8 tracking-wide text-center">Trending Games</h2>
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
