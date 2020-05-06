import { USE_MOVE, ADD_POKEMON, SELECT_POKEMON, SELECT_ROUTE, Action, EDIT_POKEMON, EDIT_ENEMY, OPEN_DIALOG, CREATE_NEW_ENEMY, Enemy, AWARD_MONEY, EDIT_TRAINER, EDIT_GAME } from 'actions';
import { PartyPokemon } from 'App';
import { expRequiredForumla } from 'utils';
import { Nature } from 'utils/Nature';
import { Trainer } from 'components';

export function inventory(state = [], action: any) {
  switch (action.type) {
    case USE_MOVE:
      return state;
    default:
      return state;
  }
}


export const initialTeamState: PartyPokemon[] = [
  // {
  //   id: 382,
  //   nickname: 'Meanie',
  //   species: 'Kyogre',
  //   level: 1000,
  //   currentHp: 341,
  //   ability: 'Drizzle',
  //   position: 5,
  //   shiny: false,
  //   gender: 'f',
  //   moves: [2],
  //   expRequired: expRequiredForumla(100, 'Medium Slow')
  // },
  {
    id: 1,
    position: 0,
    species: 'Bulbasaur',
    nickname: 'Bulby',
    level: 5,
    gender: 'm',
    currentHp: 21,
    currentExp: 0,
    shiny: true,
    favorite: true,
    ability: 'Overgrow',
    moves: [1, 2, 3, 4],
    expRequired: expRequiredForumla(5, 'Medium Slow'),
    moveRanks: [
      {moveId: 1, rank: 3},
      {moveId: 2, rank: 5},
      {moveId: 3, rank: 1},
      {moveId: 4, rank: 2},
    ],
    avs: [
      {stat: 'hp', value: 10},
      {stat: 'attack', value: 10},
      {stat: 'defense', value: 100},
      {stat: 'special-attack', value: 0},
      {stat: 'special-defense', value: 1000},
      {stat: 'speed', value: 2}
    ],
    item: 'Rare Candy',
    otName: 'Devin',
    otId: '65091',
    nature: Nature.Bashful,

    markings: [{mark: 'Circle', level: 1}],
    metData: {
      locationId: 1,
      dateMet: Date.now(),
      metLevel: 5,
    },
    hasPokerus: true,
    pokeball: 'Ultra Ball',
    friendship: 255,
  },
  // {
  //   id: 6,
  //   nickname: 'Fargo',
  //   species: 'Charizard',
  //   level: 1,
  //   position: 1,
  //   currentHp: 12,
  //   shiny: true,
  //   gender: 'f',
  //   ability: 'Blaze',
  //   moves: [6, 7, 8, 9],
  //   expRequired: expRequiredForumla(1, 'Medium Slow')
  // },
  // {
  //   id: 16,
  //   nickname: 'Birdo',
  //   species: 'Pidgey',
  //   level: 11,
  //   position: 2,
  //   currentHp: 0,
  //   shiny: false,
  //   gender: 'f',
  //   moves: [2, 5],
  //   expRequired: expRequiredForumla(11, 'Medium Slow')
  // },
  // {
  //   id: 7,
  //   nickname: 'Squirt',
  //   species: 'Squirtle',
  //   shiny: true,
  //   superShiny: true,
  //   superShinySeed: 133,
  //   level: 5,
  //   position: 3,
  //   currentHp: 20,
  //   gender: 'm',
  //   moves: [2],
  //   expRequired: expRequiredForumla(5, 'Medium Slow')
  // },
  // {
  //   id: 4,
  //   nickname: 'Charcoals',
  //   species: 'Charmander',
  //   level: 1,
  //   position: 4,
  //   currentHp: 12,
  //   shiny: false,
  //   gender: 'f',
  //   moves: [2],
  //   expRequired: expRequiredForumla(1, 'Medium Slow')
  // },
  // {
  //   id: 297,
  //   nickname: 'Fatso',
  //   species: 'Hariyama',
  //   level: 45,
  //   currentHp: 200,
  //   ability: 'Thick Fat',
  //   position: 6,
  //   shiny: true,
  //   superShiny: true,
  //   superShinySeed: 100,
  //   gender: 'm',
  //   moves: [2],
  //   expRequired: expRequiredForumla(45, 'Medium Slow')
  // }
]

const initialEnemyState: Enemy = {
  level: 2,
  currentHp: 20,
  maxHp: 20,
  shiny: false,
  gender: 'm',
  species: 'Pidgey',
};

// export function selectedPokemon(state = '', action: any) {
//   switch (action.type) {
//     case SELECT_POKEMON:
//       return action.payload.pokemonId;
//     default:
//       return;
//   }
// }

export function selections(state = {selectedRoute: 0, selectedPokemon: 0, selectedDialog: 0}, action: any) {
  switch (action.type) {
    case SELECT_ROUTE:
      return {
        ...state,
        selectedRoute: action.payload.routeId,
      }
    case SELECT_POKEMON:
      console.log('state + pokemonId', state, action.payload.pokemonId);
      return {
        ...state,
        selectedPokemon: action.payload.pokemonId,
      };
    case OPEN_DIALOG:
      return {
        ...state,
        selectedDialog: action.payload.selectedDialog
      };
    default:
      return state;
  }
}

export function team(state = initialTeamState, action: any) {
  switch (action.type) {
    case ADD_POKEMON:
      return [...state, action.payload.pokemon].sort((a, b) => a.position - b.position);
    case EDIT_POKEMON:
      // console.log([
      //   ...state.filter((pk, idx) => idx !== action.payload.id),
      //   {
      //     ...state.find((pk, idx) => idx === action.payload.id),
      //     ...action.payload.pokemon,
      //   }
      // ]);
      return [
        ...state.filter((pk, idx) => idx !== action.payload.id),
        {
          ...state.find((pk, idx) => idx === action.payload.id),
          ...action.payload.pokemon,
        }
      ].sort((a, b) => a.position - b.position)
    default:
      return state;
  }
}

export function enemy(state = initialEnemyState, action: any) {
  switch (action.type) {
    case CREATE_NEW_ENEMY:
      return action.payload.enemy;
    case EDIT_ENEMY:
      return {...state, ...action.payload.enemy};
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

export function game(state = {healing: 0}, action: any) {
  switch (action.type) {
    case EDIT_GAME:
      return {
        ...state,
        ...action.payload.game,
      }
    default:
      return state;
  }
}

export function trainer(state: Trainer = {}, action: any) {
  switch (action.type) {
    case AWARD_MONEY:
      return {
        ...state,
        money: (state.money || 0) + action.payload.money,
      }
    case EDIT_TRAINER:
      return {
        ...state,
        ...action.payload.trainer,
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
  enemy,
  trainer,
  game,
};
