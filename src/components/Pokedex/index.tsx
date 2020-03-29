import React from 'react';
import { Panel, PanelProps } from 'components/Panel';
import { listOfPokemon, getPokemonIcon, colors } from 'utils';
import { stylesheet, classes } from 'typestyle';

export const styles = stylesheet({
  PokedexIcon: {
    display: 'inline-block',
    padding: '2px',
    height: '32px',
    width: '32px',
    //border: '1px solid rgba(255, 255, 255, 0.3)',
    background: colors.primary.shade2,
    margin: '2px',
    $nest: {
      '&:hover': {
        background: colors.primary.shade1,
        transition: '200ms all',
        cursor: 'pointer',
      },
    },
  },
  PokedexIconImage: {
    height: '100%',
    filter: 'grayscale(100%)',
    imageRendering: 'pixelated',
  },
  Owned: {
    filter: 'grayscale(0)',
  },
  InnerPanel: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  Scrollbar: {
    $nest: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
});

export interface PokedexProps {
  seen?: number;
  caught?: number;
  total?: number;
  panelProps?: Partial<PanelProps>;
}

const dex: any = {
  Bulbasaur: { seen: true, caught: true },
  Pidgey: { seen: true, caught: true },
  Rattata: { seen: true, caught: true },
  Pidgeot: { seen: true, caught: false },
};

//`https://github.com/msikma/pokesprite/blob/master/pokemon-gen8/regular/${poke.toLowerCase()}.png?raw=true`
export function Pokedex({ seen, caught, total, panelProps }: PokedexProps) {
  return (
    <Panel name="Pokédex" {...panelProps}>
      <div className={classes(styles.InnerPanel, styles.Scrollbar)}>
        <div>330 Seen, 220 Caught</div>
        {listOfPokemon.map((poke) => (
          <div className={styles.PokedexIcon}>
            <img
              data-caught={dex[poke]?.caught}
              className={classes(
                styles.PokedexIconImage,
                dex[poke]?.caught && styles.Owned
              )}
              alt={poke}
              src={getPokemonIcon(poke)}
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}
