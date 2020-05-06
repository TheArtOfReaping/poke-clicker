import { Types } from 'utils';

export interface Move {
    id: number;
    name: string;
    type: Types;
    basePower: number;
    coolDown: number;
  }

export const moves: Move[] = [
    {
      id: 1,
      name: 'Vine Whip',
      type: Types.Grass,
      basePower: 60,
      coolDown: 30,
    },
    {
      id: 2,
      name: 'Tackle',
      type: Types.Normal,
      basePower: 50,
      coolDown: 10,
    },
    {
      id: 3,
      name: 'Sludge Bomb',
      type: Types.Poison,
      basePower: 90,
      coolDown: 120,
    },
    {
      id: 4,
      name: 'Weather Ball',
      type: Types.Normal,
      basePower: 100,
      coolDown: 300,
    },
    {
      id: 5,
      name: 'Gust',
      type: Types.Flying,
      basePower: 50,
      coolDown: 25,
    },
    {
      id: 6,
      name: 'Fire Blast',
      type: Types.Fire,
      basePower: 120,
      coolDown: 240,
    },
    {
      id: 7,
      name: 'Dragon Rage',
      type: Types.Dragon,
      basePower: 40,
      coolDown: 40,
    },
    {
      id: 8,
      name: 'Slash',
      type: Types.Normal,
      basePower: 70,
      coolDown: 40,
    },
    {
      id: 9,
      name: 'Air Slash',
      type: Types.Flying,
      basePower: 60,
      coolDown: 120,
    },
  ];