import { store } from "store";

export enum GameMode {
    DamagingEnemy = 'enemyDamaged',
    DamagingUser = 'userDamaged',
    FaintingEnemy = 'enemyFainted',
    FaintingUser = 'userFainted',
    AwardingItems = 'awardingItems',
    WipingOut = 'wipingOut',
    UsingDialog = 'usingDialog',
    SelectingStarter = 'selectingStarter',
    SelectedStarter = 'selectedStarter',
    EncounteringWildPokemon = 'encounteringWildPokemon',
}

export interface GameState {
    mode: GameMode;
    duration: number;
    cancellable?: boolean;
}

export interface GameScheduler<T> {
    items: T[];
    current: number;
    timer?: NodeJS.Timeout;
}

export class GameScheduler<T extends GameState> implements GameScheduler<T> {
    constructor(items: T[]) {
        this.items = items;
        this.current = -1;
        this.timer = undefined;
    }
    next() {
        return this.items[this.current + 1];
    }
    getStateData() {
        return this.items[this.current];
    }
    render() {
        const state = this.getStateData();
        this.timer = setTimeout(() => {
            if (state.mode === GameMode.SelectingStarter) {
                // listen for starter selection
                if (store.getState().team.length != 0) {

                }
            }
            if (state.mode === GameMode.DamagingEnemy) {

            }
        }, state.duration)
    }
    cancel() {
        this.timer && clearTimeout(this.timer);
    }
    enqueue(item: T) {
        this.current++;
        this.items[this.current] = item;
    }
    isEmpty() {
        return this.items.length === 0;
    }

}

const game = new GameScheduler([
    {
        mode: GameMode.SelectingStarter,
        duration: Infinity,
        cancellable: false,
    }
])


const staterino = {
    initial: {
        [GameMode.SelectingStarter]: {
            condition: store.getState().team.length === 0,
            resolve: GameMode.SelectedStarter,
            reject: GameMode.SelectingStarter,
        },
    },
    [GameMode.SelectedStarter]: {
        resolve: GameMode.EncounteringWildPokemon,
    },
    [GameMode.EncounteringWildPokemon]: {
        resolve: GameMode.DamagingEnemy,
    }

}