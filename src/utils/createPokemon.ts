import { PartyPokemon } from "App";

export const createPokemon = function createPokemon(partialPokemon: Partial<PartyPokemon>) {
    return {
        
        ...partialPokemon,
    }
}