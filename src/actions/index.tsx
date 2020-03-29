import { v4 as createId } from 'uuid';
import { ItemName } from 'utils';
import { PartyPokemon } from 'App';

export interface Field {
  weather: string;
  room: string;
  terrain: string;
  hazards: string;
}

export interface Enemy {
  id: number;
  level: number;
  currentHp: number;
  maxHp: number;

  gender?: 'm' | 'f';
  shiny?: boolean;
  species: string;
  moves?: number[];
  isWild?: number;
}

export interface Selections {
  selectedRoute: number;
}

export interface State {
  team: PartyPokemon[];
  field: Field;
  selections: Selections; 
}


  export type Index = {
    id: string;
    moveId: number;
    actorId: number;
    targetId: number;
    pokemon: Pokemon;
    itemName: ItemName;
    quantity: number;
    pokemonId: string;
    field: State['field'];
  };
  export type Type = USE_MOVE | ADD_POKEMON | ADD_ITEM | SELECT_POKEMON;
  export type Payload<P> = { payload: { [K in keyof P]?: P[K] } };
  export interface Data<T extends Type> {
    readonly type: T & Type;
    readonly meta?: any;
  }


export type Action<T extends Type, P = unknown> = (
  args: { [K in keyof P]?: P[K] }
) => Data<T> & Payload<P>;

export type USE_MOVE = '@battle/USE_MOVE';
export const USE_MOVE: USE_MOVE = '@battle/USE_MOVE';

export const useMove: Action<USE_MOVE, {moveId:number, actorId: number, targetId: number}> = ({
  moveId,
  actorId,
  targetId,
}) => ({
  type: USE_MOVE,
  payload: {
    id: createId(),
    moveId,
    actorId,
    targetId,
  },
});

interface Pokemon {
  id: number;
  nickname: string;
  level: number;
  gender: string;
  currentHp: number;
  shiny: boolean;
  marks?: string[];
}

export type ADD_POKEMON = '@team/ADD_POKEMON';
export const ADD_POKEMON: ADD_POKEMON = '@team/ADD_POKEMON';

export const addPokemon: Action<ADD_POKEMON, Partial<Pokemon>> = (pokemon) => ({
  type: ADD_POKEMON,
  payload: {
    //id: createId(),
    pokemon,
  },
});

export type ADD_ITEM = '@inventory/ADD_ITEM';
export const ADD_ITEM: ADD_ITEM = '@inventory/ADD_ITEM';

export type AddItemArgs = {itemName: ItemName, quantity: number};
export const addItem: Action<ADD_ITEM, AddItemArgs> = ({itemName, quantity}) => ({
  type: ADD_ITEM,
  payload: {
    id: createId(),
    itemName,
    quantity,
  }
})

export type SelectPokemonArgs = {pokemonId: string};
export type SELECT_POKEMON = '@team/SELECT_POKEMON';
export const SELECT_POKEMON: SELECT_POKEMON = '@team/SELECT_POKEMON';

export const selectPokemon: Action<SELECT_POKEMON, SelectPokemonArgs> = ({pokemonId}) => ({
  type: SELECT_POKEMON,
  payload: {
    id: createId(),
    pokemonId,
  }
})

export type SET_FIELD = '@field/SET_FIELD';
export const SET_FIELD: SET_FIELD = '@field/SET_FIELD';

export const setField: Action<ADD_POKEMON, Partial<Field>> = (field) => ({
  type: ADD_POKEMON,
  payload: {
    id: createId(),
    field,
  },
});

export type SelectRouteArgs = {routeId: number};
export type SELECT_ROUTE = '@team/SELECT_POKEMON';
export const SELECT_ROUTE: SELECT_POKEMON = '@team/SELECT_POKEMON';

export const selectRoute: Action<SELECT_ROUTE, SelectRouteArgs> = ({routeId}) => ({
  type: SELECT_ROUTE,
  payload: {
    id: createId(),
    routeId,
  }
})
