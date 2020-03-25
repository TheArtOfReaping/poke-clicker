import React from 'react';
import { HPBar, ExpBar, Move } from '../../components';
import { Types, calculateBaseDPS } from '../../utils';
import { Enemy, Pokemon } from '../../App';

export interface BattleStageProps {
  enemy?: Enemy;
  pokemon: Pokemon;
  isFainted?: boolean;
}

export function BattleStage({
  // enemy,
  // pokemon,
  isFainted,
}: BattleStageProps) {
  const pokemon = {
    shiny: true,
    nickname: 'Doober',
    currentHp: 21,
  };

  const enemyHp = 20;
  const enemy = {
    shiny: false,
  };
  const species = '';
  const pokemonLevel = 5;
  const hp = 20;
  const pokemonExp = 10;

  return (
    <div className="battle-wrapper">
      <div
        className="battle-stage"
        style={{
          padding: '1rem',
          margin: '1rem',
          border: '1px solid white',
          boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
          background:
            'url(https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/b/bf/Pokemon_Battle_Stage.png/revision/latest?cb=20171229235638)',
          height: '460px',
          width: '800px',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
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
                zIndex: 100,
              }}
            >
              Pokemon fainted!
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
            <HPBar totalHp={200} currentHp={enemyHp} />
          </div>
        </div>

        <div className="active-pokemon">
          <img
            style={{
              height: '192px',
              imageRendering: 'pixelated',
              position: 'absolute',
              bottom: '0',
              left: '120px',
            }}
            className="attacking"
            alt="bulbasaur"
            src={`https://img.pokemondb.net/sprites/black-white/anim/back-${
              pokemon.shiny ? 'shiny' : 'normal'
            }/${'bulbasaur'}.gif`}
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
            {pokemon.nickname} lv.{pokemonLevel}
            <HPBar currentHp={pokemon.currentHp} totalHp={hp} />
            <ExpBar totalExpNeeded={128} currentExpProgress={pokemonExp} />
            <div>DPS: {calculateBaseDPS(species, pokemon)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', margin: '1rem', width: '800px' }}>
        <Move type={Types.Grass} />
        <Move name="Tackle" />
        <Move name="Sludge Bomb" type={Types.Poison} />
        <Move name="Weather Ball" type={Types.Fire} />
      </div>
    </div>
  );
}
