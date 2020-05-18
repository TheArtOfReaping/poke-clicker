import { SpeciesName } from 'utils/SpeciesName';

export type Pokedex = {
    [S in SpeciesName]?: {seen: boolean; caught: boolean};
  }