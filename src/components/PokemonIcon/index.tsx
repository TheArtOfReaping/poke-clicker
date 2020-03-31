import React from 'react';
import { getPokemonIcon } from 'utils';
import { PartyPokemon } from 'App';

export interface PokemonIconProps {
    pokemon: PartyPokemon;
}
export function PokemonIcon({pokemon}: PokemonIconProps) {
    return <img src={getPokemonIcon(pokemon.species, pokemon.shiny)} />
}