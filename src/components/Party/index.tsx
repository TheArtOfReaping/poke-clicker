import React, { useState } from 'react';
import { HPBar, ExpBar, Panel } from '../../components';
import { Button } from '../Button';
import { classes, stylesheet } from 'typestyle';
import { getPokemonIcon, typeToColor, Types, moves, getContrastColor, calculateHP, calculateOtherStat, getSpecies, dexEntries, StatName, calculateBaseDPS, getGenderIcon, typeToStyle, Pokemon, speciesToNumber } from 'utils';
import { PanelProps } from 'components/Panel';
import { colors } from 'utils/colors';
import { PartyPokemon } from 'App';
import { color } from 'csx';
import { HealBar } from 'components/ExpBar/HealBar';

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
  MoveSet: {
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    borderRadius: '0.25rem',
    $nest: {
      '& div': {
        padding: '2px 10px',
      },
    },
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

  const onClick = (id: number) => (e: any) => {
    if (activeId === id) {
      setActiveId(-1);
    } else {
      setActiveId(id);
    }
  };

  const totalHealth = party.reduce((prev, curr) => prev + curr.currentHp, 0);

  return (
    <Panel name="Party" {...panelProps}>
      <HealBar currentHealth={20} totalHealth={totalHealth} baseColor={colors.pink.get()} />
      {party.map((member, idx) => {
        const isFainted = idx === 3;
        const canEvolve = idx === 4;

        const id = speciesToNumber(member?.species) || 1;
        const species = getSpecies(speciesToNumber(member?.species)).then((res) => res);

        return (
          <>
            <div
              onClick={onClick(idx)}
              className={classes(
                styles.PokemonEntry,
                activeId === id && styles.PokemonEntryHighlighted,
                isFainted && styles.PokemonEntryFainted
              )}
            >
              <img
                className={classes(
                  isFainted && styles.GrayScale,
                  canEvolve && styles.CanEvolve
                )}
                style={{ height: '64px', marginTop: '-16px', imageRendering: 'pixelated' }}
                alt={member.species}
                src={getPokemonIcon(member.species, member.shiny)}
              />
              <div className="fs-small">
                {member.nickname} lv. {member.level}
              </div>
              <div
                style={{
                  clipPath: `polygon(3% 0%, 100% 0%, 100% 100%, 5% 100%, 0% 50%)`,
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.5rem',
                  marginLeft: 'auto',
                }}
              >
                <HPBar width="10rem" currentHp={calculateHP(member.level, getStat(id, 'hp'))} totalHp={calculateHP(member.level, getStat(member.id, 'hp'))} />
                <ExpBar totalExpNeeded={20} currentExpProgress={1} />
              </div>
            </div>
            {activeId === id && (
              <div className={classes(styles.ExpandedView, member?.shiny && styles.ExpandedViewShiny)}>
                <div className={styles.PokemonData}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img
                      style={{
                        height: '128px',
                        marginTop: '-32px',
                        imageRendering: 'pixelated',
                      }}
                      alt={member.species}
                      src={getPokemonIcon(member.species, member.shiny)}
                    />
                    <span style={{fontSize: '1.1rem'}}>{member.nickname}</span>
                    <span>{member.species} {getGenderIcon(member.gender)} lv.{member.level}</span><span></span>
                    <div style={{display: 'flex', margin: '0 auto'}}>{getTypes(id).map(type => <div style={{...typeToStyle(capitalize(type.type.name) as Types), width: '3rem'}}>{capitalize(type.type.name)}</div>)}</div>
                  </div>
                  <div className={styles.PokemonStats}>
                    <div className={styles.PokemonStat}>
                      <span>HP</span>
                      <span>{calculateHP(member.level, getStat(id, 'hp'))}</span>
                    </div>
                    {
                      (['attack', 'defense', 'special-attack', 'special-defense', 'speed'] as StatName[]).map((stat: StatName) => {
                        return <div className={styles.PokemonStat}>
                      <span>{getStatShorthand(stat).toUpperCase()}</span>
                        <span title={getStat(id, stat)?.toString()}>{calculateOtherStat(member.level, getStat(id, stat))}</span>
                      </div>
                      })
                    }
                  </div>
                  <div>
                    <div className={styles.DPSBadge}>DPS: {calculateBaseDPS(member.level, getStat(id, 'special-attack'), getStat(id, 'attack'))}</div>
                    <div className={styles.DPSBadge}>
                      Ability: {member?.ability || 'None'}
                    </div>
                    <div className={styles.DPSBadge}>
                      Item: {member?.item || 'None'}
                    </div>
                    <div className={styles.DPSBadge}>
                     ❤❤❤
                    </div>
                  </div>
                </div>
                <div className={styles.MoveSet}>
                  {member?.moves?.map((moveId: number) => {
                    const move = moves.find((m) => m.id === moveId);
                    return (
                      move && (
                        <div
                          style={typeToStyle(move.type)}
                        >
                          {move.name}
                        </div>
                      )
                    );
                  })}
                </div>
                <div className={styles.PokemonOptions}>
                  {party.length > 1 && (
                    <Button className={styles.PokemonOptionsButton} options={{ smallFont: true }} value="Release" />
                  )}
                  <Button
                    className={styles.PokemonOptionsButton}
                    options={{ smallFont: true }}
                    value="Change Nickname"
                  />
                  <Button className={styles.PokemonOptionsButton} options={{ smallFont: true }} value="Mark" />
                  <Button className={styles.PokemonOptionsButton} options={{ smallFont: true }} value="Evolve" />
                </div>
              </div>
            )}
          </>
        );
      })}

      <Button
        options={{ image: './images/ui/storage.png' }}
        value="Access Storage"
      />
    </Panel>
  );
}
