import React, { useEffect, useState } from 'react';
import './App.css';
import { calculateBaseDPS, Types, expRequiredForumla, generateRewards, moves, getSpecies, choose, listOfPokemon, colors, getContrastColor, speciesToNumber, StatName, calculateHP, determineShiny } from 'utils';
import {
  Move,
  ExpBar,
  Inventory,
  Panel,
  Map,
  Pokedex as PokedexPanel,
  AchivementsPanel,
  OptionsPanel,
  TrainerPanel,
  ItemIcon,
  BattleStage,
} from 'components';
import { HPBar } from './components/HPBar';
//@ts-ignore
import { expFormula } from './utils/expFormula';
import { Party, getStat } from './components/Party';
import clamp from 'ramda/src/clamp';
import { listOfRoutes } from 'utils/listOfRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { Enemy, editPokemon, createNewEnemy, editEnemy, addPokemon, selectRoute } from 'actions';
import { style, media } from 'typestyle';
import { State } from 'actions';
import { SpeciesName } from 'utils/SpeciesName';
import { Nature } from 'utils/Nature';
// @ts-ignore
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import { max, take, tail } from 'ramda';
import { positionalSort } from 'utils/positionalSort';
import { useSpeciesFetch } from 'utils/useSpeciesFetch';
import * as queries from 'graphql/queries';

Amplify.configure(awsconfig);

Amplify.configure({
  API: {
    graphql_endpoint: 'http://localhost:3000/graphql',
  }
});

async function fetchy() {
  const allDailyDeals = await API.graphql(graphqlOperation(queries.listDailyDeals));
  console.log('DD', allDailyDeals);
}

fetchy();

const Base = style({
    border: '1px solid #222',
    //background: 'rgba(0, 0, 0, 0.2)',
    //boxShadow: '0 0 4px rba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    marginTop: '0',
    display: 'flex',
    flexWrap: 'wrap',},
    media({minWidth: 0, maxWidth: 720}, {flexDirection: 'column'})
);

export const AppStyle = style({
  backgroundColor: colors.primary.get(),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: getContrastColor(colors.primary.get()),
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
  textAlign: 'center',
});

export type MarkType = 'Circle' | 'Triangle' | 'Square' | 'Heart' | 'Star' | 'Diamond';
export type Mark = {mark: MarkType, level: number};
export type Ribbon = {ribbon?: string; dateRecieved?: number};

export interface PartyPokemon {
  id: number;
  position?: number;
  species: SpeciesName;
  nickname: string;
  level: number;
  gender?: string;
  favorite?: boolean;
  
  shiny?: boolean;
  superShiny?: boolean;
  superShinySeed?: number;
  moves?: number[];
  moveRanks?: {
    moveId: number;
    rank: number;
  }[];
  ivs?: {stat: StatName; value: number}[];
  evs?: {stat: StatName; value: number}[];
  avs?: {stat: StatName; value: number}[];
  statBoosts?: {stat: StatName; value: number}[];
  ability?: string;
  item?: string;
  otName?: string;
  otId?: string;
  nature?: Nature;

  currentExp?: number;
  expRequired?: number;
  currentHp: number;

  markings?: Mark[];
  forme?: any;

  metData?: {
    locationId?: number;
    isFatefulEncounter?: boolean;
    dateMet?: number;
    dateEggRecieved?: number;
  };

  hasPokerus?: boolean;
  pokeball?: string;
  isEgg?: boolean;

  ribbons?: Ribbon[];
  friendship?: number;



}

const game = {
  totalCaptures: 0,
  totalKills: 0,
  totalFaints: 0,
  totalWhiteouts: 0,
};

export const generateNewEnemy = () => {
  return choose(listOfPokemon);
}

const shouldCatch = () => true;

const getMove = (id?: number) => id == null ? {coolDown: 0} : moves.find(m => m.id === id);

