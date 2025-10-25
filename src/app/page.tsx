import { GameCard } from '@/components/game-card';
import { SearchBar } from '@/components/search-bar';
import { getGames } from '@/lib/games';

export default function Home() {
  const games = getGames();

  return (
    <main className="container mx-auto px-4 py-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </main>
  );
}
