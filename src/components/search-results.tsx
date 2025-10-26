'use client';

import { useContext, useEffect } from 'react';
import { GameListItem } from '@/components/game-list-item';
import { AlertCircle, Gamepad2, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Game } from '@/lib/games';
import { LoadingContext } from './layout-provider';
import { Button } from './ui/button';

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
        </>
      ) : (
        query && (
          <div className="text-center max-w-md mx-auto">
            <Alert variant="destructive" className='bg-background text-left'>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className='font-headline text-2xl'>未找到游戏!</AlertTitle>
              <AlertDescription className='text-base'>
                我们找不到与您的搜索匹配的任何游戏。您可以向我们反馈。
              </AlertDescription>
            </Alert>
            
            <div className="mt-6 flex flex-col items-center gap-4">
                <Button asChild>
                    <a href="mailto:apkscc-feedback@foxmail.com?subject=Feedback for missing game">
                        <Mail className="mr-2 h-4 w-4" />
                        反馈缺失游戏
                    </a>
                </Button>
                <p className="text-sm text-muted-foreground">
                    如果缺少游戏急需，请发送邮件反馈，或者联系QQ：3788767702
                </p>
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
