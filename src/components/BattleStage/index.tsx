import React from 'react';
import { HPBar, ExpBar, Move } from '../../components';
import { moves, ZIndexMap, speciesToNumber, toKebabCase } from 'utils';
import { PartyPokemon, Enemy } from 'utils';
import { stylesheet, media, keyframes, classes } from 'typestyle';
import { colors } from 'utils/colors';
import { Pokemart } from './Pokemart';
import { getGenderIcon } from 'utils';
import { getSpeciesValue } from 'components/Party';
import { clamp } from 'ramda';
import { useSelector } from 'react-redux';
import { State, GameMode, coreService, coreMachine } from 'state';
import { FieldEffects } from './FieldEffects';
import { PokemonStorage } from './PokemonStorage';
import { DialogKind } from 'components/Dialog';
import { TrainerCustomization } from 'components/Trainer/TrainerCustomization';
import { ToastContainer } from 'react-toastify';
import { StarterSelection } from './StarterSelection';
import { Main } from 'components/Main/Main';
import { SpeciesName } from 'utils/SpeciesName';
import { useInput } from 'rooks';
import { Input, Button } from 'antd';
import { useMachine } from '@xstate/react';
import { StarterSelector } from './StarterSelector';
import { SpeciesProvider } from 'components/SpeciesProvider';

const basicAttackAnimation = keyframes({
  '0%': {
    marginLeft: '-15px',
  },
  '70%': {
    marginLeft: 0,
  },
  '100%': {
    marginLeft: 0,
  }
})

const leftAppear = keyframes({
  '0%': {
    left: '-360px',
  },
  '100%': {
    left: 0,
  }
})

const styles = stylesheet({
  BattleStage: {
    padding: '1rem',
    //margin: '1rem',
    border: '1px solid white',
    boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
    height: '460px',
    //width: '800px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    overflow: 'hidden',
    
    $nest: {
      '&': {
        ...media({minWidth: 0, maxWidth: 720}, {
          width: '100%',

        })
      }
    }   
  },
  BattleFXLayer: {
    background: '#feb url(https://play.pokemonshowdown.com/fx/weather-sunnyday.jpg) no-repeat scroll left top',
    backgroundSize: 'cover',
    position: 'absolute',
    opacity: '0.4',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  StageMessage: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(15px)',
    width: '320px',
    height: '80px',
    position: 'absolute',
    left: 0,
    bottom: '1rem',
    padding: '0.5rem',
    fontSize: '1.25rem',
    borderRadius: '0 .25rem .25rem 0',
    zIndex: ZIndexMap.StageMessage,
    display: 'flex',
    animationName: leftAppear,
    animationDuration: '0.2s',
    animationIterationCount: '1',
    animationTimingFunction: 'ease-in-out',
  },
  StageMessageAnimated: {
    animationName: leftAppear,
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out',
  },
  Dialog: {
    background: colors.primary.get(),
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '1rem',
    zIndex: ZIndexMap.StageDialog,
  },
  TeamPokemonSprite: {
    imageRendering: 'pixelated',
    position: 'absolute',
    animationName: basicAttackAnimation,
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out',
  },
  TeamPokemonSpriteFX: {
  },
  EnemyPokemon: {

  },
  EnemyPokemonSprite: {
    imageRendering: 'pixelated',
    position: 'absolute',
    animationName: basicAttackAnimation,
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate-reverse',
    animationTimingFunction: 'ease-in-out',
  },
  DPSBadge: {
    clipPath: `polygon(14% 0, 100% 0%, 86% 100%, 0% 100%)`,
    background: colors.secondary.tint2,
    color: 'black',
    width: '5rem',
    marginTop: '2px',
    marginLeft: 'auto',
  },
  PokemonName: {
    //textAlign: 'left',
    fontSize: '1.25rem',
  },
  PokeBallIcon: {
    height: '12px',
    filter: 'invert(100%)',
    verticalAlign: 'middle',
    marginLeft: '4px',
  },
  Toast: {
    position: 'relative',
    bottom: 0,
  },
  DarkToast: {
    background: colors.primary.shade2,
  }
});



export interface StageMessageProps {
  message?: React.ReactNode | undefined;
}
export function StageMessage({message}: StageMessageProps) {
  return message ? <div className={styles.StageMessage}>
    {message}    
  </div> : null;
}

export interface BattleStageProps {
  enemy?: Enemy;
  pokemon?: PartyPokemon;
  isFainted?: boolean;
  maxHp: number;
  moveTimes: number[];
  wipedOut?: boolean;
  username?: string;
}

