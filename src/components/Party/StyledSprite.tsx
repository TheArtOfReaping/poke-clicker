import React from 'react';
import { getPokemonIcon } from 'utils';
import { PartyPokemon } from 'App';

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
    const isFainted = member?.currentHp === 0;
    return <img 
        style={{ height: '64px', imageRendering: 'pixelated', ...createCSSFilter(canEvolve, isFainted, member?.superShiny, member?.superShinySeed), ...extraStyles }}
        alt={member.species}
        src={getPokemonIcon(member.species, member.shiny)}
    />
}