import { PartyPokemon } from 'utils';
import { createDiffieHellman } from 'crypto';
import { v4 as createId } from 'uuid';


export const createPokemon = function createPokemon(partialPokemon: Partial<PartyPokemon>): PartyPokemon {
    if (!partialPokemon.species) {
        throw new Error('Species is required.');
    }
    return {
        id: createId(),
        position: 7,
        species: partialPokemon.species,
        nickname: partialPokemon.species,
        level: 1,
        currentHp: 1,
        ...partialPokemon,
    };
};