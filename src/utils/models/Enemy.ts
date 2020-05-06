import { SpeciesName } from "utils/SpeciesName";
import { Nature } from "utils/Nature";

export interface Enemy {
    level: number;
    currentHp: number;
    maxHp?: number;
  
    dyanamax?: boolean;
    gender?: 'm' | 'f';
    shiny?: boolean;
    superShiny?: boolean;
    superShinySeed?: number;
    species: SpeciesName;
    moves?: number[];
    isWild?: boolean;
    nature?: Nature;
  }