import { SpeciesName } from "./SpeciesName";


export interface GymLeader {
    name: string;
    img?: string;
    pokemon: {
        species: SpeciesName;
        level: number;
        maxHP: number;
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
                maxHP: 2000,
                moves: [1]
            }
        ]
    }
]