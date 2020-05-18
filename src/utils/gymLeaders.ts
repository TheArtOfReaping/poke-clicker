import { SpeciesName } from './SpeciesName';


export interface GymLeader {
    name: string;
    img?: string;
    pokemon: {
        species: SpeciesName;
        level: number;
        maxHp: number;
        moves?: number[];
    }[];
}

export const gymLeaders: GymLeader[] = [
    {
        name: 'Brock',
        img: '',
        pokemon: [
            {
                species: 'Geodude',
                level: 12,
                maxHp: 2000,
                moves: [1]
            },
            {
                species: 'Onix',
                level: 12,
                maxHp: 3000,
                moves: [1],
            }
        ]
    }
];