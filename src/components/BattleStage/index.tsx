import React from 'react';
import { HPBar, ExpBar, Move, Panel, OptionsPanel, ItemIcon } from '../../components';
import { Types, calculateBaseDPS, moves } from 'utils';
import { Enemy, Pokemon, PartyPokemon } from '../../App';
import { stylesheet } from 'typestyle';

const styles = stylesheet({
  BattleStage: {
    padding: '1rem',
    //margin: '1rem',
    border: '1px solid white',
    boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
    background: 'url(./images/backgrounds/forest.png)',
    height: '460px',
    width: '800px',
    backgroundSize: 'cover',
    position: 'relative',
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
  }
});


export interface BattleStageProps {
  enemy?: Enemy;
  pokemon?: PartyPokemon;
  isFainted?: boolean;
  moveTimes: number[];
}

export function BattleStage({
  // enemy,
  pokemon,
  moveTimes,
  isFainted,
}: BattleStageProps) {

  const enemyHp = 20;
  const enemy = {
    shiny: false,
  };
  const species = '';
  const pokemonLevel = 5;
  const hp = 20;
  const pokemonExp = 10;
  const pokemonExpRequired = 1000;

  const determineSize = (species?: string) => species == null ? '192px' : species === 'Charizard' ? '384px' : '192px';

  return (
    <div className="battle-wrapper">
            <div
              className={styles.BattleStage}
            >
              <div className={styles.BattleFXLayer}></div>
              <div
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  //boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
                  color: '#000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  alt="weather"
                  height="14px"
                  src="https://image.flaticon.com/icons/svg/890/890347.svg"
                />
                Sunny
              </div>

              <div style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                width: '320px',
                height: '80px',
                position: 'absolute',
                left: 0,
                bottom: '1rem',
                padding: '0.5rem',
                fontSize: '1.25rem',
                borderRadius: '0 .25rem .25rem 0',
                zIndex: 10,
              }}>
                {pokemon?.nickname} leveled up!
                + 1 Atk +2 Def +3 SpAtk
              </div>

              <div className="defending-pokemon">
                {isFainted && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '160px',
                      right: '80px',
                      background: '#222',
                      borderRadius: '.25rem',
                      padding: '0.5rem',
                      width: '240px',
                      textAlign: 'left',
                      zIndex: 100,
                    }}
                  >
                    <div>Pidgey fainted!</div>
                    <div>+2 <ItemIcon img='poke' folder='ball' imgProps={{height: '16px', style: {verticalAlign: 'middle'}}} /> Pokeball</div>
                    <div>+1 <ItemIcon img='potion' folder='medicine' imgProps={{height: '16px', style: {verticalAlign: 'middle'}}} /> Potion</div>
                  </div>
                )}

                <img
                  className={isFainted ? `fainted` : undefined}
                  style={{
                    height: '128px',
                    imageRendering: 'pixelated',
                    position: 'absolute',
                    bottom: '180px',
                    right: '130px',
                  }}
                  alt="enemy"
                  src={`https://img.pokemondb.net/sprites/black-white/anim/${
                    enemy.shiny ? 'shiny' : 'normal'
                  }/${'pidgey'}.gif`}
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
                  <div>{'Pidgey'}</div>
                  <HPBar totalHp={20} currentHp={enemyHp} />
                </div>
              </div>

              <div className="active-pokemon">
                <img
                  style={{
                    height: determineSize(pokemon?.species),
                    imageRendering: 'pixelated',
                    position: 'absolute',
                    bottom: '0',
                    left: '0px',
                  }}
                  className="attacking"
                  alt="bulbasaur"
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
                  {pokemon?.nickname} lv.{pokemonLevel}
                  <HPBar currentHp={pokemon?.currentHp || 20} totalHp={hp} />
                  <ExpBar
                    totalExpNeeded={pokemonExpRequired}
                    currentExpProgress={pokemonExp}
                  />
                  <div>DPS: {calculateBaseDPS(species, pokemon)}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', margin: '1rem', width: '800px' }}>
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
