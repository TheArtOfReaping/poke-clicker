import { USE_MOVE, ADD_POKEMON, SELECT_POKEMON, SELECT_ROUTE, Action } from 'actions';
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
    id: 7,
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
    nickname: 'Charcoals',
    species: 'Charmander',
    level: 1,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    moves: [2],
  },
  {
    id: 382,
    nickname: 'Meanie',
    species: 'Kyogre',
    level: 100,
    currentHp: 1000,
    ability: 'Drizzle',
    shiny: false,
    gender: 'f',
    moves: [2],
  },
]

export function selectedPokemon(state = '', action: any) {
  switch (action.type) {
    case SELECT_POKEMON:
      return action.payload.pokemonId;
    default:
      return;
  }
}

export function selections(state = {selectedRoute: 0}, action: any) {
  switch (action.type) {
    case SELECT_ROUTE:
      return {
        ...state,
        selectedRoute: action.payload.routeId,
      }
    default:
      return state;
  }
}

export function team(state = initialTeamState, action: any) {
  switch (action.type) {
    case ADD_POKEMON:
      return [...state, action.payload.pokemon];
    case 'EDIT_POKEMON':
      return [
        ...state.filter(pk => pk.id !== action.payload.id),
        {
          ...state.find(pk => pk.id === action.payload.id),
          ...action.payload.pokemon,
        }
      ]
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
        room: action.payload.room,
        terrain: action.payload.terrain,
      };
    default:
      return state;
  }
}

export function pokedex(state = {}, action: any) {
  switch (action.type) {
    case 'ADD_SEEN':
      return {
        ...state,
        [action.payload.species]: {seen: action.payload.seen},
      }
    default:
      return state;
  }
}

export const reducers = {
  inventory,
  team,
  field,
  selections,
  pokedex,
};
