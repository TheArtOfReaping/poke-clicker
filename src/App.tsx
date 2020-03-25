import React, { useEffect, useState } from 'react';
import './App.css';
import { calculateBaseDPS, Types, expRequiredForumla } from './utils';
import {
  Move,
  ExpBar,
  Inventory,
  Panel,
  Map,
  Pokedex as PokedexPanel,
  AchivementsPanel,
  OptionsPanel,
  Trainer,
} from './components';
import { HPBar } from './components/HPBar';
//@ts-ignore
import * as Pokedex from 'pokeapi-js-wrapper';
import { expFormula } from './utils/expFormula';
import { Party } from './components/Party';

export interface Enemy {
  id: number;

  level: number;
  currentHp: number;
  shiny?: boolean;
  moves?: number[];
}

export interface Move {
  id: number;
  name: string;
  type: Types;
}

export const moves: Move[] = [
  {
    id: 1,
    name: 'Vine Whip',
    type: Types.Grass,
  },
  {
    id: 2,
    name: 'Tackle',
    type: Types.Normal,
  },
  {
    id: 3,
    name: 'Sludge Bomb',
    type: Types.Poison,
  },
  {
    id: 4,
    name: 'Weather Ball',
    type: Types.Normal,
  },
  {
    id: 5,
    name: 'Gust',
    type: Types.Flying,
  },
  {
    id: 6,
    name: 'Fire Blast',
    type: Types.Fire,
  },
  {
    id: 7,
    name: 'Dragon Rage',
    type: Types.Dragon,
  },
  {
    id: 8,
    name: 'Slash',
    type: Types.Normal,
  },
  {
    id: 9,
    name: 'Air Slash',
    type: Types.Flying,
  },
];

export interface PartyPokemon {
  id: number;
  species: string;
  nickname: string;
  level: number;
  gender?: string;
  currentHp: number;
  shiny?: boolean;
  moves?: number[];
  ability?: string;
  item?: string;
}

const party: PartyPokemon[] = [
  {
    id: 1,
    species: 'Bulbasaur',
    nickname: 'Bulby',
    level: 5,
    gender: 'm',
    currentHp: 21,
    shiny: false,
    ability: 'Overgrow',
    moves: [1, 2, 3, 4],
  },
  {
    id: 6,
    nickname: 'Fargo',
    species: 'Charizard',
    level: 37,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    ability: 'Blaze',
    item: 'Charcoal',
    moves: [6, 7, 8, 9],
  },
  {
    id: 16,
    nickname: 'Birdo',
    species: 'Pidgey',
    level: 11,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    moves: [2, 5],
  },
  {
    id: 1,
    nickname: 'Squirt',
    species: 'Squirtle',
    level: 22,
    currentHp: 21,
    shiny: false,
    gender: 'm',
    moves: [2],
  },
  {
    id: 1,
    nickname: 'Bulby',
    species: 'Bulbasaur',
    level: 1,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    moves: [2],
  },
  {
    id: 1,
    nickname: 'Egg',
    species: 'Chansey',
    level: 30,
    currentHp: 21,
    shiny: false,
    gender: 'f',
    moves: [2],
  },
];

const enemy = {
  id: 16,
  level: 2,
  currentHp: 200,
  shiny: false,
};
const game = {
  totalCaptures: 0,
  totalKills: 0,
  totalFaints: 0,
  totalWhiteouts: 0,
};

export interface Ability {}

export interface Form {}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface Type {
  slot: number;
  type: { name: string; url: string };
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: any;
  height: number;
  held_items: string[];
  ids: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  species: { name: string; url: string };
  sprites: any;
  stats: Stat[];
  types: Type[];
  weight: number;
}

const dexEntries: Pokemon[] = [];

const getSpecies = async (pokeId: number): Promise<Pokemon | undefined> => {
  try {
    const dex = new Pokedex.Pokedex();
    if (dexEntries[pokeId] != null) {
      return dexEntries[pokeId];
    }
    const species: Pokemon = await dex.resource(['api/v2/pokemon/' + pokeId]);
    dexEntries[pokeId] = species;
    console.log(species);
    return species;
  } catch (e) {
    console.error(e);
  }
  //return pokemonData.find(p => p.id === pokeId);
};

const calculateHP = (level: number, hpStat?: number) => {
  console.log(level, hpStat);
  if (!hpStat) return 0;
  //return Math.floor((( ( 2 * hpStat + 31 + (252 / 4) * level) / 100)) + level + 10);
  let res = 2 * hpStat;
  res = res + 31 + 0;
  res = res * level;
  res = res / 100;
  res = res + level;
  res = res + 10;
  return Math.floor(res);
};

