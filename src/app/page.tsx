
import { GameListItem } from '@/components/game-list-item';
import { SearchBar } from '@/components/search-bar';
import type { Game } from '@/lib/games';
import { Suspense } from 'react';
import { config } from '@/lib/config';

const AD_ICON =
  'https://cdn.apks.cc/blinko/1764253394837-1764253394836-zCSGnBtZk0Lmp1BAbyaZfLktDzHmC6oke67qzz3G1lBegAF2asyt5KzXOJ2PVdHDYkU_w2560-h1440-rw.webp';

async function getGamesFromApi(): Promise<Game[]> {
  try {
    const response = await fetch(config.api.gameSearch, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('API error for game list. Status:', response.status);
      return [];
    }

    const result = await response.json();
    
    if (result?.data?.list) {
      return result.data.list.map((item: any) => ({
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
    console.error('Error fetching games from API:', error);
    return [];
  }
}

export default async function Home() {
  const games = await getGamesFromApi();

  return (
    <main className="container mx-auto px-2 sm:px-4 py-8">
      <header className="flex flex-col items-center justify-center text-center py-8 md:py-12">
        <h1 className="font-headline text-4xl sm:text-7xl md:text-8xl tracking-wider text-primary drop-shadow-lg">
          游戏宇宙中心
        </h1>

        <p className="mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl text-left">
          发现并下载最棒的手机游戏，推荐保存到网盘下载，免费!
        </p>
        <div className="mt-8 w-full max-w-2xl">
          <Suspense fallback={<div />} >
            <SearchBar />
          </Suspense>
        </div>
        {/* 🔥 广告入口（小方块） */}
        <div className="mt-6 grid grid-cols-4 gap-3 max-w-md w-full">
          <a
            href="https://apks.pgid.club/"
            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-muted transition"
          >
            <img
              src={AD_ICON}
              alt="购买账号"
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="text-xs text-center text-red-500">
              谷歌账号
            </span>
          </a>

          <a
            href="https://go.jujujuhaowan.com/?inviteCode=B0000359"
            className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-muted transition"
          >
            <img
              src={AD_ICON}
              alt="充值优惠"
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="text-xs text-center text-red-500">
              游戏充值
            </span>
          </a>

          {/* 预留位，后面直接补 */}
          <div className="opacity-0" />
          <div className="opacity-0" />
        </div>

        
      </header>

      <section className="py-10 md:py-14">
        {/* 🎮 热门游戏标题 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-border" />
          <h2 className="font-headline text-3xl sm:text-4xl tracking-wide">
            热门游戏
          </h2>
          <div className="h-px w-12 bg-border" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4">
            {games.map((game, index) => (
              <GameListItem
                key={game.id}
                game={game}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
