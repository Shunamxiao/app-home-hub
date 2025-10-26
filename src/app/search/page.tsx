import Link from 'next/link';
import { GameListItem } from '@/components/game-list-item';
import { SearchBar } from '@/components/search-bar';
import { searchGames } from '@/lib/games';
import { AiSuggestions } from '@/components/ai-suggestions';
import { AlertCircle, Gamepad2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type SearchPageProps = {
  searchParams: { q?: string };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = searchGames(query);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex flex-col items-center justify-center text-center py-8 md:py-12">
        <Link href="/" aria-label="Back to homepage">
          <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl tracking-wider text-primary drop-shadow-lg">
            GameVerse Hub
          </h1>
        </Link>
        <div className="mt-8 w-full max-w-2xl">
          <SearchBar />
        </div>
      </header>

      <section>
        {query && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Search results for: <span className="text-primary">"{query}"</span>
          </h2>
        )}

        {results.length > 0 ? (
          <>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col gap-4">
                {results.map((game, index) => (
                  <GameListItem key={game.id} game={game} rank={index + 1} />
                ))}
              </div>
            </div>
            <div className="mt-12">
              <AiSuggestions searchTerm={query} initialResults={results.map(g => g.name)} />
            </div>
          </>
        ) : (
          query && (
            <div className="text-center max-w-md mx-auto">
                <Alert variant="destructive" className='bg-background text-left'>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className='font-headline text-2xl'>No Games Found!</AlertTitle>
                    <AlertDescription className='text-base'>
                        We couldn't find any games matching your search. Try one of the suggestions below.
                    </AlertDescription>
                </Alert>
              
              <div className="mt-12">
                <AiSuggestions searchTerm={query} initialResults={[]} />
              </div>
            </div>
          )
        )}

        {!query && (
           <div className="text-center py-20">
            <Gamepad2 className="mx-auto h-24 w-24 text-muted-foreground/50" />
            <h3 className="mt-4 text-2xl font-semibold">Start your search</h3>
            <p className="mt-2 text-muted-foreground">Enter a game name above to find what you're looking for.</p>
           </div>
        )}
      </section>
    </main>
  );
}
