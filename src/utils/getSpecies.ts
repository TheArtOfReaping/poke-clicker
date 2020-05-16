//@ts-ignore
import * as Pokedex from 'pokeapi-js-wrapper';
import { Move } from './generateWildPokemonMoves';

export interface DataAbility {}

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

export interface PokemonData {
    abilities: DataAbility[];
    base_experience: number;
    forms: Form[];
    game_indices: any;
    height: number;
    held_items: string[];
    ids: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    species: { name: StatName; url: string };
    sprites: any;
    stats: Stat[];
    types: Type[];
    weight: number;
  }

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: {name: string, url: string}[];
  evolution_chain: {url: string};
  evolves_from_species: any;
  flavor_text_entries: {flavor_text: string}[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: any;
  generation: any;
  growth_rate: {name: string, url: string};
  habitat: {name: string, url: string};
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  name: string;
  names: any;
  order: number;
  pal_park_encounters: any;
  pokedex_numbers: any;
  shape: any;
  varieties: any;
}

export type Pokemon = PokemonData & PokemonSpecies;
  
export const dexEntries: Pokemon[] = [];

export const getSpecies = async (pokeId?: number): Promise<Pokemon | undefined> => {
  if (!pokeId) return undefined;
  try {
    const dex = new Pokedex.Pokedex();
    if (dexEntries[pokeId] != null) {
      return dexEntries[pokeId];
    }
    const species: PokemonData[] = await dex.resource(['api/v2/pokemon/' + pokeId]);
    const moreData: PokemonSpecies[] = await dex.resource([species[0].species.url]);
    dexEntries[pokeId] = { ...species[0], ...moreData[0]};
    return { ...species[0], ...moreData[0]};
  } catch (e) {
    console.error(e);
  }
};
