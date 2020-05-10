import React, { useEffect, useState } from 'react';
import './App.css';
import { calculateBaseDPS, expRequiredForumla, generateRewards, moves, getSpecies, choose, moneyFormula, colors, getContrastColor, speciesToNumber, calculateHP, determineShiny, expFormula, Pokemon, determineDamage, calculateBaseDFS, PartyPokemon, Enemy, shouldBeCaught, Item } from 'utils';
import {
  Inventory,
  Panel,
  Map,
  Pokedex as PokedexPanel,
  AchivementsPanel,
  OptionsPanel,
  TrainerPanel,
  BattleStage,
} from 'components';
//@ts-ignore
import { Party, getStat } from './components/Party';
import clamp from 'ramda/src/clamp';
import head from 'ramda/src/head';
import { useSelector, useDispatch } from 'react-redux';
import { editPokemon, createNewEnemy, editEnemy, addPokemon, awardMoney, editGame, selectPokemon, editRoute, selectRoute, editItem, addSeen, addCaught } from 'actions';
import { Game } from 'utils';
import { style, media } from 'typestyle';
import { State } from 'state';
import { SpeciesName } from 'utils/SpeciesName';
// @ts-ignore
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import { take,last } from 'ramda';
import { positionalSort } from 'utils/positionalSort';
import { listOfNatures } from 'utils/Nature';
import { Button } from 'components/Button';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getItem } from 'utils/listOfRoutes';
import { coreService } from 'state';


