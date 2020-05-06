import React from 'react';
import { getPokemonIcon, PartyPokemon } from 'utils';

export interface PokemonIconProps {
    pokemon: PartyPokemon;
}
export function PokemonIcon({pokemon}: PokemonIconProps) {
    return <img src={getPokemonIcon(pokemon.species, pokemon.shiny)} />
}