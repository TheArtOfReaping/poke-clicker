import { createMachine, interpret, Machine } from 'xstate';

export enum GameMode {
    DamagingEnemy = 'enemyBeingDamaged',
    DamagingUser = 'userBeingDamaged',
    DamagedUser = 'userDamaged',
    DamagedEnemy = 'enemyDamaged',
    FaintingEnemy = 'enemyFainted',
    FaintingUser = 'userFainted',
    AwardingItems = 'awardingItems',
    WipingOut = 'wipingOut',
    UsingDialog = 'usingDialog',
    SelectingStarter = 'selectingStarter',
    SelectedStarter = 'selectedStarter',
    EncounteringWildPokemon = 'encounteringWildPokemon',
}

export enum MachineType {
    Core = 'core',
    Battle = 'battle',
}

export const battleMachine = createMachine({
    id: MachineType.Battle,
    initial: GameMode.EncounteringWildPokemon,
    states: {
        [GameMode.EncounteringWildPokemon]: {
            on: {
                DAMAGE_ENEMY: GameMode.DamagedEnemy,
            }
        },
        // [GameMode.DamagingEnemy]: {
        //     on: {
        //         [GameMode.DamagedEnemy]: GameMode.DamagingUser,
        //     }
        // },
        // [GameMode.DamagingUser]: {
        //     on: {
        //         [GameMode.DamagedUser]: GameMode.DamagingEnemy,
        //     }
        // }
    }
});

export interface CoreStateSchema {
    states: {
        [GameMode.SelectingStarter]: {},
        [GameMode.SelectedStarter]: {
            states: {
                [GameMode.EncounteringWildPokemon]: {
                    states: {
                        [GameMode.DamagingEnemy]: {}
                    }
                }
            }
        },
        [GameMode.EncounteringWildPokemon]: {},
        [GameMode.DamagingEnemy]: {}
    }
}

export type CoreStateEvent =
    | { type: 'STARTER_SELECTION' }
    | { type: 'START_ENCOUNTER' }
    | { type: 'BATTLE' }
;

export interface CoreStateContext {

}

export const coreMachine = Machine<CoreStateContext, CoreStateSchema, CoreStateEvent>({
    id: MachineType.Core,
    initial: GameMode.SelectingStarter,
    states: {
        [GameMode.SelectingStarter]: {
            on: {
                STARTER_SELECTION: GameMode.SelectedStarter,
            },
        },
        [GameMode.SelectedStarter]: {
            on: {
                START_ENCOUNTER: GameMode.EncounteringWildPokemon,
            },
            //...battleMachine,
        },
        [GameMode.EncounteringWildPokemon]: {
            on: {
                BATTLE: GameMode.DamagingEnemy,
            }
        },
        [GameMode.DamagingEnemy]: {}
        
    }
});


export const coreService = interpret(coreMachine)
    .onTransition(state => console.log(state.value))
    .start();
