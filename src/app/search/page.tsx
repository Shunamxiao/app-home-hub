
import Link from 'next/link';
import { GameListItem } from '@/components/game-list-item';
import { SearchBar } from '@/components/search-bar';
import { AiSuggestions } from '@/components/ai-suggestions';
import { AlertCircle, Gamepad2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Game } from '@/lib/games';

async function searchGamesFromApi(query: string): Promise<Game[]> {
  if (!query) return [];
  try {
    const response = await fetch(`https://api.us.apks.cc/game/search?q=${encodeURIComponent(query)}`, { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error('Failed to fetch games from API');
      return [];
    }
    const data = await response.json();
    
    if (!data.list) {
      return [];
    }

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


type SearchPageProps = {
  searchParams: { q?: string };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = await searchGamesFromApi(query);

  return (
    <main className="container mx-auto px-2 sm:px-4 py-8">
      <header className="flex flex-col items-center justify-center text-center py-8 md:py-12">
        <Link href="/" aria-label="返回首页">
          <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl tracking-wider text-primary drop-shadow-lg">
            游戏宇宙中心
          </h1>
        </Link>
        <div className="mt-8 w-full max-w-2xl">
          <SearchBar />
        </div>
      </header>

      <section>
        {query && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            搜索结果: <span className="text-primary">"{query}"</span>
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
                    <AlertTitle className='font-headline text-2xl'>未找到游戏!</AlertTitle>
                    <AlertDescription className='text-base'>
                        我们找不到与您的搜索匹配的任何游戏。试试下面的建议之一。
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
            <h3 className="mt-4 text-2xl font-semibold">开始搜索</h3>
            <p className="mt-2 text-muted-foreground">在上方输入游戏名称以找到您要查找的内容。</p>
           </div>
        )}
      </section>
    </main>
  );
}