const curryToast = (message: string) => toast(message, {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

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

export interface CaptureArgs {inventory: State['inventory'], enemySpeciesData?: Pokemon, pokeBallsToThrow: number, enemy?: Enemy, enemyMaxHp?: number}

const shouldCatch = ({inventory, pokeBallsToThrow}: CaptureArgs) => {
  const balls = inventory.filter(item => item.folder === 'ball' && item.quantity);
  return !!(pokeBallsToThrow > 0 && balls.length);
};

const isCaught = ({inventory, enemySpeciesData, enemy, enemyMaxHp, pokeBallsToThrow}: CaptureArgs) => {
  const balls = inventory.filter(item => item.folder === 'ball' && item.quantity);
  const pokeballUsed = balls[0];
  //console.log('pokeballUsed', pokeballUsed);
  const type = enemySpeciesData?.types;
  const isCaught = shouldBeCaught({
    maxHP: (enemyMaxHp || 1),
    currentHP: (enemy?.currentHp || 0),
    ballBonus: typeof pokeballUsed.catchRate === 'number' ? pokeballUsed.catchRate : (pokeballUsed?.catchRate && pokeballUsed?.catchRate()),
    rate: enemySpeciesData?.capture_rate || 3,
  }) && !!pokeBallsToThrow;
  return {
    isCaught,
    pokeballUsed,
  };
}

const getMove = (id?: number) => id == null ? {coolDown: 0} : moves.find(m => m.id === id);


export interface AppProps {
  authData: {username?: string};
}
export function App(props: AppProps) {
  const dispatch = useDispatch();
  
  const enemy = useSelector<State, Enemy>(state => state.enemy);
  const game = useSelector<State, Game>(state => state.game);
  const team = useSelector<State, PartyPokemon[]>(state => state.team.sort(positionalSort));
  const routePrep = useSelector<State, number>(state => state.selections.selectedRoute);
  const listOfRoutes = useSelector<State, State['map']>(state => state.map);
  const selectedRoute = routePrep == null ? 0 : routePrep;
  const route = listOfRoutes[selectedRoute];
  const selectedDialog = useSelector<State, number>(state => state.selections.selectedDialog);

  const inventory = useSelector<State, State['inventory']>(state => state.inventory);
  
  const pokeId = useSelector<State, number>(state => state.selections.selectedPokemon);
  const [enemySpeciesData, setEnemySpeciesData] = useState<Pokemon | undefined>();
  const [pokeBallsToThrow, setPokeballsToThrow] = useState<number>(3);
  const pokemon = team[pokeId];

  const [simulationSpeed, setSimulationSpeed] = useState<number>(1000); 

  const coolDown = (id: number) => getMove(pokemon?.moves?.[id])?.coolDown || 0;

  
  const [moveTimes, setMoveTimes] = useState(
    [coolDown(0), coolDown(1), coolDown(2), coolDown(3)]
  );
  

  
  const enemyHp = enemy.currentHp;
  const enemySpecies: SpeciesName = enemy.species;


  const species = getSpecies(speciesToNumber(pokemon?.species)).then((res) => res);

  const enemyId = speciesToNumber(enemySpecies);
  getSpecies(enemyId).then(res => setEnemySpeciesData(res));
  const enemyMaxHp = enemyId ? calculateHP(enemy.level, getStat(enemyId, 'hp')) : enemyHp;
  const useableTeam = take(6, team);
  const isWipedOut = useableTeam.reduce((prev, curr) => prev + curr.currentHp, 0) === 0 && !!useableTeam.length;


  
  const speciesId = speciesToNumber(pokemon?.species);
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
  const generateNewEnemy = () => {
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


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!pokemon?.species) {
        return;
      }

      const totalHealth = useableTeam.reduce((prev, curr) => {
        return prev + calculateHP(curr.level, getStat(speciesToNumber(curr.species) || 0, 'hp'));
      }, 0);
      const currentHealth = useableTeam.reduce((prev, curr) => {
        return prev + curr.currentHp;
      }, 0);
      const shouldHeal = (currentHealth / totalHealth) < 0.33;
      const healingItems = inventory.filter(item => item.heal && item.quantity);
      const healingItem = head(healingItems);
      healingItem && shouldHeal && dispatch(editItem({...healingItem, quantity: healingItem?.quantity - 1}))
      const healing = healingItem && shouldHeal ? (game.healing + 1 + (healingItem?.heal || 0)) : game.healing + 1;
      
      // console.log(healing >= totalHealth, healing, totalHealth);
      
      dispatch(editGame({healing}))
      if (healing >= totalHealth) {
        useableTeam.forEach((pokemon, id) => {
          const {species, level} = pokemon;
          // console.log(getMaxHp(speciesToNumber(species), level));
          dispatch(editPokemon({
            id,
            currentHp: getMaxHp(speciesToNumber(species), level)
          }));
          dispatch(editGame({
            healing: clamp(0, totalHealth, healing - totalHealth),
          }));
        });
      }

      if (enemySpecies == null) {
        generateNewEnemy();
        return;
      }

      const rewardForCaptureOrVictory = (isCapture?: boolean) => {
        const expFormulaResult = expFormula({
          isWild: enemy.isWild,
          baseExp: enemySpeciesData?.base_experience || 0,
          foeLevel: enemy.level,
          level: pokemon.level,
        });
        const money = moneyFormula({
          isWild: enemy.isWild,
          baseExp: enemySpeciesData?.base_experience || 0,
          foeLevel: enemy.level,
          level: pokemon.level,
          hasAmuletCoin: !!getItem('Amulet Coin', inventory)?.quantity,
        });
        dispatch(awardMoney({money}))
        dispatch(
          editPokemon({
            id: pokeId,
            friendship: (pokemon?.friendship || 0) + 0.25,
            currentExp: (pokemon?.currentExp || 0) + 
              expFormulaResult
          })
        );
        isCapture && dispatch(addCaught({
          species: enemySpecies,
          caught: true,
        }));
        isCapture ?
          curryToast(`Caught the wild ${enemySpecies}! ${pokemon.nickname} earned ${expFormulaResult} exp! Earned $${money}!`) :
          curryToast(`Defeated the wild ${enemySpecies}! ${pokemon.nickname} earned ${expFormulaResult} exp! Earned $${money}!`);
      }

      const capturePokemon = (caught: {isCaught: boolean, pokeballUsed: Item}) => {
        const pos = last(team.sort((a, b) => a!.position - b!.position))?.position;
        dispatch(addPokemon({
          ...enemy,
          currentHp: 1,
          position: (pos || 10) + 1,
          nickname: enemy.species,
          pokeball: caught.pokeballUsed.name,
          moves: [1],
          metData: {
            locationId: selectedRoute,
            isFatefulEncounter: false,
            dateMet: Date.now(),
          },
        }))
      }

      const attemptCapture = () => {
        const goForCatch = shouldCatch({inventory, enemySpeciesData, pokeBallsToThrow});
        
        if (goForCatch) {
          const caught = isCaught({inventory, enemySpeciesData, pokeBallsToThrow, enemyMaxHp, enemy});
          curryToast(`Threw a ${caught.pokeballUsed.name} at the wild ${enemySpecies}!`);
          dispatch(editItem({
            ...caught.pokeballUsed,
            quantity: caught.pokeballUsed.quantity - 1,
          }));
          
          if (caught.isCaught) {
            
            capturePokemon(caught);
            rewardForCaptureOrVictory(true);
            generateNewEnemy();
            setPokeballsToThrow(3);
          } else {
            setPokeballsToThrow(pokeBallsToThrow - 1);
            if (!pokeBallsToThrow) {
              // TODO: display a got away message
              curryToast('Darn, it got away!');
              generateNewEnemy();
            } else {
              return;
              //attemptCapture();
            }
          }
        } else {
          rewardForCaptureOrVictory();
          generateNewEnemy();
        }
      }

      const checkForNextAvailablePokemon = () => {
        const damage = determineDamage({
          calculateBaseDPS: getBaseDPS(enemyId, enemy.level),
          calculateBaseDFS: getBaseDFS(speciesToNumber(team[pokeId].species), team[pokeId].level),
        });
        const currentHp = enemyHp === 0 ? team[pokeId].currentHp : Math.floor(clamp(0, maxHp, team[pokeId].currentHp - damage));

        if (currentHp === 0) {
          const teamMemberWithHp = useableTeam.find(pk => pk.currentHp !== 0 && !pk.isEgg);
          if (teamMemberWithHp) {
            dispatch(selectPokemon({pokemonId: team.indexOf(teamMemberWithHp)}))

          } else {
            // everyone fainted lol
          }
        } else {
          
        }

        dispatch(editPokemon({id: pokeId, currentHp}));
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
            inventory,
            routeItems: listOfRoutes[selectedRoute].itemDrops,
            callback: (foundItem) => {
              if (foundItem != null) {
                dispatch(editItem({
                    ...foundItem,
                    quantity: foundItem.quantity + 1,
                }))
              }
            }
          });
          
          const goForCatch = shouldCatch({inventory, enemySpeciesData, pokeBallsToThrow});
          if (goForCatch) {
            attemptCapture();
          } else {
          
          }


          const currentNumberDefeated = (route?.currentNumberDefeated!) + 1;

          dispatch(editRoute({
            ...route,
            currentNumberDefeated,
          }));

          if (currentNumberDefeated >= route.defeatNumber!) {
            const connections = route.connections;
            if (connections.length) {
              dispatch(selectRoute({routeId: connections[0]}))
            }
            connections.forEach(conn => {
              dispatch(editRoute({
                ...listOfRoutes[conn],
                accessible: true,
                visible: true,
              }));
            });
          }

          
          const currentExp = pokemon.currentExp == null ? 0 : pokemon.currentExp;
          const expRequired = pokemon.expRequired == null ? 0 : pokemon.expRequired;
          if (currentExp >= expRequired) {
            dispatch(editPokemon({
              id: pokeId,
              level: pokemon.level + 1,
              currentExp: 0,
              expRequired: expRequiredForumla(pokemon.level + 1, 'Medium Slow')
            }));
        } else {    
          checkForNextAvailablePokemon();
          
        }
        
        }
        
        checkForNextAvailablePokemon();
      } else {
        dispatch(selectPokemon({pokemonId: 0}));
      }
    }, simulationSpeed);
    return () => clearTimeout(timer);
  }, [
    pokeId,
    team,
    enemy,
    selectedDialog,
    game,
    simulationSpeed,
    coolDown,
    dispatch,
    enemyMaxHp,
    enemySpeciesData,
    listOfRoutes,
    isWipedOut,
    maxHp,
    moveTimes,
    pokeBallsToThrow,
    pokemon,
    route,
    selectedRoute,
    speciesId,
    useableTeam,
    enemyHp,
    enemyId,
    generateNewEnemy,
    inventory,
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
              <Panel name='Main'>
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
              <Panel name='Quest Log' height={'30%'}>
              </Panel>
              <Panel name='Dev' height={'30%'}>
                <Button onClick={e => setSimulationSpeed(simulationSpeed - 200)} value='Speed Up' />
                <Button onClick={e => setSimulationSpeed(1000)} value='Reset' />
                <Button onClick={e => setSimulationSpeed(simulationSpeed + 200)} value='Slow Down' />
                Current Speed: {simulationSpeed}{'\n'}
                pokeBallsToThrow: {pokeBallsToThrow}
              </Panel>
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
