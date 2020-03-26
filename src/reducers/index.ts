import { USE_MOVE, ADD_POKEMON, Action } from 'actions';
import { PartyPokemon } from 'App';

export function inventory(state = [], action: any) {
  switch (action.type) {
    case USE_MOVE:
      return state;
    default:
      return state;
  }
}


export const initialTeamState: PartyPokemon[] = [
  {
    id: 1,
    species: 'Bulbasaur',
    nickname: 'Bulby',
    level: 5,
    gender: 'm',
    currentHp: 21,
    shiny: false,
    ability: 'Overgrow',
    moves: [1, 2, 3, 4],
  },
  {
    id: 6,
    nickname: 'Fargo',
    species: 'Charizard',
    level: 37,
    currentHp: 21,
    shiny: true,
    gender: 'f',
    ability: 'Blaze',
    item: 'Charcoal',
    moves: [6, 7, 8, 9],
  },
  {
    id: 16,
    nickname: 'Birdo',
    species: 'Pidgey',
    level: 11,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    moves: [2, 5],
  },
  {
    id: 1,
    nickname: 'Squirt',
    species: 'Squirtle',
    level: 22,
    currentHp: 21,
    shiny: false,
    gender: 'm',
    moves: [2],
  },
  {
    id: 1,
    nickname: 'Bulby',
    species: 'Bulbasaur',
    level: 1,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    moves: [2],
  },
  {
    id: 1,
    nickname: 'Egg',
    species: 'Chansey',
    level: 30,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    moves: [2],
  },
]

export function team(state = initialTeamState, action: any) {
  switch (action.type) {
    case ADD_POKEMON:
      return [state, action.payload.pokemon];
    default:
      return state;
  }
}

export function field(state = {}, action: any) {
  switch (action.type) {
    case 'SET_WEATHER':
      return {
        ...state,
        weather: action.payload.weather,
      };
    default:
      return state;
  }
}

export const reducers = {
  inventory,
  team,
  field,
};
