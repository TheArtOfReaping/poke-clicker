import { v4 as createId } from 'uuid';
import { ItemName } from 'utils';
import { PartyPokemon, Enemy } from 'utils';
import { omit } from 'ramda';
import { Trainer } from 'components';
import { Route } from 'utils/listOfRoutes';

export interface Field {
  weather: string;
  room: string;
  terrain: string;
  hazards: string;
}

export interface Game {
  healing: number;

}


export interface Selections {
  selectedRoute: number;
  selectedPokemon: number;
  selectedDialog: number;
}

export interface State {
  team: PartyPokemon[];
  field: Field;
  selections: Selections;
  enemy: Enemy;
  trainer: Trainer;
  game: Game;
  map: Route[];
}

export type RELEASE_POKEMON = '@team/RELEASE_POKEMON';
export const RELEASE_POKEMON: RELEASE_POKEMON = '@team/RELEASE_POKEMON';

export type CREATE_NEW_ENEMY = '@enemy/CREATE_NEW_ENEMY';
export const CREATE_NEW_ENEMY: CREATE_NEW_ENEMY = '@enemy/CREATE_NEW_ENEMY';

export type EDIT_ENEMY = '@enemy/EDIT_ENEMY';
export const EDIT_ENEMY: EDIT_ENEMY = '@enemy/EDIT_ENEMY';

export type OPEN_DIALOG = '@selections/OPEN_DIALOG';
export const OPEN_DIALOG: OPEN_DIALOG = '@selections/OPEN_DIALOG';

export type AWARD_MONEY = '@trainer/AWARD_MONEY';
export const AWARD_MONEY: AWARD_MONEY = '@trainer/AWARD_MONEY';

export type EDIT_TRAINER = '@trainer/EDIT_TRAINER';
export const EDIT_TRAINER: EDIT_TRAINER = '@trainer/EDIT_TRAINER';

export type EDIT_GAME = '@game/EDIT_GAME';
export const EDIT_GAME: EDIT_GAME = '@game/EDIT_GAME';

export type EDIT_ROUTE = '@map/EDIT_ROUTE';
export const EDIT_ROUTE: EDIT_ROUTE = '@map/EDIT_ROUTE';

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
export type Type = USE_MOVE | ADD_POKEMON | ADD_ITEM | SELECT_POKEMON | EDIT_POKEMON | EDIT_ENEMY | CREATE_NEW_ENEMY | OPEN_DIALOG | AWARD_MONEY |
  EDIT_TRAINER | EDIT_GAME | SELECT_ROUTE | EDIT_ROUTE;
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

export const addPokemon: Action<ADD_POKEMON, Partial<PartyPokemon>> = (pokemon) => ({
  type: ADD_POKEMON,
  payload: {
    pokemon: {
      ...pokemon,
      id: createId(),
    },
  },
});



export const editEnemy: Action<EDIT_ENEMY, Partial<Enemy>> = (enemy) => ({
  type: EDIT_ENEMY,
  payload: {
    id: createId(),
    enemy,
  },
});

export const createNewEnemy: Action<CREATE_NEW_ENEMY, Partial<Enemy>> = (enemy) => ({
  type: CREATE_NEW_ENEMY,
  payload: {
    id: createId(),
    enemy,
  },
});


export type EDIT_POKEMON = '@team/EDIT_POKEMON';
export const EDIT_POKEMON: EDIT_POKEMON = '@team/EDIT_POKEMON';

export const editPokemon: Action<EDIT_POKEMON, Partial<PartyPokemon>> = (pokemon) => ({
  type: EDIT_POKEMON,
  payload: {
    //id: createId(),
    id: pokemon.id,
    pokemon: omit(['id'], pokemon),
  },
});

export const editRoute: Action<EDIT_ROUTE, Partial<Route>> = (route) => ({
  type: EDIT_ROUTE,
  payload: {
    //id: createId(),
    id: route.id,
    route: omit(['id'], route),
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

export type SelectPokemonArgs = {pokemonId: number};
export type SELECT_POKEMON = '@team/SELECT_POKEMON';
export const SELECT_POKEMON: SELECT_POKEMON = '@team/SELECT_POKEMON';

export const selectPokemon: Action<SELECT_POKEMON, SelectPokemonArgs> = ({pokemonId}) => ({
  type: SELECT_POKEMON,
  payload: {
    id: createId(),
    pokemonId,
  }
});

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
export type SELECT_ROUTE = '@selections/SELECT_ROUTE';
export const SELECT_ROUTE: SELECT_ROUTE = '@selections/SELECT_ROUTE';

export const selectRoute: Action<SELECT_ROUTE, SelectRouteArgs> = ({routeId}) => ({
  type: SELECT_ROUTE,
  payload: {
    id: createId(),
    routeId,
  }
});


export const openDialog: Action<OPEN_DIALOG, {selectedDialog: number}> = ({selectedDialog}) => ({
  type: OPEN_DIALOG,
  payload: {
    id: createId(),
    selectedDialog,
  }
})

export const awardMoney: Action<AWARD_MONEY, Trainer> = ({money}) => ({
  type: AWARD_MONEY,
  payload: {
    id: createId(),
    money,
  }
})

export const editTrainer: Action<EDIT_TRAINER, Trainer> = (trainer) => ({
  type: EDIT_TRAINER,
  payload: {
    id: createId(),
    trainer,
  }
})

export const editGame: Action<EDIT_GAME, Game> = (game) => ({
  type: EDIT_GAME,
  payload: {
    id: createId(),
    game,
  }
})