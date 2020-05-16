import React from 'react';
import {Panel, BattleStage} from 'components';
import { useSelector } from 'react-redux';
import { State } from 'state';
import { positionalSort, speciesToNumber, calculateHP } from 'utils';
import { take } from 'ramda';
import { getStat } from 'components/Party';
import { DialogManager } from './DialogManager';

export interface MainProps {
    username?: string;

}
export function Main({
    username,
}: MainProps) {
    const enemy = useSelector<State, State['enemy']>(state => state.enemy);
    const team = useSelector<State, State['team']>(state => state.team.sort(positionalSort));
    const pokeId = useSelector<State, number>(state => state.selections.selectedPokemon);
    const useableTeam = take(6, team);
    const isWipedOut = useableTeam.reduce((prev, curr) => prev + curr.currentHp, 0) === 0 && !!useableTeam.length;
    
    const pokemon = team[pokeId];
    const speciesId = speciesToNumber(pokemon?.species);
    const maxHp = speciesId ? calculateHP(pokemon.level, getStat(speciesId, 'hp')) : 0;

    const moveTimes = [1,1,1,1];

    return <>
        <Panel name='Main' toolbarItems={[]}>
            <BattleStage
                username={username}
                maxHp={maxHp}
                enemy={enemy}
                wipedOut={isWipedOut}
                pokemon={pokemon} isFainted={enemy?.currentHp === 0} moveTimes={moveTimes}
            />
            <DialogManager />
        </Panel>
    </>
}