import { Item, Pokedex, StyleItem, Field, Selections, Game } from 'utils';
import { PartyPokemon, Enemy, Trainer } from 'utils';
import { Route } from 'utils/listOfRoutes';

export interface State {
    team: PartyPokemon[];
    field: Field;
    selections: Selections;
    enemy: Enemy;
    trainer: Trainer;
    game: Game;
    map: Route[];
    inventory: Item[];
    pokedex: Pokedex;
    styleItems: StyleItem[];
}

export * from './machine';