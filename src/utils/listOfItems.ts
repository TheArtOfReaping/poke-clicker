import { Types } from "./Types";
import { Route } from "./listOfRoutes";
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
    'Max Potion'
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

export type CatchRateFunction = ({type, routes}:{type:Types; routes?: Route[]}) => number;
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
}

export const listOfItems: Item[] = [
  {
    folder: 'ball',
    img: 'poke',
    name: 'Poké Ball',
    quantity: 0,
    catchRate: 1,
    price: 200,
    description: `The most basic ball. Base catch rate: 1`,
  },
  {
    folder: 'ball',
    img: 'great',
    name: 'Great Ball',
    quantity: 0,
    catchRate: 2,
    price: 1000,
    description: `A second-tier ball. Base catch rate: 2`,
  },
  {
    folder: 'ball',
    img: 'ultra',
    name: 'Ultra Ball',
    quantity: 0,
    catchRate: 3,
    price: 2000,
    description: `An advanced ball. Base catch rate: 3`,
  },
  {
    folder: 'medicine',
    img: 'potion',
    name: 'Potion',
    quantity: 0,
    price: 100,
    heal: 20,
    description: `Heals 20 dmg.`
  },
  {
    folder: 'medicine',
    img: 'super-potion',
    name: 'Super Potion',
    quantity: 0,
    price: 500,
    heal: 50,
    description: `Heals 50 dmg.`
  },
  {
    folder: 'medicine',
    img: 'max-potion',
    name: 'Max Potion',
    quantity: 0,
    price: 3000,
    heal: 300,
    description: `Heals 300 dmg in auto-mode and 100% in manual mode.`,
  },
  {
    folder: 'medicine',
    img: 'rare-candy',
    name: 'Rare Candy',
    quantity: 0,
    price: 4800,
    description: `Raises a Pokémon's level by 1.`,
  },
  {
    folder: 'ball',
    img: 'dive',
    name: 'Dive Ball',
    quantity: 0,
    price: 800,
    description: `A type of ball that works best on aquatic Pok${accentedE}mon.`,
    catchRate: ({type}) => {
        if (type === Types.Water) {
            return 3.5;
        }
        return 1;
    }
  },
  {
    folder: 'medicine',
    img: 'hyper-potion',
    name: 'Hyper Potion',
    quantity: 0,
    price: 1500,
    description: `A medicine that heals 120 dmg.`,
    heal: 120,
  },
  {
    folder: 'tm',
    img: 'fighting',
    name: 'Close Combat',
    quantity: 0,
    number: 39,
  },
  {
    folder: 'tm',
    img: 'steel',
    name: 'Iron Head',
    quantity: 0,
    number: 17,
  },
  {
    folder: 'mega-stone',
    img: 'abomasite',
    name: 'Abomasite',
    quantity: 0,
  },
  {
    folder: 'partner-gift',
    img: 'small-bouquet',
    name: 'Small Bouquet',
    quantity: 0,
    new: true,
  },
  {
    folder: 'berry',
    img: 'liechi',
    name: 'Liechi Berry',
    quantity: 0,
  },
  {
    folder: 'fossil',
    name: 'Helix Fossil',
    img: 'helix',
    quantity: 0,
  },
  {
    folder: 'fossil',
    name: 'Dome Fossil',
    img: 'dome',
    quantity: 0,
  }
];
