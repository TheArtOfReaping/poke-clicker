import { Pokemon } from "App";
import { Item } from "./listOfItems";
import { listOfRoutes } from "./listOfRoutes";

export interface GenerateRewardsArgs {
    speciesFought?: Pokemon;
    speciesLevel?: number;
    routeItems?: {weight: number, item?: Item}[];

}

export function pickRandomWeighted(items: GenerateRewardsArgs['routeItems']) {
    let pickedItem = null;
    let sumWeight = items?.reduce((prev, curr) => prev + curr.weight, 0) || 1;

    let rand = Math.random() * sumWeight;
    items?.forEach((item, idx) => {
        rand -= item.weight;
        console.log(idx, rand, item);
        if (rand < 0) {
            pickedItem = item;
        }
    })
    return pickedItem;
}

export function generateRewards({
    routeItems,
}: GenerateRewardsArgs) {

    let rewards = 4;

    return [0,0,0,0].map(_ => pickRandomWeighted(routeItems));
}