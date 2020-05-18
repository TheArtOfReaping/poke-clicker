import { listOfItems, ItemName, Item } from './listOfItems';
import { SpeciesName } from './SpeciesName';

export enum Region {
  Kanto = 'Kanto',
}

export type RoutePokemon = {species: SpeciesName; minLevel: number; maxLevel: number; rate: number};

export interface Route {
    id: number;
    name: string;
    accessible: boolean;
    visible: boolean;
    background?: string;
    connections: number[];
    pokemon: RoutePokemon[];
    fishingPokemon?: (RoutePokemon & {method: ItemName})[];
    itemDrops?: {weight: number; item?: Item}[];
    defeatNumber?: number;
    region?: Region;
    currentNumberDefeated?: number;
}

export const getItem = (itemName: ItemName, loi: Item[] = listOfItems) => loi.find(item => item.name === itemName);

export const listOfRoutes: Route[] = [
    {
        id: 0,
        name: 'Route 1',
        accessible: true,
        visible: true,
        background: 'route',
        connections: [1],
        pokemon: [
            { species: 'Pidgey', minLevel: 2, maxLevel: 4, rate: 0.5 },
            { species: 'Rattata', minLevel: 2, maxLevel: 4, rate: 0.5 },
        ],
        defeatNumber: 10,
        currentNumberDefeated: 0,
        region: Region.Kanto,
        itemDrops: [
            {
                weight: 2,
                item: getItem('Poké Ball'),
            },
            {
                weight: 0.01,
                item: getItem('Rare Candy'),
            },
            {
                weight: 1,
                item: getItem('Potion'),
            },
            {
                weight: 0.05,
                item: getItem('Super Potion'),
            },
            {
                weight: 1,
                item: getItem('Oran Berry'),
            }
        ],
    },
    {
        id: 1,
        name: 'Viridian City',
        accessible: false,
        visible: true,
        background: 'town',
        defeatNumber: 5,
        currentNumberDefeated: 0,
        connections: [3, 2, 0],
        pokemon: [
            { species: 'Pidgey', minLevel: 2, maxLevel: 4, rate: 0.5 },
            { species: 'Rattata', minLevel: 2, maxLevel: 4, rate: 0.5 },
        ],
        fishingPokemon: [
            { species: 'Magikarp', minLevel: 5, maxLevel: 5, rate: 1, method: 'Old Rod'},
        ]
    },
    {
        id: 2,
        name: 'Route 22',
        accessible: false,
        visible: true,
        background: 'route',
        defeatNumber: 5,
        currentNumberDefeated: 0,
        connections: [1],
        pokemon: [
            { species: 'Rattata', minLevel: 3, maxLevel: 5, rate: 0.3 },
            { species: 'Spearow', minLevel: 3, maxLevel: 5, rate: 0.2 },
            { species: 'Nidoran♀', minLevel: 3, maxLevel: 5, rate: 0.1 },
            { species: 'Nidoran♂', minLevel: 3, maxLevel: 5, rate: 0.1 },
            { species: 'Mankey', minLevel: 3, maxLevel: 5, rate: 0.3 },
        ],
        itemDrops: [
            {
                weight: 2,
                item: getItem('Poké Ball')
            },
            {
                weight: 1,
                item: getItem('Potion'),
            },
            {
                weight: 0.5,
                item: getItem('Super Potion')
            },
            {
                weight: 0.01,
                item: getItem('Rare Candy')
            }
        ]
    },
    {
        id: 3,
        name: 'Route 2',
        accessible: false,
        visible: true,
        connections: [4, 1],
        defeatNumber: 10,
        currentNumberDefeated: 0,
        pokemon: [
            {
                species: 'Caterpie',
                minLevel: 3,
                maxLevel: 5,
                rate: 0.15,
            },
            {
                species: 'Weedle',
                minLevel: 3,
                maxLevel: 5,
                rate: 0.15,
            },
            {
                species: 'Pidgey',
                minLevel: 3,
                maxLevel: 5,
                rate: 0.3,
            },
            {
                species: 'Rattata',
                minLevel: 3,
                maxLevel: 5,
                rate: 0.4
            }
        ]
    },
    {
        id: 4,
        name: 'Viridian Forest',
        accessible: false,
        visible: true,
        connections: [5],
        defeatNumber: 10,
        currentNumberDefeated: 0,
        pokemon: [
            {
                species: 'Caterpie',
                minLevel: 3,
                maxLevel: 6,
                rate: 0.4,
            },
            {
                species: 'Metapod',
                minLevel: 3,
                maxLevel: 6,
                rate: 0.075,
            },
            {
                species: 'Weedle',
                minLevel: 3,
                maxLevel: 6,
                rate: 0.4
            },
            {
                species: 'Kakuna',
                minLevel: 3,
                maxLevel: 6,
                rate: 0.075,
            },
            {
                species: 'Pikachu',
                minLevel: 3,
                maxLevel: 6,
                rate: 0.05,
            },
            {
                species: 'Bulbasaur',
                minLevel: 3,
                maxLevel: 6,
                rate: 0.001,
            }
        ],
    },
    {
        id: 5,
        name: 'Pewter City',
        accessible: false,
        visible: true,
        connections: [6, 5],
        defeatNumber: 5,
        currentNumberDefeated: 0,
        pokemon: [
            { species: 'Pidgey', minLevel: 2, maxLevel: 4, rate: 0.5 },
            { species: 'Rattata', minLevel: 2, maxLevel: 4, rate: 0.5 },
        ],
    },
    { id: 6, name: 'Route 3', accessible: false, visible: true, connections: [7, 5],
        pokemon: [
            { species: 'Pidgey', minLevel: 2, maxLevel: 4, rate: 0.5 },
            { species: 'Rattata', minLevel: 2, maxLevel: 4, rate: 0.5 },
        ],
    },
    { id: 7, name: 'Mt. Moon', accessible: false, visible: true,
        connections: [8],
        defeatNumber: 5,
        currentNumberDefeated: 0,
        pokemon: [
            { species: 'Clefairy', minLevel: 10, maxLevel: 14, rate: 0.01 },
            { species: 'Geodude', minLevel: 10, maxLevel: 14, rate: 0.19 },
            { species: 'Zubat', minLevel: 10, maxLevel: 14, rate: 0.5 },
            { species: 'Paras', minLevel: 10, maxLevel: 14, rate: 0.2 },
        ],
        region: Region.Kanto,
        itemDrops: [
            {
                weight: 2,
                item: listOfItems.find(item => item.name === 'Poké Ball'),
            },
            {
                weight: 0.01,
                item: listOfItems.find(item => item.name === 'Rare Candy'),
            },
            {
                weight: 1,
                item: listOfItems.find(item => item.name === 'Potion'),
            },
            {
                weight: 0.5,
                item: listOfItems.find(item => item.name === 'Super Potion'),
            },
            {
                weight: 0.5,
                item: getItem('Great Ball')
            },
            {
                weight: 0.05,
                item: getItem('Moon Stone'),
            },
            {
                weight: 0.01,
                item: listOfItems.find(item => item.name === 'Dome Fossil'),
            },
            {
                weight: 0.01,
                item: listOfItems.find(item => item.name === 'Helix Fossil'),
            }
        ] },
    { id: 8, name: 'Route 4', accessible: false, visible: true, pokemon: [
        { species: 'Pidgey', minLevel: 2, maxLevel: 4, rate: 0.5 },
        { species: 'Rattata', minLevel: 2, maxLevel: 4, rate: 0.5 },
    ], connections: [], defeatNumber: 5,
    currentNumberDefeated: 0, },
    { id: 9, name: 'Cerulean City', accessible: false, visible: true, pokemon: [
        { species: 'Pidgey', minLevel: 2, maxLevel: 4, rate: 0.5 },
        { species: 'Rattata', minLevel: 2, maxLevel: 4, rate: 0.5 },
    ], connections: [], defeatNumber: 5,
    currentNumberDefeated: 0, },
    {
        id: 10,
        name: 'Route 5',
        accessible: false,
        visible: true,
        defeatNumber: 5,
        currentNumberDefeated: 0,
        pokemon: [
            { species: 'Pidgey', minLevel: 2, maxLevel: 4, rate: 0.5 },
            { species: 'Rattata', minLevel: 2, maxLevel: 4, rate: 0.5 },
        ],
        connections: [

        ]
    }
];
