import { PlaceHolderImages } from './placeholder-images';

export type Game = {
  id: string;
  name: string;
  iconUrl: string;
  iconHint: string;
  description: string;
  tags: string[];
  downloadUrl: string;
};

const getImage = (id: string): { url: string; hint: string } => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        return {
            url: `https://picsum.photos/seed/${id}/200/200`,
            hint: "placeholder"
        };
    }
    return {
        url: img.imageUrl,
        hint: img.imageHint
    };
}

export const games: Game[] = [
  {
    id: '1',
    name: 'Pixel Raiders',
    iconUrl: getImage('pixel-raiders').url,
    iconHint: getImage('pixel-raiders').hint,
    description: 'Embark on an epic quest in a retro-style world!',
    tags: ['RPG', 'Adventure', 'Pixel Art'],
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Cyber Sprint',
    iconUrl: getImage('cyber-sprint').url,
    iconHint: getImage('cyber-sprint').hint,
    description: 'Race through a neon-lit city of the future.',
    tags: ['Runner', 'Sci-Fi', 'Action'],
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'Mystic Grove',
    iconUrl: getImage('mystic-grove').url,
    iconHint: getImage('mystic-grove').hint,
    description: 'Solve puzzles in an enchanted, magical forest.',
    tags: ['Puzzle', 'Fantasy', 'Casual'],
    downloadUrl: '#'
  },
  {
    id: '4',
    name: 'Star Voyager',
    iconUrl: getImage('star-voyager').url,
    iconHint: getImage('star-voyager').hint,
    description: 'Explore unknown galaxies and trade with aliens.',
    tags: ['Strategy', 'Sci-Fi', 'Space'],
    downloadUrl: '#'
  },
  {
    id: '5',
    name: 'Tiki Rush',
    iconUrl: getImage('tiki-rush').url,
    iconHint: getImage('tiki-rush').hint,
    description: 'Dash through tropical jungles to escape a volcano.',
    tags: ['Action', 'Endless Runner', 'Adventure'],
    downloadUrl: '#'
  },
  {
    id: '6',
    name: 'Candy Cascade',
    iconUrl: getImage('candy-cascade').url,
    iconHint: getImage('candy-cascade').hint,
    description: 'Match colorful candies in this sweet puzzle game.',
    tags: ['Puzzle', 'Match-3', 'Casual'],
    downloadUrl: '#'
  },
  {
    id: '7',
    name: 'Dragon Watch',
    iconUrl: getImage('dragon-watch').url,
    iconHint: getImage('dragon-watch').hint,
    description: 'Raise and train powerful dragons for battle.',
    tags: ['RPG', 'Fantasy', 'Simulation'],
    downloadUrl: '#'
  },
  {
    id: '8',
    name: 'Nitro Racers',
    iconUrl: getImage('nitro-racers').url,
    iconHint: getImage('nitro-racers').hint,
    description: 'High-speed street racing with customizable cars.',
    tags: ['Racing', 'Action', 'Sports'],
    downloadUrl: '#'
  },
  {
    id: '9',
    name: 'Quest for Gems',
    iconUrl: getImage('quest-for-gems').url,
    iconHint: getImage('quest-for-gems').hint,
    description: 'A classic platformer adventure to find lost jewels.',
    tags: ['Platformer', 'Adventure', 'Family'],
    downloadUrl: '#'
  },
  {
    id: '10',
    name: 'Arena of Heroes',
    iconUrl: getImage('arena-of-heroes').url,
    iconHint: getImage('arena-of-heroes').hint,
    description: 'Compete in 5v5 battles in a fantasy arena.',
    tags: ['MOBA', 'Strategy', 'Multiplayer'],
    downloadUrl: '#'
  },
  {
    id: '11',
    name: 'Zombie Escape',
    iconUrl: getImage('zombie-escape').url,
    iconHint: getImage('zombie-escape').hint,
    description: 'Survive the horde and find a cure.',
    tags: ['Survival', 'Horror', 'Action'],
    downloadUrl: '#'
  },
  {
    id: '12',
    name: 'Farm Frenzy',
    iconUrl: getImage('farm-frenzy').url,
    iconHint: getImage('farm-frenzy').hint,
    description: 'Build your dream farm and grow your crops.',
    tags: ['Simulation', 'Casual', 'Family'],
    downloadUrl: '#'
  },
  {
    id: '13',
    name: 'Pirate Plunder',
    iconUrl: getImage('pirate-plunder').url,
    iconHint: getImage('pirate-plunder').hint,
    description: 'Sail the seven seas in search of treasure.',
    tags: ['Adventure', 'Strategy', 'Pirates'],
    downloadUrl: '#'
  },
  {
    id: '14',
    name: 'Galaxy Defenders',
    iconUrl: getImage('galaxy-defenders').url,
    iconHint: getImage('galaxy-defenders').hint,
    description: 'Protect the cosmos from alien invaders.',
    tags: ['Shooter', 'Sci-Fi', 'Arcade'],
    downloadUrl: '#'
  },
  {
    id: '15',
    name: 'Wild West Showdown',
    iconUrl: getImage('wild-west-showdown').url,
    iconHint: getImage('wild-west-showdown').hint,
    description: 'Become the most famous gunslinger in the west.',
    tags: ['Action', 'Shooter', 'Western'],
    downloadUrl: '#'
  },
  {
    id: '16',
    name: 'Sushi Slice',
    iconUrl: getImage('sushi-slice').url,
    iconHint: getImage('sushi-slice').hint,
    description: 'Slice and dice ingredients to make delicious sushi.',
    tags: ['Arcade', 'Casual', 'Cooking'],
    downloadUrl: '#'
  },
  {
    id: '17',
    name: 'Kingdom Builders',
    iconUrl: getImage('kingdom-builders').url,
    iconHint: getImage('kingdom-builders').hint,
    description: 'Construct a mighty kingdom from the ground up.',
    tags: ['Strategy', 'Simulation', 'City-Builder'],
    downloadUrl: '#'
  },
  {
    id: '18',
    name: 'Robot Rumble',
    iconUrl: getImage('robot-rumble').url,
    iconHint: getImage('robot-rumble').hint,
    description: 'Build your own robot and fight in the arena.',
    tags: ['Fighting', 'Sci-Fi', 'Action'],
    downloadUrl: '#'
  },
  {
    id: '19',
    name: 'Ancient Runes',
    iconUrl: getImage('ancient-runes').url,
    iconHint: getImage('ancient-runes').hint,
    description: 'Uncover the secrets of a lost civilization.',
    tags: ['Puzzle', 'Adventure', 'Mystery'],
    downloadUrl: '#'
  },
  {
    id: '20',
    name: 'Deep Sea Diver',
    iconUrl: getImage('deep-sea-diver').url,
    iconHint: getImage('deep-sea-diver').hint,
    description: 'Explore the ocean depths and discover new species.',
    tags: ['Simulation', 'Exploration', 'Education'],
    downloadUrl: '#'
  }
];

export const getGames = () => games;

export const searchGames = (query: string) => {
    if (!query) return [];
    const lowerCaseQuery = query.toLowerCase();
    return games.filter(game => 
      game.name.toLowerCase().includes(lowerCaseQuery) || 
      game.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
};
