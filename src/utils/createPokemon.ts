import { PartyPokemon } from "utils";

export const createPokemon = function createPokemon(partialPokemon: Partial<PartyPokemon>) {
    return {
        
        ...partialPokemon,
    }
}