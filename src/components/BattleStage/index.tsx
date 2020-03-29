import React from 'react';
import { HPBar, ExpBar, Move, Panel, OptionsPanel, ItemIcon } from '../../components';
import { Types, calculateBaseDPS, moves, Pokemon, getSpecies, generateRewards, ZIndexMap } from 'utils';
import { PartyPokemon } from '../../App';
import { stylesheet, media, keyframes, classes } from 'typestyle';
import { listOfRoutes } from 'utils/listOfRoutes';
import { colors } from 'utils/colors';
import { Pokemart } from './Pokemart';
import { getGenderIcon } from 'utils';
import { getSpeciesValue } from 'components/Party';
import { clamp } from 'ramda';
import { useSelector } from 'react-redux';
import { State, Enemy, selectRoute } from 'actions';
import { FieldEffects } from './FieldEffects';

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
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    
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
  PokeMartLayer: {
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
  moveTimes: number[];
}

export function BattleStage({
  enemy,
  pokemon,
  moveTimes,
  isFainted,
}: BattleStageProps) {
  const hp = 20;
  const pokemonExp = 10;
  const pokemonExpRequired = 1000;
  const showPokemart = false;
  const selectedRoute = useSelector<State, number>(state => state.selections.selectedRoute);

  const height = getSpeciesValue(pokemon?.id || 0, 'height');
  console.log(height);

  const determineSize = (species?: string) => clamp(80, 360, height * 20) + 'px';
  const determinePosition = () => {

    const bottom = height > 10 ? -10 : 80
    const left = height > 10 ? -20 : 80

    return {
      bottom,
      left,
    }
  }

  const message = <div>{enemy?.species} Fainted!<br/>{generateRewards({routeItems: listOfRoutes[selectedRoute].itemDrops}).map((item, idx) => {
    return <div>+1 <ItemIcon img={item?.item?.img} folder={item?.item?.folder} imgProps={{height: '16px', style: {verticalAlign: 'middle'}}} /></div>;
  })}</div>;

  return (
    <div className="battle-wrapper">
      {showPokemart && <div className={styles.PokeMartLayer}><Pokemart /></div>}
            <div
              className={styles.BattleStage}
              style={{
                background: `url(./images/backgrounds/${listOfRoutes[selectedRoute].background || 'route'}.png)`,
              }}
            >
              
              <div className={styles.BattleFXLayer}></div>
              <FieldEffects />

              <StageMessage message={enemy?.currentHp === 0 ? message : null} />

              <div className="defending-pokemon">

                <img
                  className={classes(isFainted && 'fainted', styles.EnemyPokemonSprite)}
                  style={{
                    height: '128px',
                    imageRendering: 'pixelated',
                    position: 'absolute',
                    bottom: '180px',
                    right: '130px',
                  }}
                  alt={enemy?.species}
                  src={`https://img.pokemondb.net/sprites/black-white/anim/${
                    enemy?.shiny ? 'shiny' : 'normal'
                  }/${enemy?.species.toLowerCase()}.gif`}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '0',
                    padding: '1rem',
                    background: '#222',
                    boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
                    clipPath: `polygon(0 0, 100% 0, 94% 100%, 0% 100%)`,
                  }}
                >
                  <div>{enemy?.species} {getGenderIcon(enemy?.gender)} lv.{enemy?.level}</div>
                  <HPBar showHp={false} totalHp={20} currentHp={enemy?.currentHp || 0} />
                </div>
              </div>

              <div className="active-pokemon">
                <img
                  style={{
                    height: determineSize(pokemon?.species),
                    ...determinePosition(),
                  }}
                  className={classes(styles.TeamPokemonSprite, styles.TeamPokemonSpriteFX)}
                  alt={pokemon?.species}
                  src={`https://img.pokemondb.net/sprites/black-white/anim/back-${
                    pokemon?.shiny ? 'shiny' : 'normal'
                  }/${pokemon?.species.toLowerCase()}.gif`}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '0',
                    padding: '1rem',
                    background: '#222',
                    boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
                  }}
                >
                  {pokemon?.nickname} {getGenderIcon(pokemon?.gender)} lv.{pokemon?.level}
                  <HPBar currentHp={pokemon?.currentHp || 20} totalHp={hp} />
                  <ExpBar
                    totalExpNeeded={pokemonExpRequired}
                    currentExpProgress={pokemonExp}
                  />
                  <div className={styles.DPSBadge}>DPS: 20</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '0.5rem', width: '800px' }}>
              {pokemon?.moves?.map((moveId, idx) => {
                const move = moves.find(m => m.id === moveId);
                return move && <Move
                damage={move.basePower}
                totalTime={move.coolDown}
                timeLeft={moveTimes[idx]}
                type={move.type}
                name={move.name}
              />
              })}
            </div>

          </div>
  );
}
