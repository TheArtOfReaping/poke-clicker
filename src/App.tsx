import React, { useEffect, useState } from 'react';
import './App.css';
import { calculateBaseDPS, Types, expRequiredForumla, generateRewards, moves, getSpecies, choose, moneyFormula, listOfPokemon, colors, getContrastColor, speciesToNumber, StatName, calculateHP, determineShiny, ItemName, expFormula, Pokemon, determineDamage, calculateBaseDFS } from 'utils';
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
import { Party, getStat } from './components/Party';
import clamp from 'ramda/src/clamp';
import { listOfRoutes } from 'utils/listOfRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { Enemy, editPokemon, createNewEnemy, editEnemy, addPokemon, selectRoute, awardMoney, editGame, Game, selectPokemon } from 'actions';
import { style, media } from 'typestyle';
import { State } from 'actions';
import { SpeciesName } from 'utils/SpeciesName';
import { Nature } from 'utils/Nature';
// @ts-ignore
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import { max, take, tail, last } from 'ramda';
import { positionalSort } from 'utils/positionalSort';
import { useSpeciesFetch } from 'utils/useSpeciesFetch';
import { SpeciesProvider } from 'components/SpeciesProvider';

Amplify.configure(awsconfig);


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
export type Mark = {mark: MarkType, level: 0 | 1 | 2};
export type Ribbon = {ribbon?: string; dateRecieved?: number};

export interface PartyPokemon {
  id: number | string;
  position: number;
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
  item?: ItemName;
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
    metLevel?: number;
  };

  hasPokerus?: boolean;
  pokeball?: ItemName;
  isEgg?: boolean;

  ribbons?: Ribbon[];
  friendship?: number;
}

// const game = {
//   totalCaptures: 0,
//   totalKills: 0,
//   totalFaints: 0,
//   totalWhiteouts: 0,
// };

const p = {
  trainer: true,
  party: true,
  inventory: true,
  battle: true,
  map: true,
  pokedex: true,
  achievements: true,
}

const shouldCatch = () => true;

const getMove = (id?: number) => id == null ? {coolDown: 0} : moves.find(m => m.id === id);

function App(props: any) {
  const dispatch = useDispatch();
  
  const enemy = useSelector<State, Enemy>(state => state.enemy);
  const game = useSelector<State, Game>(state => state.game);
  const team = useSelector<State, PartyPokemon[]>(state => state.team.sort(positionalSort));
  const routePrep = useSelector<State, number>(state => state.selections.selectedRoute);
  const selectedRoute = routePrep == null ? 0 : routePrep;
  console.log(useSelector<State, State['selections']>(state => state.selections).selectedRoute);
  const selectedDialog = useSelector<State, number>(state => state.selections.selectedDialog);
  
  const pokeId = useSelector<State, number>(state => state.selections.selectedPokemon);
  console.log(pokeId);
  const [enemySpeciesData, setEnemySpeciesData] = useState<Pokemon | undefined>();
  const pokemon = team[pokeId];

  const coolDown = (id: number) => getMove(pokemon?.moves?.[id])?.coolDown || 0;

  
  const [moveTimes, setMoveTimes] = useState(
    [coolDown(0), coolDown(1), coolDown(2), coolDown(3)]
  );
  

  
  const enemyHp = enemy.currentHp;
  const enemySpecies: SpeciesName = enemy.species;


  const species = getSpecies(speciesToNumber(pokemon.species)).then((res) => res);

  const enemyId = speciesToNumber(enemySpecies);
  getSpecies(enemyId).then(res => setEnemySpeciesData(res));
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
    ),
    getStat(
      speciesId,
      'speed',
    )
  ) : 0;
  const getBaseDFS = (speciesId?: number, level?: number) => speciesId && level ? calculateBaseDFS(
    level,
    getStat(
      speciesId,
      'special-defense'
    ),
    getStat(
      speciesId,
      'defense'
    ),
  ) : 0;
  


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


  useEffect(() => {
    const timer = setTimeout(() => {
      const totalHealth = useableTeam.reduce((prev, curr) => {
        return prev + calculateHP(curr.level, getStat(speciesToNumber(curr.species) || 0, 'hp'));
      }, 0);
      const healing = game.healing + 1;
      dispatch(editGame({healing}))
      if (healing >= totalHealth) {
        useableTeam.forEach((pokemon, id) => {
          const {species, level} = pokemon;
          console.log(getMaxHp(speciesToNumber(species)));
          dispatch(editPokemon({
            id,
            currentHp: getMaxHp(speciesToNumber(species), level)
          }))
          dispatch(editGame({
            healing: 0,
          }))
        })
      }

      if (!isWipedOut) {
        if (selectedDialog > 0) {
          return;
        }
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
            
            const pos = last(team.sort((a, b) => a!.position - b!.position))?.position;
            console.log('pos', pos);

            if (caught) {
              generateNewEnemy();
              dispatch(addPokemon({
                ...enemy,
                currentHp: 1,
                position: (pos || 10) + 1,
                nickname: enemy.species,
                pokeball: 'Poké Ball',
                metData: {
                  locationId: selectedRoute,
                  isFatefulEncounter: false,
                  dateMet: Date.now(),
                },
              }))
              const money = moneyFormula({
                isWild: enemy.isWild,
                baseExp: enemySpeciesData?.base_experience || 0,
                foeLevel: enemy.level,
                level: pokemon.level,
                hasAmuletCoin: false,
              })
              dispatch(awardMoney({money}))
              dispatch(
                editPokemon({
                  id: pokeId,
                  friendship: (pokemon?.friendship || 0) + 0.25,
                  currentExp: (pokemon?.currentExp || 0) + 
                    expFormula({
                      isWild: enemy.isWild,
                      baseExp: enemySpeciesData?.base_experience || 0,
                      foeLevel: enemy.level,
                      level: pokemon.level,
                    })
                })
              );
            }
          } else {
            console.log('Pokemon was not caught!');

            console.log(pokemon.currentExp);

            

            generateNewEnemy();
            
          }
          const currentExp = pokemon.currentExp == null ? 0 : pokemon.currentExp;
          const expRequired = pokemon.expRequired == null ? 0 : pokemon.expRequired;
          console.log(currentExp, expRequired);
          if (currentExp >= expRequired) {
            dispatch(editPokemon({
              id: pokeId,
              level: pokemon.level + 1,
              currentExp: 0,
              expRequired: expRequiredForumla(pokemon.level + 1, 'Medium Slow')
            }));
        } else {
          const damage = determineDamage({
            calculateBaseDPS: getBaseDPS(enemyId, enemy.level),
            calculateBaseDFS: getBaseDFS(speciesToNumber(team[pokeId].species), team[pokeId].level),
          });
          const currentHp = Math.floor(clamp(0, maxHp, team[pokeId].currentHp - damage));
          

          if (currentHp === 0) {
            const teamMemberWithHp = useableTeam.find(pk => pk.currentHp !== 0);
            if (teamMemberWithHp) {
              dispatch(selectPokemon({pokemonId: team.indexOf(teamMemberWithHp)}))

            } else {
              // everyone fainted lol
            }
          } else {
            
          }
          
          dispatch(editPokemon({id: pokeId, currentHp}))
        }

          
        }
        
      } else {
        dispatch(selectPokemon({pokemonId: 0}));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [
    pokeId,
    team,
    enemy,
    selectedDialog,
    game,
  ]);

  if (species == null) {
    return null;
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
