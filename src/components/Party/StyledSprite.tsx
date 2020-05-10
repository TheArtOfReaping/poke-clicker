import React from 'react';
import { getPokemonIcon, PartyPokemon } from 'utils';

export interface StyledSpriteProps {
    member: PartyPokemon;
    extraStyles?: React.CSSProperties;
}

export const createCSSFilter = (canEvolve?: boolean, isFainted?: boolean, superShiny?: boolean, superShinySeed?: number) => {
    const hue = `hue-rotate(${superShinySeed || 0}deg)`;
    const grayscale = `grayscale(100%)`;
    const glow = 'drop-shadow(0 0 1px gold)';
    return {
      filter: `${canEvolve ? glow : ''} ${isFainted ? grayscale : ''} ${superShiny ? hue : ''}`,
    }
  }

export function StyledSprite({member, extraStyles}:StyledSpriteProps) {
    const canEvolve = false;
    const isEgg = member?.isEgg;
    const isFainted = member?.currentHp === 0 && !isEgg;
    if (isEgg) {
      return <img
        style={{
          height: '16px',
          marginLeft: '2rem',
          marginRight: '4px',
          imageRendering: 'pixelated',
        }}
        src={'./images/ui/egg.png'}
      />
    }
    return <img 
        style={{ height: '64px', imageRendering: 'pixelated', ...createCSSFilter(canEvolve, isFainted, member?.superShiny, member?.superShinySeed), ...extraStyles }}
        alt={member.species}
        src={getPokemonIcon(member.species, member.shiny)}
    />
}