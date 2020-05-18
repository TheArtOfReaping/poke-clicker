import { Types } from 'utils';
import { v4 as createId } from 'uuid';

export interface Move {
    id: string | number;
    name: string;
    type: Types;
    basePower: number;
    coolDown: number;
}

export const createMove = (data: Partial<Move>) => ({id: createId(), name: '', type: Types.Normal, basePower: 50, coolDown: 30});

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
    {
        id: createId(),
        name: 'Bite',
        type: Types.Dark,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Bubble',
        type: Types.Water,
        basePower: 20,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Water Gun',
        type: Types.Water,
        basePower: 20,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Tail Whip',
        type: Types.Normal,
        basePower: 20,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Scratch',
        type: Types.Normal,
        basePower: 20,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Protect',
        type: Types.Normal,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Leech Seed',
        type: Types.Grass,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Synthesis',
        type: Types.Grass,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Worry Seed',
        type: Types.Grass,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Growth',
        type: Types.Normal,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Double Edge',
        type: Types.Normal,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Growl',
        type: Types.Normal,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Flamethrower',
        type: Types.Fire,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Fire Fang',
        type: Types.Fire,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Flame Burst',
        type: Types.Fire,
        basePower: 60,
        coolDown: 120,
    },
    {
        id: createId(),
        name: 'Rage',
        type: Types.Normal,
        basePower: 60,
        coolDown: 120,
    },
];