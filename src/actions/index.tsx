import { v4 as createId } from 'uuid';


  export type Index = {
    id: string;
    moveId: number;
    actorId: number;
    targetId: number;
    pokemon: Pokemon;
  };
  export type Type = USE_MOVE | ADD_POKEMON;
  export type Payload<P> = { payload: { [K in keyof Index]?: Index[K] } };
  export interface Data<T extends Type> {
    readonly type: T & Type;
    readonly meta?: any;
  }


export type Action<T extends Type, P = unknown> = (
  args: { [K in keyof Index]?: Index[K] }
) => Data<T> & Payload<P>;

export type USE_MOVE = '@battle/USE_MOVE';
export const USE_MOVE: USE_MOVE = '@battle/USE_MOVE';

export const useMove: Action<USE_MOVE, number | string> = ({
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

export const addPokemon: Action<ADD_POKEMON, Pokemon> = ({ pokemon }) => ({
  type: ADD_POKEMON,
  payload: {
    id: createId(),
    pokemon,
  },
});
