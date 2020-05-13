import { Item } from "utils/listOfItems";
import { PartyPokemon } from "./PartyPokemon";
import { StyleItem } from "./Trainer";

export interface Money {
    amount: number;
}

export interface Reward<K> {
    reward: K;
    rewardType: 'item' | 'styleItem' | 'pokemon' | 'money';
    rewardQuantity: number;
}

export type Rewards = Reward<Item | StyleItem | PartyPokemon | Money | undefined>[];

export interface Quest {
    id: number;
    rank?: 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'S+' | 'S++' | 'X';
    occurrences?: number;
    maxOccurrences?: number;
    title?: string;
    description?: string;
    accepted?: boolean;
    rewards?: Rewards;
    requester?: string;
}