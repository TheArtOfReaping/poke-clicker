import React from 'react';
import { getPokemonIcon, PartyPokemon } from 'utils';

export interface PokemonIconProps {
    pokemon: Partial<PartyPokemon>;
    imgProps?: any;
    className?: string;
}
export function PokemonIcon({pokemon, imgProps, className}: PokemonIconProps) {
    return <img style={{imageRendering: 'pixelated'}} className={className} src={getPokemonIcon(pokemon.species || 'Ditto', pokemon.shiny)} {...imgProps} />
}