import { Pokemon } from "utils";
import { Item } from "./listOfItems";
import { clamp } from "ramda";
import { State } from "actions";

export type RouteItem = {weight: number, item?: Item};

export interface GenerateRewardsArgs {
    speciesFought?: Pokemon;
    speciesLevel?: number;
    pokemonLevel?: number;
    routeItems?: RouteItem[];
    inventory: State['inventory'];
    callback: (i?: Item) => void;
}

export function pickRandomWeighted(items: GenerateRewardsArgs['routeItems']) {
    let pickedItem: null | RouteItem = null;
    let sumWeight = items?.reduce((prev, curr) => prev + curr.weight, 0) || 1;

    let sum = 0;
    let r = Math.random() * sumWeight;

    if (!items) {
        return undefined;
    }
    
    for (let i = 0; i < items.length; i++) {
        sum += items[i].weight;
        if (r <= sum) {
            return items![i];
        }
    }
}

export const determineRewardsAmount = function determineRewardsAmount(speciesLevel: GenerateRewardsArgs['speciesLevel'], pokemonLevel: GenerateRewardsArgs['pokemonLevel']) {
    return speciesLevel && pokemonLevel ?
        clamp(0, 10, 
            Math.floor(speciesLevel - (pokemonLevel / 1.5) + (Math.random() * 2))) : 
        0;
}

export function generateRewards({
    routeItems,
    speciesLevel,
    inventory,
    pokemonLevel,
    callback,
}: GenerateRewardsArgs) {
    const rewardsAmount = determineRewardsAmount(speciesLevel, pokemonLevel)
    let rewards: (RouteItem | undefined)[] = [];


    for (let i = 0; i < rewardsAmount; i++) {
        const routeItem = pickRandomWeighted(routeItems);
        rewards.push(routeItem);
        const foundItem = inventory.find(i => i.name === routeItem?.item?.name)

        callback(foundItem);
        

        
    }

    return rewards;
}