import { listOfItems } from "./listOfItems";

export enum Region {
  Kanto = 'Kanto',
}

export interface Route {
    id: number;
    name: string;
    accessible: boolean;
    visible: boolean;
    connections: number[];
    pokemon: {species: string; minLevel: number; maxLevel: number}[];
    defeatNumber?: number;
    region?: Region;
}

export const listOfRoutes = [
  {
    id: 0,
    name: 'Route 1',
    accessible: true,
    visible: true,
    connections: [0],
    pokemon: [
      { species: 'Pidgey', minLevel: 2, maxLevel: 4 },
      { species: 'Rattata', minLevel: 2, maxLevel: 4 },
    ],
    defeatNumber: 2,
    region: Region.Kanto,
    itemDrops: [
        {
            weight: 2,
            item: listOfItems.find(item => item.name === 'Poké Ball'),
        },
        {
            weight: 0.1,
            item: listOfItems.find(item => item.name === 'Rare Candy'),
        },
        {
            weight: 1,
            item: listOfItems.find(item => item.name === 'Potion'),
        },
        {
            weight: 0.5,
            item: listOfItems.find(item => item.name === 'Super Potion'),
        }
    ]
  },
  {
    id: 1,
    name: 'Viridian City',
    accessible: true,
    visible: true,
    connections: [0, 2, 3],
  },
  {
    id: 2,
    name: 'Route 22',
    accessible: true,
    visible: true,
    connections: [1],
  },
  {
    id: 3,
    name: 'Route 2',
    accessible: true,
    visible: true,
    connections: [1, 4],
  },
  {
    id: 4,
    name: 'Viridian Forest',
    accessible: true,
    visible: true,
    connections: [5],
  },
  {
    id: 5,
    name: 'Pewter City',
    accessible: true,
    visible: true,
    connections: [4, 6],
  },
  { id: 6, name: 'Route 3', accessible: false, visible: true, connections: [] },
  { id: 7, name: 'Mt. Moon', accessible: false, visible: true },
  { id: 8, name: 'Route 4', accessible: false, visible: true },
  { id: 9, name: 'Cerulean City', accessible: false, visible: true },
];