const calculateOtherStat = (level: number, stat?: number) => {
  console.log(level, stat);
  if (!stat) return 0;
  return (2 * stat + 31 + (252 / 4) * level) / 100 + 5 * 1;
};

const pokemon = party[0];
// const species = getSpecies(party[0].id);
const enemySpecies = getSpecies(enemy.id);
const hp = 20;

function App() {
  const [enemyHp, setEnemeyHp] = useState(20);
  const [pokemonExp, setPokemonExp] = useState(0);
  const [pokemonExpRequired, setPokemonExpRequired] = useState(
    expRequiredForumla(pokemon.level, 'Medium Slow')
  );
  const [pokemonLevel, setPokemonLevel] = useState(5);

  const enemyHpPercent = (enemyHp / 20) * 100;
  const isFainted = enemyHp < 0;

  // const doIt = async () => {
  //   const dex = new Pokedex.Pokedex();
  //   const golduck = await dex.getPokemonByName('bulbasaur');
  //   console.log(golduck);
  // }

  // doIt();

  const species = getSpecies(party[0].id).then((res) => res);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnemeyHp(Math.floor(enemyHp - calculateBaseDPS(species, pokemon)));

      if (enemyHp < 0) {
        setEnemeyHp(20);
        setPokemonExp(
          pokemonExp +
            expFormula({
              isWild: true,
              baseExp: 50,
              foeLevel: enemy.level,
              level: pokemonLevel,
            })
        );
      }

      if (pokemonExp >= pokemonExpRequired) {
        setPokemonLevel(pokemonLevel + 1);
        setPokemonExp(0);
        setPokemonExpRequired(expRequiredForumla(pokemonLevel, 'Medium Slow'));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [enemyHp, pokemonExp, pokemonLevel, species, pokemonExpRequired]);

  if (species == null) {
    return null;
  }

  return (
    <div className="App">
      <h1>PokeClicker</h1>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '4px',
          borderRadius: '2px',
          marginTop: '1rem',
          marginBottom: '0.25rem',
        }}
      >
        1.0.0
      </div>
      <header className="App-header">
        <div
          className="storage"
          style={{
            width: '200px',
          }}
        >
          <h2>Storage</h2>
        </div>

        <div
          style={{
            border: '1px solid #222',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '1rem',
            boxShadow: '0 0 4px rba(0, 0, 0, 0.5)',
            width: '100%',
            maxWidth: '120rem',
            minHeight: '60rem',
            marginTop: '0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            className="left-wrapper"
            style={{
              width: '25%',
              padding: '1rem',
              marginRight: 'auto',
            }}
          >
            <Trainer />
            <Party party={party} />
            <Inventory />
          </div>

          <div className="battle-wrapper">
            <div
              className="battle-stage"
              style={{
                padding: '1rem',
                margin: '1rem',
                border: '1px solid white',
                boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
                background: 'url(./images/backgrounds/forest.png)',
                height: '460px',
                width: '800px',
                backgroundSize: 'cover',
                position: 'relative',
              }}
            >
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
                  <HPBar totalHp={20} currentHp={enemyHp} />
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
                  <ExpBar
                    totalExpNeeded={pokemonExpRequired}
                    currentExpProgress={pokemonExp}
                  />
                  <div>DPS: {calculateBaseDPS(species, pokemon)}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', margin: '1rem', width: '800px' }}>
              <Move
                damage={40}
                totalTime={20}
                timeLeft={1}
                type={Types.Grass}
              />
              <Move
                rank={2}
                damage={50}
                totalTime={10}
                timeLeft={4}
                name="Tackle"
              />
              <Move
                rank={3}
                damage={90}
                totalTime={10}
                timeLeft={0}
                name="Sludge Bomb"
                type={Types.Poison}
              />
              <Move
                damage={100}
                totalTime={50}
                timeLeft={50}
                name="Weather Ball"
                type={Types.Fire}
              />
            </div>

            <OptionsPanel />
          </div>

          <div
            className="right-panel"
            style={{ width: '25%', marginLeft: 'auto' }}
          >
            <Map />
            <PokedexPanel />
            <AchivementsPanel />
          </div>
        </div>
      </header>
      <div style={{}}>
        Hint: you can use Ctrl + Click to select multiple items in any list
      </div>
    </div>
  );
}

export default App;
