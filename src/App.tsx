import React, { useEffect, useState } from 'react';
import './App.css';
import { calculateBaseDPS, Types, expRequiredForumla, generateRewards, moves, getSpecies, choose, listOfPokemon, colors, getContrastColor, speciesToNumber } from 'utils';
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
} from 'components';
import { HPBar } from './components/HPBar';
//@ts-ignore
import { expFormula } from './utils/expFormula';
import { Party } from './components/Party';
import clamp from 'ramda/src/clamp';
import { listOfRoutes } from 'utils/listOfRoutes';
import { useSelector } from 'react-redux';
import { Enemy } from 'actions';
import { style, media } from 'typestyle';
import { State } from 'actions';
import { SpeciesName } from 'utils/SpeciesName';

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


export interface PartyPokemon {
  id: number;
  species: SpeciesName;
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
  gender: 'm',
  species: 'Pidgey',
};
const game = {
  totalCaptures: 0,
  totalKills: 0,
  totalFaints: 0,
  totalWhiteouts: 0,
};

export const generateNewEnemy = () => {
  return choose(listOfPokemon);
}


const getMove = (id?: number) => id == null ? {coolDown: 0} : moves.find(m => m.id === id);

function App() {
  const [enemyHp, setEnemeyHp] = useState(enemy.currentHp);
  const [enemySpecies, setEnemySpecies] = useState('Pidgey');
  const [pokemonExp, setPokemonExp] = useState(0);
  const [pokeId, setpokeId] = useState(0);
  const team = useSelector<State, PartyPokemon[]>((state: any) => state.team);
  const selectedRoute = useSelector<State, number>(state => state.selections.selectedRoute);
  const pokemon = team[pokeId];
  const [pokemonExpRequired, setPokemonExpRequired] = useState(
    expRequiredForumla(pokemon.level, 'Medium Slow')
  );
  const [pokemonLevel, setPokemonLevel] = useState(5);
  const coolDown = (id: number) => getMove(pokemon?.moves?.[id])?.coolDown || 0;

  const [moveTimes, setMoveTimes] = useState(
    [coolDown(0), coolDown(1), coolDown(2), coolDown(3)]
  );

  // const doIt = async () => {
  //   const dex = new Pokedex.Pokedex();
  //   const golduck = await dex.getPokemonByName('bulbasaur');
  // }

  // doIt();

  const species = getSpecies(speciesToNumber(pokemon.species)).then((res) => res);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnemeyHp(clamp(0, enemy.maxHP, enemyHp - 10));

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
        setEnemySpecies(choose(listOfRoutes[selectedRoute]?.pokemon?.map(p => p.species) || []))
        setpokeId(choose([0, 1, 2, 3, 4, 5]))
        generateRewards({routeItems: listOfRoutes[0].itemDrops})
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
              <Trainer panelProps={{height: '20%', visible: p.trainer}} />
              <Party party={team} panelProps={{height: '40%', visible: p.party}} />
              <Inventory panelProps={{height: '38%', visible: p.inventory}} />
            </div>

            <div style={{width: '41%', margin: '0 0.25rem', }}>
              <Panel name='Battle'>
                <BattleStage
                  enemy={{
                    id: 16,
                    level: 2,
                    currentHp: enemyHp,
                    maxHp: 20,
                    shiny: false,
                    species: enemySpecies,
                  }}
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
              <PokedexPanel panelProps={{height: '30%', visible: p.pokedex}} />
              <AchivementsPanel panelProps={{height: '28%', visible: p.achievements}} />
            </div>
            <div style={{height: '100%', width: '18%', display: 'flex', flexDirection: 'column'}}>
              <Panel name='Wiki'>

              </Panel>
              <Panel name='Stats'>

              </Panel>
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
