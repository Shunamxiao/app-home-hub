import { PlaceHolderImages } from './placeholder-images';

export type Game = {
  id: string;
  name: string;
  iconUrl: string;
  iconHint: string;
  description: string;
  tags: string[];
  downloadUrl: string;
  rating: number;
  size: string;
  downloads: string;
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
    downloadUrl: '#',
    rating: 4.5,
    size: '128MB',
    downloads: '1M+'
  },
  {
    id: '2',
    name: 'Cyber Sprint',
    iconUrl: getImage('cyber-sprint').url,
    iconHint: getImage('cyber-sprint').hint,
    description: 'Race through a neon-lit city of the future.',
    tags: ['Runner', 'Sci-Fi', 'Action'],
    downloadUrl: '#',
    rating: 4.7,
    size: '256MB',
    downloads: '5M+'
  },
  {
    id: '3',
    name: 'Mystic Grove',
    iconUrl: getImage('mystic-grove').url,
    iconHint: getImage('mystic-grove').hint,
    description: 'Solve puzzles in an enchanted, magical forest.',
    tags: ['Puzzle', 'Fantasy', 'Casual'],
    downloadUrl: '#',
    rating: 4.6,
    size: '98MB',
    downloads: '2M+'
  },
  {
    id: '4',
    name: 'Star Voyager',
    iconUrl: getImage('star-voyager').url,
    iconHint: getImage('star-voyager').hint,
    description: 'Explore unknown galaxies and trade with aliens.',
    tags: ['Strategy', 'Sci-Fi', 'Space'],
    downloadUrl: '#',
    rating: 4.8,
    size: '312MB',
    downloads: '10M+'
  },
  {
    id: '5',
    name: 'Tiki Rush',
    iconUrl: getImage('tiki-rush').url,
    iconHint: getImage('tiki-rush').hint,
    description: 'Dash through tropical jungles to escape a volcano.',
    tags: ['Action', 'Endless Runner', 'Adventure'],
    downloadUrl: '#',
    rating: 4.4,
    size: '155MB',
    downloads: '3M+'
  },
  {
    id: '6',
    name: 'Candy Cascade',
    iconUrl: getImage('candy-cascade').url,
    iconHint: getImage('candy-cascade').hint,
    description: 'Match colorful candies in this sweet puzzle game.',
    tags: ['Puzzle', 'Match-3', 'Casual'],
    downloadUrl: '#',
    rating: 4.9,
    size: '80MB',
    downloads: '20M+'
  },
  {
    id: '7',
    name: 'Dragon Watch',
    iconUrl: getImage('dragon-watch').url,
    iconHint: getImage('dragon-watch').hint,
    description: 'Raise and train powerful dragons for battle.',
    tags: ['RPG', 'Fantasy', 'Simulation'],
    downloadUrl: '#',
    rating: 4.7,
    size: '450MB',
    downloads: '8M+'
  },
  {
    id: '8',
    name: 'Nitro Racers',
    iconUrl: getImage('nitro-racers').url,
    iconHint: getImage('nitro-racers').hint,
    description: 'High-speed street racing with customizable cars.',
    tags: ['Racing', 'Action', 'Sports'],
    downloadUrl: '#',
    rating: 4.6,
    size: '500MB',
    downloads: '12M+'
  },
  {
    id: '9',
    name: 'Quest for Gems',
    iconUrl: getImage('quest-for-gems').url,
    iconHint: getImage('quest-for-gems').hint,
    description: 'A classic platformer adventure to find lost jewels.',
    tags: ['Platformer', 'Adventure', 'Family'],
    downloadUrl: '#',
    rating: 4.3,
    size: '110MB',
    downloads: '1.5M+'
  },
  {
    id: '10',
    name: 'Arena of Heroes',
    iconUrl: getImage('arena-of-heroes').url,
    iconHint: getImage('arena-of-heroes').hint,
    description: 'Compete in 5v5 battles in a fantasy arena.',
    tags: ['MOBA', 'Strategy', 'Multiplayer'],
    downloadUrl: '#',
    rating: 4.8,
    size: '1.2GB',
    downloads: '30M+'
  },
  {
    id: '11',
    name: 'Zombie Escape',
    iconUrl: getImage('zombie-escape').url,
    iconHint: getImage('zombie-escape').hint,
    description: 'Survive the horde and find a cure.',
    tags: ['Survival', 'Horror', 'Action'],
    downloadUrl: '#',
    rating: 4.2,
    size: '300MB',
    downloads: '7M+'
  },
  {
    id: '12',
    name: 'Farm Frenzy',
    iconUrl: getImage('farm-frenzy').url,
    iconHint: getImage('farm-frenzy').hint,
    description: 'Build your dream farm and grow your crops.',
    tags: ['Simulation', 'Casual', 'Family'],
    downloadUrl: '#',
    rating: 4.5,
    size: '150MB',
    downloads: '15M+'
  },
  {
    id: '13',
    name: 'Pirate Plunder',
    iconUrl: getImage('pirate-plunder').url,
    iconHint: getImage('pirate-plunder').hint,
    description: 'Sail the seven seas in search of treasure.',
    tags: ['Adventure', 'Strategy', 'Pirates'],
    downloadUrl: '#',
    rating: 4.6,
    size: '280MB',
    downloads: '6M+'
  },
  {
    id: '14',
    name: 'Galaxy Defenders',
    iconUrl: getImage('galaxy-defenders').url,
    iconHint: getImage('galaxy-defenders').hint,
    description: 'Protect the cosmos from alien invaders.',
    tags: ['Shooter', 'Sci-Fi', 'Arcade'],
    downloadUrl: '#',
    rating: 4.7,
    size: '180MB',
    downloads: '9M+'
  },
  {
    id: '15',
    name: 'Wild West Showdown',
    iconUrl: getImage('wild-west-showdown').url,
    iconHint: getImage('wild-west-showdown').hint,
    description: 'Become the most famous gunslinger in the west.',
    tags: ['Action', 'Shooter', 'Western'],
    downloadUrl: '#',
    rating: 4.4,
    size: '320MB',
    downloads: '4M+'
  },
  {
    id: '16',
    name: 'Sushi Slice',
    iconUrl: getImage('sushi-slice').url,
    iconHint: getImage('sushi-slice').hint,
    description: 'Slice and dice ingredients to make delicious sushi.',
    tags: ['Arcade', 'Casual', 'Cooking'],
    downloadUrl: '#',
    rating: 4.5,
    size: '95MB',
    downloads: '5.5M+'
  },
  {
    id: '17',
    name: 'Kingdom Builders',
    iconUrl: getImage('kingdom-builders').url,
    iconHint: getImage('kingdom-builders').hint,
    description: 'Construct a mighty kingdom from the ground up.',
    tags: ['Strategy', 'Simulation', 'City-Builder'],
    downloadUrl: '#',
    rating: 4.8,
    size: '600MB',
    downloads: '11M+'
  },
  {
    id: '18',
    name: 'Robot Rumble',
    iconUrl: getImage('robot-rumble').url,
    iconHint: getImage('robot-rumble').hint,
    description: 'Build your own robot and fight in the arena.',
    tags: ['Fighting', 'Sci-Fi', 'Action'],
    downloadUrl: '#',
    rating: 4.3,
    size: '400MB',
    downloads: '3.5M+'
  },
  {
    id: '19',
    name: 'Ancient Runes',
    iconUrl: getImage('ancient-runes').url,
    iconHint: getImage('ancient-runes').hint,
    description: 'Uncover the secrets of a lost civilization.',
    tags: ['Puzzle', 'Adventure', 'Mystery'],
    downloadUrl: '#',
    rating: 4.6,
    size: '140MB',
    downloads: '2.5M+'
  },
  {
    id: '20',
    name: 'Deep Sea Diver',
    iconUrl: getImage('deep-sea-diver').url,
    iconHint: getImage('deep-sea-diver').hint,
    description: 'Explore the ocean depths and discover new species.',
    tags: ['Simulation', 'Exploration', 'Education'],
    downloadUrl: '#',
    rating: 4.5,
    size: '210MB',
    downloads: '1.8M+'
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
