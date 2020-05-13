import { accentedE } from "./accentedE";

export type ItemName = 'Poké Ball' |
    'Dive Ball' |
    'Ultra Ball' |
    'Hyper Potion' |
    'Close Combat' |
    'Iron Head' |
    'Abomasite' |
    'Small Bouquet' |
    'Liechi Berry' |
    'Potion' |
    'Rare Candy' |
    'Super Potion' |
    'Helix Fossil' |
    'Dome Fossil' |
    'Great Ball' |
    'Moon Stone' |
    'Max Potion' |
    'Old Rod' |
    'Good Rod' |
    'Super Rod' |
    'Shiny Charm' |
    'Amulet Coin' |
    'Oran Berry'  |
    'Sitrus Berry' |
    'Aerial Ace' |
    'Psychic'
;

export type ItemFolder = 'apricorn' |
  'av-candy' |
  'ball' |
  'battle-item' |
  'berry' |
  'body-style' |
  'curry-ingredient' |
  'etc' |
  'ev-item' |
  'evo-item' |
  'exp-candy' |
  'flute' |
  'fossil' | 
  'gem' |
  'hm' |
  'hold-item' |
  'incense' |
  'key-item' |
  'mail' |
  'medicine' |
  'mega-stone' |
  'memory' |
  'mint' |
  'mulch' |
  'other-item' |
  'partner-gift' |
  'petal' |
  'plate' |
  'poke-candy' |
  'roto' |
  'scarf' |
  'shard' |
  'storage' |
  'tm' |
  'tr' |
  'valuable-item' |
  'wonder-launcher' |
  'z-crystals'
;

export type CatchRateFunction = () => number;
export interface Item {
    folder: ItemFolder;
    img: string;
    name: ItemName;
    quantity: number;
    new?: boolean;
    catchRate?: number | CatchRateFunction;
    tmType?: 'TM' | 'HM' | 'TR';
    number?: number;
    price?: number;
    heal?: number;
    description?: string;
    readonly id: number;
}

export const listOfItems: Item[] = [
  {
    folder: 'ball',
    img: 'poke',
    name: 'Poké Ball',
    quantity: 2,
    catchRate: 255,
    price: 200,
    description: `The most basic ball. Base catch rate: 1`,
    id: 0,
  },
  {
    folder: 'ball',
    img: 'great',
    name: 'Great Ball',
    quantity: 0,
    catchRate: 2,
    price: 1000,
    description: `A second-tier ball. Base catch rate: 2`,
    id: 1,
  },
  {
    folder: 'ball',
    img: 'ultra',
    name: 'Ultra Ball',
    quantity: 0,
    catchRate: 3,
    price: 2000,
    description: `An advanced ball. Base catch rate: 3`,
    id: 2,
  },
  {
    folder: 'medicine',
    img: 'potion',
    name: 'Potion',
    quantity: 10,
    price: 100,
    heal: 20,
    description: `Heals 20 dmg.`,
    id: 3,
  },
  {
    folder: 'medicine',
    img: 'super-potion',
    name: 'Super Potion',
    quantity: 0,
    price: 500,
    heal: 50,
    description: `Heals 50 dmg.`,
    id: 4,
  },
  {
    folder: 'medicine',
    img: 'max-potion',
    name: 'Max Potion',
    quantity: 0,
    price: 3000,
    heal: 300,
    description: `Heals 300 dmg in auto-mode and 100% in manual mode.`,
    id: 5,
  },
  {
    folder: 'medicine',
    img: 'rare-candy',
    name: 'Rare Candy',
    quantity: 0,
    price: 4800,
    description: `Raises a Pokémon's level by 1.`,
    id: 6,
  },
  {
    folder: 'ball',
    img: 'dive',
    name: 'Dive Ball',
    quantity: 0,
    price: 800,
    description: `A type of ball that works best on aquatic Pok${accentedE}mon.`,
    catchRate: () => {
        // if (type === Types.Water) {
        //     return 3.5;
        // }
        // return 1;
        return 1;
    },
    id: 7,
  },
  {
    folder: 'medicine',
    img: 'hyper-potion',
    name: 'Hyper Potion',
    quantity: 0,
    price: 1500,
    description: `A medicine that heals 120 dmg.`,
    heal: 120,
    id: 8,
  },
  {
    folder: 'tm',
    img: 'fighting',
    name: 'Close Combat',
    quantity: 0,
    number: 39,
    id: 9,
  },
  {
    folder: 'tm',
    img: 'steel',
    name: 'Iron Head',
    quantity: 0,
    number: 17,
    id: 10,
  },
  {
    folder: 'tr',
    img: 'flying',
    name: 'Aerial Ace',
    quantity: 1,
    number: 41,
    id: 21,
  },
  {
    folder: 'mega-stone',
    img: 'abomasite',
    name: 'Abomasite',
    quantity: 0,
    id: 11,
  },
  {
    folder: 'partner-gift',
    img: 'small-bouquet',
    name: 'Small Bouquet',
    quantity: 0,
    new: true,
    id: 12,
  },
  {
    folder: 'berry',
    img: 'liechi',
    name: 'Liechi Berry',
    quantity: 0,
    id: 13,
  },
  {
    folder: 'fossil',
    name: 'Helix Fossil',
    img: 'helix',
    quantity: 0,
    id: 14,
  },
  {
    folder: 'fossil',
    name: 'Dome Fossil',
    img: 'dome',
    quantity: 0,
    id: 15,
  },
  {
    folder: 'key-item',
    img: 'old-rod',
    name: 'Old Rod',
    quantity: 1,
    price: 0,
    description: 'Allows capture of fish Pokémon',
    id: 16,
  },
  {
    folder: 'key-item',
    img: 'shiny-charm',
    name: 'Shiny Charm',
    quantity: 1,
    price: 0,
    description: 'Increases rate of shiny Pokémon',
    id: 17,
  },
  {
    folder: 'evo-item',
    img: 'moon-stone',
    name: 'Moon Stone',
    quantity: 1,
    price: 3500,
    description: `Evolves certain species of Pokémon`,
    id: 18,
  },
  {
    folder: 'hold-item',
    img: 'amulet-coin',
    name: 'Amulet Coin',
    quantity: 1,
    price: 100000,
    description: `Doubles money from battle.`,
    id: 19,
  },
  {
    folder: 'berry',
    img: 'oran',
    name: 'Oran Berry',
    quantity: 10,
    price: 20,
    heal: 10,
    description: `Heals 10 dmg.`,
    id: 20,
  },
  {
    folder: 'berry',
    img: 'sitrus',
    name: 'Sitrus Berry',
    quantity: 1,
    price: 20,
    heal: 10,
    description: `Heals 30 dmg.`,
    id: 20,
  },
  {
    folder: 'tr',
    img: 'psychic',
    name: 'Psychic',
    quantity: 0,
    number: 29,
    id: 21,
  },
];

const listOfItemNames = listOfItems.map(item => item.name);