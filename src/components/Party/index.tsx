import React, { useState } from 'react';
import { HPBar, ExpBar, Panel } from '../../components';
import { Button } from '../Button';
import { classes, stylesheet } from 'typestyle';
import { getPokemonIcon, typeToColor, Types } from 'utils';
import { moves } from '../../App';

export const styles = stylesheet({
  PokemonEntry: {
    background: '#444',
    width: '100%',
    display: 'flex',
    margin: '2px',
    borderRadius: '.5rem',
    position: 'relative',
    height: '48px',
    alignItems: 'center',
    overflow: 'hidden',
    transition: '200ms all',
    cursor: 'pointer',
    border: '1px solid transparent',
    $nest: {
      '&:hover': {
        background: '#555',
        transition: '200ms all',
        outline: '1px solid #fff',
      },
    },
  },
  PokemonEntryHighlighted: {
    background: '#555',
    boxShadow: '0 0 .25rem rgba(0,0,0,0.33)',
  },
  PokemonEntryFainted: {
    background: 'darkred !important',
  },
  ExpandedView: {
    background: '#333',
    borderRadius: '0 0 8px 8px',
    margin: '.25rem .25rem',
    marginTop: '-0.25rem',
    paddingTop: '0.5rem',
  },

  MoveSet: {
    display: 'flex',
    margin: '0 auto',
    justifyContent: 'center',
    $nest: {
      '& div': {
        margin: '2px',
        border: '1px solid #555',
        padding: '2px',
      },
    },
  },
  PokemonOptions: {
    display: 'flex',
    justifyContent: 'center',
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
    filter: 'drop-shadow(0 0 4px gold)',
  },
  DPSBadge: {
    margin: '4px',
    padding: '4px 8px',
    background: '#222',
    borderRadius: '.25rem',
  },
});

export interface PartyProps {
  party: any[];
}

export function Party({ party }: PartyProps) {
  const [activeId, setActiveId] = useState(-1);

  const onClick = (id: number) => (e: any) => {
    if (activeId === id) {
      setActiveId(-1);
    } else {
      setActiveId(id);
    }
  };

  return (
    <Panel name="Party">
      {party.map((member, id) => {
        const isFainted = id === 3;
        const canEvolve = id === 4;

        //const species = getSpecies(member.id);
        return (
          <>
            <div
              onClick={onClick(id)}
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
                style={{ height: '64px', marginTop: '-16px' }}
                alt={member.species}
                src={getPokemonIcon(member.species)}
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
                <HPBar width="10rem" currentHp={124} totalHp={250} />
                <ExpBar totalExpNeeded={20} currentExpProgress={1} />
              </div>
            </div>
            {activeId === id && (
              <div className={styles.ExpandedView}>
                <div className={styles.PokemonData}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img
                      style={{
                        height: '128px',
                        marginTop: '-32px',
                        imageRendering: 'pixelated',
                      }}
                      alt="bulbasaur"
                      src={getPokemonIcon(member.species)}
                    />
                    <span>{member.species}</span>
                  </div>
                  <div className={styles.PokemonStats}>
                    <div className={styles.PokemonStat}>
                      <span>HP</span>
                      <span>30</span>
                    </div>
                    <div className={styles.PokemonStat}>
                      <span>Atk</span>
                      <span>30</span>
                    </div>
                    <div className={styles.PokemonStat}>
                      <span>Def</span>
                      <span>30</span>
                    </div>
                    <div className={styles.PokemonStat}>
                      <span>SAtk</span>
                      <span>30</span>
                    </div>
                    <div className={styles.PokemonStat}>
                      <span>SDef</span>
                      <span>30</span>
                    </div>
                    <div className={styles.PokemonStat}>
                      <span>Spe</span>
                      <span>30</span>
                    </div>
                  </div>
                  <div>
                    <div className={styles.DPSBadge}>DPS: 10</div>
                    <div className={styles.DPSBadge}>
                      Ability: {member?.ability || 'None'}
                    </div>
                    <div className={styles.DPSBadge}>
                      Item: {member?.item || 'None'}
                    </div>
                  </div>
                </div>
                <div className={styles.MoveSet}>
                  {member.moves.map((moveId: number) => {
                    const move = moves.find((m) => m.id === moveId);
                    return (
                      move && (
                        <div
                          style={{
                            background: typeToColor(move.type) || Types.Normal,
                          }}
                        >
                          {move.name}
                        </div>
                      )
                    );
                  })}
                </div>
                <div className={styles.PokemonOptions}>
                  {party.length > 1 && (
                    <Button options={{ smallFont: true }} value="Release" />
                  )}
                  <Button
                    options={{ smallFont: true }}
                    value="Change Nickname"
                  />
                  <Button options={{ smallFont: true }} value="Mark" />
                  <Button options={{ smallFont: true }} value="Evolve" />
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
