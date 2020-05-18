import { ItemName } from 'utils/listOfItems';
import { StatName } from 'utils/getSpecies';
import { Nature } from 'utils/Nature';
import { SpeciesName } from 'utils/SpeciesName';


export type MarkType = 'Circle' | 'Triangle' | 'Square' | 'Heart' | 'Star' | 'Diamond';
export type Mark = {mark: MarkType; level: 0 | 1 | 2};
export type Ribbon = {ribbon?: string; dateRecieved?: number};

export interface PartyPokemon {
  id: number | string;
  position: number;
  species: SpeciesName;
  nickname: string;
  level: number;
  currentHp: number;

  gender?: string;
  favorite?: boolean;
  
  shiny?: boolean;
  superShiny?: boolean;
  superShinySeed?: number;
  moves?: {
    move: string;
    rank: number;
  }[];
  ivs?: {stat: StatName; value: number}[];
  evs?: {stat: StatName; value: number}[];
  avs?: {stat: StatName; value: number}[];
  statBoosts?: {stat: StatName; value: number}[];
  ability?: string;
  item?: ItemName;
  otName?: string;
  otId?: string;
  nature?: Nature;

  currentExp?: number;
  expRequired?: number;

  markings?: Mark[];
  forme?: any;

  metData?: {
    locationId?: number;
    isFatefulEncounter?: boolean;
    dateMet?: number;
    dateEggRecieved?: number;
    metLevel?: number;
  };

  hasPokerus?: boolean;
  pokeball?: ItemName;
  isEgg?: boolean;

  ribbons?: Ribbon[];
  friendship?: number;
}