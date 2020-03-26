import React, { useEffect, useState } from 'react';
import './App.css';
import { calculateBaseDPS, Types, expRequiredForumla, generateRewards, moves } from './utils';
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
  ItemIcon,
  BattleStage,
} from './components';
import { HPBar } from './components/HPBar';
//@ts-ignore
import * as Pokedex from 'pokeapi-js-wrapper';
import { expFormula } from './utils/expFormula';
import { Party } from './components/Party';
import clamp from 'ramda/src/clamp';
import { listOfRoutes } from 'utils/listOfRoutes';
import { useSelector } from 'react-redux';

export interface Enemy {
  id: number;

  level: number;
  currentHp: number;
  shiny?: boolean;
  moves?: number[];
}


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

const enemy = {
  id: 16,
  level: 2,
  currentHp: 20,
  maxHP: 20,
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

// const species = getSpecies(party[0].id);
const enemySpecies = getSpecies(enemy.id);
const hp = 20;

const getMove = (id?: number) => id == null ? {coolDown: 0} : moves.find(m => m.id === id);

function App() {
  const [enemyHp, setEnemeyHp] = useState(20);
  const [pokemonExp, setPokemonExp] = useState(0);
  const team = useSelector((state: any) => state.team);
  const pokemon = team[1];
  const [pokemonExpRequired, setPokemonExpRequired] = useState(
    expRequiredForumla(pokemon.level, 'Medium Slow')
  );
  const [pokemonLevel, setPokemonLevel] = useState(5);
  const coolDown = (id: number) => getMove(pokemon?.moves?.[id])?.coolDown || 0;

  const [moveTimes, setMoveTimes] = useState(
    [coolDown(0), coolDown(1), coolDown(2), coolDown(3)]
  );

  console.log(generateRewards({
      routeItems: listOfRoutes[0].itemDrops,
  }))

  const enemyHpPercent = (enemyHp / 20) * 100;
  const isFainted = enemyHp === 0;

  // const doIt = async () => {
  //   const dex = new Pokedex.Pokedex();
  //   const golduck = await dex.getPokemonByName('bulbasaur');
  //   console.log(golduck);
  // }

  // doIt();

  const species = getSpecies(pokemon.id).then((res) => res);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnemeyHp(clamp(0, enemy.maxHP, enemyHp - calculateBaseDPS(species, pokemon)));

      setMoveTimes([
        clamp(0, coolDown(0), moveTimes[0] - 1),
        clamp(0, coolDown(1), moveTimes[1] - 1),
        clamp(0, coolDown(2), moveTimes[2] - 1),
        clamp(0, coolDown(3), moveTimes[3] - 1),
      ])

      if (enemyHp === 0) {
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
      <header className="App-header">
        <div
          style={{
            border: '1px solid #222',
            background: 'rgba(0, 0, 0, 0.2)',
            boxShadow: '0 0 4px rba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100vh',
            overflow: 'auto',
            marginTop: '0',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >

            <div style={{height: '100%', width: '20%', display: 'flex', flexWrap: 'wrap'}}>
              <Trainer panelProps={{height: '20%'}} />
              <Party party={team} panelProps={{height: '40%'}} />
              <Inventory panelProps={{height: '38%'}} />
            </div>

            <div style={{width: '45%', margin: '0 0.25rem', }}>
              <Panel name='Battle'>
                <BattleStage pokemon={pokemon} isFainted={false} moveTimes={moveTimes} />
              </Panel>
              <OptionsPanel />
              <Panel name='Console'>
              </Panel>
            </div>

            <div style={{height: '100%', width: '20%', display: 'flex', flexWrap: 'wrap'}}>
              <Map />
              <PokedexPanel />
              <AchivementsPanel />
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
