import React from 'react';
import { getPokemonIcon, PartyPokemon } from 'utils';

export interface PokemonIconProps {
    pokemon: Partial<PartyPokemon>;
    imgProps?: any;
}
export function PokemonIcon({pokemon, imgProps}: PokemonIconProps) {
    return <img src={getPokemonIcon(pokemon.species || 'Ditto', pokemon.shiny)} {...imgProps} />
}