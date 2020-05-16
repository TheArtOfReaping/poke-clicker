import React, { useState } from 'react';
import { HPBar, ExpBar, Panel } from '../../components';
import { Button } from '../Button';
import { classes, stylesheet } from 'typestyle';
import { getPokemonIcon, typeToColor, Types, moves, getContrastColor, calculateHP, calculateOtherStat, getSpecies, dexEntries, StatName, calculateBaseDPS, getGenderIcon, typeToStyle, Pokemon, speciesToNumber, Stat } from 'utils';
import { PanelProps } from 'components/Panel';
import { colors } from 'utils/colors';
import { PartyPokemon } from 'utils';
import { color } from 'csx';
import { HealBar } from 'components/ExpBar/HealBar';
import { useDispatch, useSelector } from 'react-redux';
import { editPokemon, openDialog } from 'actions';
import { State } from 'state';
import { take } from 'ramda';
import { positionalSort } from 'utils/positionalSort';
import { DialogKind } from 'components/Dialog';
import { StyledSprite } from './StyledSprite';
import { PokemonView } from 'components/PokemonView';

export const styles = stylesheet({
  PokemonEntry: {
    //background: '#444',
    background: colors.primary.get(),
    width: '100%',
    display: 'flex',
    margin: '2px',
    //borderRadius: '.5rem',
    position: 'relative',
    height: '48px',
    alignItems: 'center',
    overflow: 'hidden',
    transition: '200ms all',
    cursor: 'pointer',
    border: '1px solid transparent',
    $nest: {
      '&:hover': {
        //background: '#555',
        transition: '200ms all',
        outline: '1px solid #fff',
      },
    },
  },
  PokemonEntryHighlighted: {
    //background: '#555',
    //boxShadow: '0 0 .25rem rgba(0,0,0,0.33)',
  },
  PokemonEntryFainted: {
    background: 'darkred !important',
  },
  ExpandedView: {
    //background: '#333',
    backgroundColor: colors.primary.shade1,
    borderRadius: '0 0 8px 8px',
    margin: '.25rem .25rem',
    marginTop: '-0.25rem',
    paddingTop: '0.5rem',
  },
  ExpandedViewShiny: {
    // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23d9b2db' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  PokemonOptions: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '.25rem',
    background: colors.primary.tint1,
  },
  PokemonOptionsButton: {
    width: '25%',
    margin: 0,
    textAlign: 'center',
    borderColor: colors.primary.shade1,
    borderRadius: 0,
    background: colors.primary.shade2,
    display: 'flex',
    justifyContent: 'center',
    $nest: {
      '&:hover': {
        background: colors.secondary.shade1,
      }
    },
  },
  PokemonData: {
    display: 'flex',
    margin: '4px auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PokemonStats: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: '.25rem',
    textAlign: 'left',
    width: '5rem',
    margin: '0.25rem',
    $nest: {
      '& span': {
        display: 'inline-block',
      },
    },
  },
  PokemonStat: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.25rem',
    margin: '0',
    $nest: {
      '&:not(:first-of-type)': {
        borderTop: '1px solid #ccc',
      },
      '&:nth-of-type(1)': {
        background: '#83c75a',
      },
      '&:nth-of-type(2)': {
        background: '#c75a5a',
      },
      '&:nth-of-type(3)': {
        background: '#c7915a',
      },
      '&:nth-of-type(4)': {
        background: '#615ac7',
      },
      '&:nth-of-type(5)': {
        background: '#c75ac2',
      },
      '&:nth-of-type(6)': {
        background: '#9f5ac7',
      },
    },
  },
  EggStatus: {
    padding: '0.25rem',
    border: '1px solid',
    borderColor: colors.pink.get(),
    margin: '0.25rem',
    borderRadius: '0.25rem',
    width: '8rem',
  },
  GrayScale: {
    filter: 'grayscale(100%)',
  },
  CanEvolve: {
    filter: 'drop-shadow(0 0 1px gold)',
  },
  DPSBadge: {
    margin: '4px',
    padding: '4px 8px',
    border: '0.5px solid #fff',
    borderColor: colors.secondary.shade1,
    borderRadius: '.25rem',
  },
  BattleStatWrapper:  {
    clipPath: `polygon(3% 0%, 100% 0%, 100% 100%, 5% 100%, 0% 50%)`,
    background: 'rgba(0,0,0,0.3)',
    padding: '0.5rem',
    marginLeft: 'auto',
  },
  SpecialAttributeImg: {
    height: '0.5rem',
    width: '0.5rem',
    imageRendering: 'pixelated',
    display: 'inline-block',
  },
  MoveSet: {
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    borderRadius: '0.25rem',
  },
  Move: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderRadius: '.25rem',
    margin: '0 2px',
    //padding: '2px',
    width: '80px',
    fontSize: '0.8rem',
    height: '20px',
  },
  MoveName: {
    //borderRadius: '0.25rem',
    marginLeft: '4px',
  },
  MoveRank: {
    //borderRadius: '.25rem',
    padding: '4px 8px',

  },
  ItemIcon: {
    height: '16px',
    $nest: {
      '& img': {
        height: '16px',
        verticalAlign: 'bottom',
      }
    }
  },
  PokemonActive: {
    marginLeft: '0.5rem',
  }
});

