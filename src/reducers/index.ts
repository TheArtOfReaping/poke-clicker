import { USE_MOVE, ADD_POKEMON, Action } from 'actions';

export function inventory(state = [], action: any) {
  switch (action.type) {
    case USE_MOVE:
      return state;
    default:
      return state;
  }
}

export function team(state = [], action: any) {
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