export function BattleStage({
  enemy,
  pokemon,
  moveTimes,
  isFainted,
  username,
  maxHp,
  wipedOut,
}: BattleStageProps) {
  const hp = 20;
  const pokemonExpRequired = 1000;
  const showPokemart = false;
  const isPokemonFainted = pokemon?.currentHp === 0;
  const preRoute = useSelector<State, number>(state => state.selections.selectedRoute);
  const selectedRoute = preRoute == null ? 0 : preRoute;
  const selectedDialog = useSelector<State, number>(state => state.selections.selectedDialog);
  const listOfRoutes = useSelector<State, State['map']>(state => state.map);


  // const height = getSpeciesValue(speciesToNumber(pokemon?.species) || 1, 'height');
  const determineSize = (height: number, dynamax?: boolean) => clamp(dynamax ? 360 : 164, dynamax ? 640 : 360, height * 20) + 'px';
  const determinePosition = (height: number) => {

    const bottom = height > 10 ? -10 : 70
    const left = height > 10 ? -20 : 100

    return {
      bottom,
      left,
    }
  }

  // const message = <div>{enemy?.species} Fainted!<br/>{generateRewards({routeItems: listOfRoutes[selectedRoute].itemDrops}).map((item, idx) => {
  //   return <div>+1 <ItemIcon img={item?.item?.img} folder={item?.item?.folder} imgProps={{height: '16px', style: {verticalAlign: 'middle'}}} /></div>;
  // })}</div>;
  const message = '';

  return (
    <div>
      {wipedOut && <div style={{fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={styles.Dialog}>You Wiped Out!<br/>{username} scurried back to the Pokémon Center and lost $3000...</div>}
      <StarterSelector />
              
      {pokemon && <div
              className={styles.BattleStage}
              style={{
                backgroundImage: `url(./images/backgrounds/${listOfRoutes[selectedRoute].background || 'route'}.png)`,
              }}
            >
              <div className={styles.BattleFXLayer}></div>
              <FieldEffects />

              <StageMessage message={enemy?.currentHp === 0 ? message : null} />
              <ToastContainer
                className={styles.Toast}
                toastClassName={styles.DarkToast}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

              {enemy?.species != null ? <div className={styles.EnemyPokemon}>

                <img
                  className={classes(isFainted && 'fainted', styles.EnemyPokemonSprite)}
                  style={{
                    height: '128px',
                    imageRendering: 'pixelated',
                    position: 'absolute',
                    bottom: '180px',
                    right: '130px',
                    filter: enemy?.superShiny ? `hue-rotate(${enemy?.superShinySeed || 0}deg)` : undefined,
                  }}
                  alt={enemy?.species}
                  src={`https://img.pokemondb.net/sprites/black-white/anim/${
                    enemy?.shiny ? 'shiny' : 'normal'
                  }/${enemy?.species?.toLowerCase()}.gif`}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '0',
                    padding: '1rem',
                    background: colors.primary.shade1,
                    boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
                    clipPath: `polygon(0 0, 100% 0, 94% 100%, 0% 100%)`,
                  }}
                >
                  <div className={styles.PokemonName}>{enemy?.species} {getGenderIcon(enemy?.gender)} lv.{enemy?.level}
                    <img className={styles.PokeBallIcon} src='./images/bag-icons/ball.png' />
                  </div>
                  
                  {enemy?.currentHp != null && <HPBar showHp={false} totalHp={enemy.maxHp} currentHp={enemy?.currentHp} />}
                </div>
              </div> : null}

              {!isPokemonFainted && <SpeciesProvider speciesNameOrId={pokemon?.species} render={poke => <div className="active-pokemon">
                <img
                  style={{
                    height: determineSize(poke!.height!, false),
                    ...determinePosition(poke!.height),
                    filter: pokemon?.superShiny ? `hue-rotate(${pokemon?.superShinySeed || 0}deg)` : undefined,
                  }}
                  className={classes(styles.TeamPokemonSprite, styles.TeamPokemonSpriteFX)}
                  alt={pokemon?.species}
                  src={`https://img.pokemondb.net/sprites/black-white/anim/back-${
                    pokemon?.shiny ? 'shiny' : 'normal'
                  }/${pokemon?.species?.toLowerCase()}.gif`}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '0',
                    padding: '1rem',
                    background: colors.primary.shade1,
                    boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
                    
                  }}
                >
                  <div className={styles.PokemonName}>
                    {pokemon?.nickname} {getGenderIcon(pokemon?.gender)} lv.{pokemon?.level}
                  </div>
                  <HPBar currentHp={pokemon?.currentHp} totalHp={maxHp} />
                  <ExpBar
                    totalExpNeeded={pokemon?.expRequired}
                    currentExpProgress={pokemon?.currentExp}
                  />
                  <div className={styles.DPSBadge}></div>
                </div>
              </div>
              } />}
            </div>}

            <div style={{ display: 'flex', marginTop: '0.5rem', width: '800px' }}>
              {pokemon?.moves?.map((m, idx) => {
                const data = moves.find(move => toKebabCase(move.name) === m.move);
                return data && <Move
                damage={data.basePower}
                totalTime={data.coolDown}
                timeLeft={moveTimes[idx]}
                type={data.type}
                name={data.name}
              />
              })}
            </div>

          </div>
  );
}

export * from './Pokemart';
export * from './PokemonStorage';