export const getStatShorthand = (stat: StatName) => {
  switch (stat) {
    case 'attack':
      return 'atk';
    case 'defense':
      return 'def';
    case 'special-attack':
      return 'spatk';
    case 'special-defense':
      return 'spdef';
    case 'speed':
      return 'spe';
    default:
      return 'hp';
  }
}

export interface PartyProps {
  party: PartyPokemon[];
  panelProps?: Partial<PanelProps>;
}

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1, str.length);
export const getStat = (id: number, stat: StatName) => dexEntries[id]?.stats?.find(s => s.stat.name === stat)?.base_stat;

export const getTypes = (id: number) => dexEntries[id]?.types;
export const getSpeciesValue = (id: number, key: keyof Pokemon) => dexEntries[id]?.[key]



export function Party({ party, panelProps }: PartyProps) {
  const [activeId, setActiveId] = useState(-1);
  const healing = useSelector<State, number>(state => state.game.healing);
  const selectedPokemonId = useSelector<State, number>(state => state.selections.selectedPokemon);
  const isActiveInBattle = (idx: number) => idx === selectedPokemonId;
  const dispatch = useDispatch();

  const onClick = (id: number) => (e: any) => {
    if (activeId === id) {
      setActiveId(-1);
    } else {
      setActiveId(id);
    }
  };

  const totalHealth = party.reduce((prev, curr) => {
    return prev + calculateHP(curr.level, getStat(speciesToNumber(curr.species) || 0, 'hp'));
  }, 0);

  if (!party.length) {
    return <Panel name="Party" {...panelProps}>
      You have no Pokémon! Get one from the Professor's lab!
    </Panel>
  }  

  return (
    <Panel name="Party" {...panelProps}>
      <HealBar currentHealth={healing} totalHealth={totalHealth} baseColor={colors.pink.get()} />
      {take(6, party.sort(positionalSort)).map((member, idx) => {
        const isFainted = member?.currentHp === 0 && !member?.isEgg;
        const canEvolve = idx === 4;

        const id = speciesToNumber(member?.species) || 1;
        // const species = getSpecies(speciesToNumber(member?.species)).then((res) => res);

        const hp = calculateHP(member.level, getStat(id, 'hp'));

        if (hp === 0) {
          return null;
        }

        return (
          <React.Fragment key={idx}>
            <div
              onClick={onClick(idx)}
              className={classes(
                styles.PokemonEntry,
                activeId === id && styles.PokemonEntryHighlighted,
                isActiveInBattle(idx) && styles.PokemonActive,
                isFainted && styles.PokemonEntryFainted,
              )}
            >
              <StyledSprite member={member} extraStyles={{marginTop: '-16px',}} />
              {member?.favorite && <div style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: '52px',
                      color: colors.gold.get()
                    }}>★</div>}
              {member?.isEgg ? <div className="fs-small">
                Egg
              </div> : <div className="fs-small">
                {member.nickname} lv. {member.level}
              </div>}
              {!member?.isEgg && <div className={styles.BattleStatWrapper}>
                <HPBar width="10rem" currentHp={member.currentHp} totalHp={hp} />
                <ExpBar totalExpNeeded={member?.expRequired} currentExpProgress={member.currentExp} />
              </div>}
            </div>
            {activeId === idx && (
              <PokemonView pokemon={member} hp={hp} id={id} idx={idx} />
            )}
          </React.Fragment>
        );
      })}

      <Button
        options={{ image: './images/ui/storage.png' }}
        value="Access Storage"
        onClick={() => dispatch(openDialog({selectedDialog: DialogKind.Storage}))}
      />
    </Panel>
  );
}
