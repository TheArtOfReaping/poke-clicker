import React from 'react';
import { SpeciesName } from 'utils/SpeciesName';
import { stylesheet } from 'typestyle';
import { PokemonIcon } from 'components/PokemonIcon';
import { colors } from 'utils';

const styles = stylesheet({
    StarterSelect: {
        width: '8rem',
        height: '8rem',
        borderRadius: '50%',
        background: colors.primary.shade2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '200ms all',
        margin: '4px',
        $nest: {
            '&:hover': {
                background: colors.primary.shade3,
                transition: '200ms all',
            }
        }
    }
})

export function StarterSelection({species, onClick, shiny = false}:{species: SpeciesName, shiny?: boolean, onClick: (e?: any)=>void}) {
    return <div className={styles.StarterSelect} onClick={onClick}>
        <PokemonIcon imgProps={{style:{height: '96px', imageRendering: 'pixelated', marginTop: '-32px'}}} pokemon={{species, shiny}} />
    </div>
}