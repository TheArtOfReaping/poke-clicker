import { Pokemon } from "utils";
import { Item, listOfItems } from "./listOfItems";
import { listOfRoutes } from "./listOfRoutes";
import { clamp } from "ramda";

export type RouteItem = {weight: number, item?: Item};

export interface GenerateRewardsArgs {
    speciesFought?: Pokemon;
    speciesLevel?: number;
    pokemonLevel?: number;
    routeItems?: RouteItem[];

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
    pokemonLevel,
}: GenerateRewardsArgs) {
    const rewardsAmount = determineRewardsAmount(speciesLevel, pokemonLevel)
    let rewards: (RouteItem | undefined)[] = [];

    console.log('log', rewardsAmount);

    for (let i = 0; i < rewardsAmount; i++) {
        const routeItem = pickRandomWeighted(routeItems);
        rewards.push(routeItem);
        const foundItem = listOfItems.find(i => i.name === routeItem?.item?.name)
        if (foundItem != null) {
            foundItem.quantity += 1;
        }
    }

    return rewards;
}