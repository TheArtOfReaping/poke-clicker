//@ts-ignore
import * as Pokedex from 'pokeapi-js-wrapper';

export interface Ability {}

export interface Form {}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

interface Type {
  slot: number;
  type: { name: string; url: string };
}

export type StatName = 'hp' | 'attack' | 'defense' | 'special-defense' | 'special-attack' | 'speed';

export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    forms: Form[];
    game_indices: any;
    height: number;
    held_items: string[];
    ids: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    species: { name: StatName; url: string };
    sprites: any;
    stats: Stat[];
    types: Type[];
    weight: number;
  }
  
export const dexEntries: Pokemon[] = [];

export const getSpecies = async (pokeId?: number): Promise<Pokemon | undefined> => {
  if (!pokeId) return undefined;
  try {
    const dex = new Pokedex.Pokedex();
    if (dexEntries[pokeId] != null) {
      return dexEntries[pokeId];
    }
    const species: Pokemon[] = await dex.resource(['api/v2/pokemon/' + pokeId]);
    dexEntries[pokeId] = species[0];
    return species[0];
  } catch (e) {
    console.error(e);
  }
};
