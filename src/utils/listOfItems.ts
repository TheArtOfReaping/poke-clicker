import { Types } from "./Types";
import { Route } from "./listOfRoutes";

export type ItemName = 'Poké Ball' |
    'Dive Ball' |
    'Hyper Potion' |
    'Close Combat' |
    'Iron Head' |
    'Abomasite' |
    'Small Bouquet' |
    'Liechi Berry' |
    'Potion' |
    'Rare Candy' |
    'Super Potion'
;


export type CatchRateFunction = ({type, routes}:{type:Types; routes?: Route[]}) => number;
export interface Item {
    folder: string;
    img: string;
    name: ItemName;
    quantity: number;
    new?: boolean;
    catchRate?: number | CatchRateFunction;
    tmType?: 'TM' | 'HM' | 'TR';
    number?: number;
}

export const listOfItems: Item[] = [
  {
    folder: 'ball',
    img: 'poke',
    name: 'Poké Ball',
    quantity: 35,
    catchRate: 1,

  },
  {
    folder: 'medicine',
    img: 'potion',
    name: 'Potion',
    quantity: 10,
  },
  {
    folder: 'medicine',
    img: 'super-potion',
    name: 'Super Potion',
    quantity: 1,
  },
  {
    folder: 'medicine',
    img: 'rare-candy',
    name: 'Rare Candy',
    quantity: 1,
  },
  {
    folder: 'ball',
    img: 'dive',
    name: 'Dive Ball',
    quantity: 2,
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
    quantity: 12,
  },
  {
    folder: 'tm',
    img: 'fighting',
    name: 'Close Combat',
    quantity: 1,
    number: 39,
  },
  {
    folder: 'tm',
    img: 'steel',
    name: 'Iron Head',
    quantity: 2,
    number: 17,
  },
  {
    folder: 'mega-stone',
    img: 'abomasite',
    name: 'Abomasite',
    quantity: 1,
  },
  {
    folder: 'partner-gift',
    img: 'small-bouquet',
    name: 'Small Bouquet',
    quantity: 1,
    new: true,
  },
  {
    folder: 'berry',
    img: 'liechi',
    name: 'Liechi Berry',
    quantity: 3,
  },
];
