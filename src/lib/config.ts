
export const config = {
  api: {
    gameSearch: process.env.NEXT_PUBLIC_GAME_SEARCH_API || 'https://api.hk.apks.cc/game/search?page=1&pageSize=20',
    gameInfo: process.env.NEXT_PUBLIC_GAME_INFO_API || 'https://api.hk.apks.cc/game/info',
    gameSearchQuery: process.env.NEXT_PUBLIC_GAME_SEARCH_QUERY_API || 'https://api.hk.apks.cc/game/search',
  },
};
