'use client';

import { useContext, useEffect } from 'react';
import { GameListItem } from '@/components/game-list-item';
import { AiSuggestions } from '@/components/ai-suggestions';
import { AlertCircle, Gamepad2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Game } from '@/lib/games';
import { LoadingContext } from './layout-provider';

type SearchResultsProps = {
  query: string;
  results: Game[];
};

export function SearchResults({ query, results }: SearchResultsProps) {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, results]);

  return (
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
  );
}
