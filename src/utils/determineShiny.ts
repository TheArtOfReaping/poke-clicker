import { PartyPokemon } from "App";
import { clamp } from "ramda";

const SHINY_RATE = 4096;

function getRandom<A>(weights: number[], values: A[]) {
    let num = Math.random();
    let s = 0;
    let lastIndex = weights.length - 1;

    for (let i = 0; i < lastIndex; ++i) {
        s += weights[i];
        if (num < s) {
            return values[i];
        }
    }

    return values[lastIndex];
};


export const determineShiny = function determineShiny(): Pick<PartyPokemon, 'shiny' | 'superShiny' | 'superShinySeed'> {
    
    const superShiny = getRandom([(SHINY_RATE - 1)/SHINY_RATE, 1/SHINY_RATE], [false, true]);
    const shiny = superShiny ? true : getRandom([(SHINY_RATE * 4 - 1)/(SHINY_RATE * 4), 1/(SHINY_RATE * 4)], [false, true]);
    const superShinySeed = clamp(30, 360, (Math.random() * 360));


    return {
        shiny,
        superShiny,
        superShinySeed,
    }
}