function App(props: any) {
  const dispatch = useDispatch();
  
  const enemy = useSelector<State, Enemy>(state => state.enemy);
  const team = useSelector<State, PartyPokemon[]>(state => state.team.sort(positionalSort));
  const selectedRoute = useSelector<State, number>(state => state.selections.selectedRoute);
  
  const [pokeId, setpokeId] = useState(0);
  const pokemon = team[pokeId];

  const coolDown = (id: number) => getMove(pokemon?.moves?.[id])?.coolDown || 0;

  
  const [moveTimes, setMoveTimes] = useState(
    [coolDown(0), coolDown(1), coolDown(2), coolDown(3)]
  );
  
  
  const enemyHp = enemy.currentHp;
  const enemySpecies: SpeciesName = enemy.species;


  const species = getSpecies(speciesToNumber(pokemon.species)).then((res) => res);
  const [_, loading] = useSpeciesFetch(pokeId);

  const enemyId = speciesToNumber(enemySpecies);
  const enemySpeciesData = getSpecies(enemyId).then(res => res);
  const enemyMaxHp = enemyId ? calculateHP(enemy.level, getStat(enemyId, 'hp')) : enemyHp;
  const useableTeam = take(6, team);
  const isWipedOut = useableTeam.reduce((prev, curr) => prev + curr.currentHp, 0) === 0;

  
  const speciesId = speciesToNumber(pokemon.species);
  const maxHp = speciesId ? calculateHP(pokemon.level, getStat(speciesId, 'hp')) : 0;
  const getMaxHp = (id?: number, level?: number) => id && level ? calculateHP(level, getStat(id, 'hp')) : 0;
  const getBaseDPS = (speciesId?: number, level?: number) => speciesId && level ? calculateBaseDPS(
    level,
    getStat(
      speciesId,
      'special-attack'
    ),
    getStat(
      speciesId,
      'attack'
    )
  ) : 0;
  
  console.log('team', team, '\n', 'useable team', useableTeam);


  const routeEnemy = choose(listOfRoutes[selectedRoute]?.pokemon);
  const generateNewEnemy = () => dispatch(createNewEnemy({
    level: routeEnemy.maxLevel,
    maxHp: getMaxHp(speciesToNumber(routeEnemy.species), routeEnemy.maxLevel),
    currentHp: getMaxHp(speciesToNumber(routeEnemy.species), routeEnemy.maxLevel),
    species: routeEnemy.species,
    isWild: true,
    gender: choose(['m', 'f']),
    ...determineShiny(),
  }));

  console.log(pokeId);

  useEffect(() => {
    console.log(species, loading);
    const timer = setTimeout(() => {
      if (!isWipedOut && !loading && !species) {
        if (!Number.isNaN(enemyHp) && !Number.isNaN(getBaseDPS(speciesId, pokemon.level))) {
          dispatch(editEnemy({
            currentHp: (clamp(0, enemyMaxHp || 21, enemyHp - clamp(1, Infinity, getBaseDPS(speciesId, pokemon.level))))
          }))
        }

        setMoveTimes([
          clamp(0, coolDown(0), moveTimes[0] - 1),
          clamp(0, coolDown(1), moveTimes[1] - 1),
          clamp(0, coolDown(2), moveTimes[2] - 1),
          clamp(0, coolDown(3), moveTimes[3] - 1),
        ])

        if (enemyHp === 0) {
          generateRewards({
            speciesLevel: enemy.level,
            pokemonLevel: pokemon.level,
            routeItems: listOfRoutes[selectedRoute].itemDrops
          });
          if (shouldCatch()) {
            const caught = Math.random() > 0.5;
            


            if (caught) {
              generateNewEnemy();
              dispatch(addPokemon({
                ...enemy,
                position: 10,
                nickname: enemy.species,
                metData: {
                  locationId: selectedRoute,
                  isFatefulEncounter: false,
                  dateMet: Date.now(),
                },
              }))
            }
          } else {
            dispatch(
              editPokemon({
                id: pokeId,
                friendship: (pokemon?.friendship || 0) + 0.25,
                currentExp: (pokemon?.currentExp || 0) + 
                  expFormula({
                    isWild: enemy.isWild,
                    baseExp: 50,
                    foeLevel: enemy.level,
                    level: pokemon.level,
                  })
              })
            );
            generateNewEnemy();
            
          }
        } else {
          console.log(maxHp);
          const currentHp = Math.floor(clamp(0, maxHp, team[pokeId].currentHp - getBaseDPS(enemyId, enemy.level)));
          console.log(currentHp); 
          

          if (currentHp === 0) {
            const teamMemberWithHp = useableTeam.find(pk => pk.currentHp !== 0);
            console.log(teamMemberWithHp, teamMemberWithHp && team.indexOf(teamMemberWithHp))
            if (teamMemberWithHp) {
              setpokeId(team.indexOf(teamMemberWithHp))
            } else {
              // everyone fainted lol
            }
          } else {
            
          }
          
          dispatch(editPokemon({id: pokeId, currentHp}))
        }

        if ((pokemon?.currentExp || -1) >= (pokemon?.expRequired || 0)) {
          dispatch(editPokemon({
            id: pokeId,
            level: pokemon.level + 1,
            currentExp: 0,
            expRequired: expRequiredForumla(pokemon.level + 1, 'Medium Slow')
          }));
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [
    pokeId,
    team,
    enemy,
  ]);

  if (species == null) {
    return null;
  }

  const p = {
    trainer: true,
    party: true,
    inventory: true,
    battle: true,
    map: true,
    pokedex: true,
    achievements: true,
  }


  return (
    <div className={AppStyle}>
      <header className="App-header">
        <div
          className={Base}
        >

            <div style={{height: '100%', width: '20%', display: 'flex', flexWrap: 'wrap'}}>
              <TrainerPanel username={props.authData.username} panelProps={{height: '20%', visible: p.trainer}} />
              <Party party={useableTeam} panelProps={{height: '40%', visible: p.party}} />
              <Inventory panelProps={{height: '38%', visible: p.inventory}} />
            </div>

            <div style={{width: '41%', margin: '0 0.25rem', }}>
              <Panel name='Battle'>
                <BattleStage
                  username={props.authData.username}
                  maxHp={maxHp}
                  enemy={enemy}
                  wipedOut={isWipedOut}
                pokemon={pokemon} isFainted={enemyHp === 0} moveTimes={moveTimes} />
              </Panel>
              <div style={{display: 'flex'}}>
                <OptionsPanel />
                <Panel name='Console'>
                </Panel>
              </div>
            </div>

            <div style={{height: '100%', width: '20%', display: 'flex', flexWrap: 'wrap'}}>
              <Map panelProps={{height: '40%', visible: p.map}} />
              
            </div>
            <div style={{height: '100%', width: '18%', display: 'flex', flexDirection: 'column'}}>
              <Panel name='Wiki'>

              </Panel>
              <Panel name='Stats'>

              </Panel>
              <PokedexPanel panelProps={{height: '30%', visible: p.pokedex}} />
              <AchivementsPanel panelProps={{height: '28%', visible: p.achievements}} />
            </div>
        </div>
      </header>
    </div>
  );
}

export default withAuthenticator(App, false);
