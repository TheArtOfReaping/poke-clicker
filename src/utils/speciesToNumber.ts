import { listOfPokemon } from './listOfPokemon';
import { SpeciesName } from './SpeciesName';

export function speciesToNumber(s?: SpeciesName): number | undefined {
    if (s == null) return;
    return listOfPokemon.indexOf(s) + 1;
}