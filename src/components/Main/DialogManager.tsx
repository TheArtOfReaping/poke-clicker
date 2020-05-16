import React from 'react';
import { DialogKind } from 'components/Dialog';
import { State } from 'state';
import { useSelector } from 'react-redux';
import { PokemonStorage, Pokemart } from 'components/BattleStage';
import { TrainerCustomization } from 'components/Trainer/TrainerCustomization';

export interface DialogManagerProps {
    
}

export function DialogManager({}: DialogManagerProps) {
    const id = useSelector<State, number>(state => state.selections.selectedDialog);

    return <>
        {id === DialogKind.Storage && <PokemonStorage />}
        {id === DialogKind.Pokemart && <Pokemart />}
        {id === DialogKind.TrainerCustomization && <TrainerCustomization />}
    </>
}