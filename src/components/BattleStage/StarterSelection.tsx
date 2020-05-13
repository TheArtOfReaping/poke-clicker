import React from 'react';
import { SpeciesName } from 'utils/SpeciesName';
import { stylesheet, classes, keyframes } from 'typestyle';
import { PokemonIcon } from 'components/PokemonIcon';
import { colors, ZIndexMap } from 'utils';
import { Background } from 'components/Shared';

const bounce = keyframes({
    '0%': {
      marginTop: '-32px',
    },
    '100%': {
      marginTop: '-34px',
    }
  })

const styles = stylesheet({
    StarterSelect: {
        width: '8rem',
        height: '8rem',
        borderRadius: '50%',
        background: colors.primary.shade2,
        position: 'relative',
        border: '2px solid transparent',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '200ms all',
        margin: '4px',
        $nest: {
            '&:hover': {
                //background: colors.primary.shade3,
                transition: '200ms all',
            }
        }
    },
    StarterSelectSelected: {
        borderColor: 'white',
    },
    Background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '8rem',
        height: '8rem',
        imageRendering: 'pixelated',
        opacity: 0.75,
    },
    StarterSprite: {
        height: '96px',
        imageRendering: 'pixelated',
        marginTop: '-32px',
        zIndex: ZIndexMap.StarterPokemonSprite
    },
    StarterSpriteAnim: {
        animationName: bounce,
        animationDuration: '500ms',
        animationIterationCount: 'infinite',
    }

})

const determineBackground = (species: SpeciesName) => {
    if (species === 'Bulbasaur') {
        return 'block-jungle';
    }
    if (species === 'Charmander') {
        return 'nightly-fire';
    }
    if (species === 'Squirtle') {
        return 'deep-sea';
    }
    return '';
}

export function StarterSelection({species, onClick, shiny = false, selected = false}:{species: SpeciesName, selected?: boolean, shiny?: boolean, onClick: (e?: any)=>void}) {
    return <div className={classes(styles.StarterSelect, selected && styles.StarterSelectSelected)} onClick={onClick}>
        <PokemonIcon className={classes(styles.StarterSprite, selected && styles.StarterSpriteAnim)} pokemon={{species, shiny}} />
        <Background background={determineBackground(species)} imgProps={{className: styles.Background}} />
    </div>
}