import React from 'react';
import {useMachine} from '@xstate/react';
import {GameMode, coreMachine} from 'state';
import { Button } from 'components/Button';
import { Input } from 'antd';
import { useInput } from 'rooks';
import { StarterSelection } from './StarterSelection';
import { SpeciesName } from 'utils/SpeciesName';
import {style} from 'typestyle';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, addSeen, createNewEnemy } from 'actions';
import { createPokemon } from 'utils/createPokemon';
import { Sprite } from 'components/Shared';
import { accentedE } from 'utils/accentedE';
import { Card } from 'components/Card';
import { Dialogue } from 'components/Shared/Dialogue';
import { determineShiny, speciesToNumber, choose, calculateHP, determineAbility } from 'utils';
import { listOfNatures } from 'utils/Nature';
import { State } from 'state';
import { getStat } from 'components/Party';

const button = style({width: '10rem', marginTop: '2rem', justifyContent: 'center'});

export const starterMode = (gm: GameMode) => gm === GameMode.SelectingStarter || gm === GameMode.SelectedStarter;

export function ProfessorOakBlurb() {
    return <Dialogue text={[
        `Welcome to the world of Pok${accentedE}mon! I\'m Professor Oak. (Click on this card to continue reading.)`,
        `This is an idle Pok${accentedE}mon game with an emphasis on resource management.`,
        `I hope you can enjoy this game as much as I did creating it!`,
        `I've left one of three starter Pok${accentedE}mon here for you to choose.`,
        `Good luck!`
    ]} character='Oak' />;
}

export function StarterSelector() {
    const dispatch = useDispatch();
    const [state, send] = useMachine(coreMachine);
    const map = useSelector<State, State['map']>(state => state.map);
    const selectedRoute = useSelector<State, State['selections']['selectedRoute']>(state => state.selections.selectedRoute);
    const {starter} = state.context;
    const nickname = useInput('');

    console.log(state);

    const onClick = (e?: any) => {
        send('START_ENCOUNTER');
        starter && dispatch(addPokemon(createPokemon({
            id: '000',
            position: 0,
            species: starter,
            nickname: nickname.value ? nickname.value : starter,
            level: 5,
            currentHp: 20,
            nature: choose(listOfNatures),
            ability: determineAbility(starter),
        })));

        const routeEnemy = choose(map[selectedRoute]?.pokemon);
        const generateNewEnemy = () => {
          const getMaxHp = (id?: number, level?: number) => id && level ? calculateHP(level, getStat(id, 'hp')) : 0;
          dispatch(createNewEnemy({
            level: routeEnemy.maxLevel,
            maxHp: getMaxHp(speciesToNumber(routeEnemy.species), routeEnemy.maxLevel),
            currentHp: getMaxHp(speciesToNumber(routeEnemy.species), routeEnemy.maxLevel),
            species: routeEnemy.species,
            isWild: true,
            gender: choose(['m', 'f']),
            nature: choose(listOfNatures),
            ...determineShiny(),
          }));
          dispatch(addSeen({
            species: routeEnemy.species,
            seen: true,
          }));
        }
        generateNewEnemy();
    }

    return starterMode(state.value as GameMode) ?
        <div style={{height: '460px'}}>
            <ProfessorOakBlurb />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {[
              'Bulbasaur',
              'Charmander',
              'Squirtle',
            ].map(species => <StarterSelection selected={starter === species} onClick={e=>send('STARTER_SELECTION', {selection: species})} species={species as SpeciesName} />)}
          </div>
          {starter && <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <span style={{fontSize: '120%', marginBottom: '0.5rem', marginTop: '1rem'}}>Would you like to nickname your {starter}? You can always change it later.</span>
            <Input style={{width: '15rem'}} addonBefore={'Nickname'} {...nickname} />
            <Button className={button} onClick={onClick} value='Go!' />
          </div>}
          <br/>
        </div> : null;
}