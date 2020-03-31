import { PartyPokemon } from "App"

export const positionalSort = (a: PartyPokemon, b: PartyPokemon) => {
    return (a?.position || 100) - (b?.position || 0);
}