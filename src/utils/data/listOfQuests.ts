import {Quest} from 'utils/models';
import { getItem } from 'utils/listOfRoutes';
import { createPokemon } from 'utils/createPokemon';
import { getStyleItem } from './listOfStyleItems';

export const listOfQuests: Quest[] = [
    {
        id: 1,
        
        title: `Take to the Skies`,
        description: `Catch 3 Pidgey`,
        rank: 'F',
        accepted: true,
        rewards: [
            {
                reward: getItem('Aerial Ace'),
                rewardQuantity: 1,
                rewardType: 'item',
            },
            {
                reward: createPokemon({species: 'Abra', level: 5}),
                rewardQuantity: 1,
                rewardType: 'pokemon',
            }
        ],
        requester: `Birdkeeper Toby`
    },
    {
        id: 3,
        
        title: `Slowpoke Showdown`,
        description: `Have a staring contest with Slowpoke in Pewter City`,
        rank: 'D',
        accepted: false,
        rewards: [
            {
                reward: {amount: 40000},
                rewardQuantity: 1,
                rewardType: 'money',
            },
            {
                reward: getItem('Great Ball'),
                rewardType: 'item',
                rewardQuantity: 10,
            },
            {
                reward: getItem('Psychic'),
                rewardType: 'item',
                rewardQuantity: 1,
            },
            {
                reward: createPokemon({species: 'Slowpoke', level: 70}),
                rewardQuantity: 1,
                rewardType: 'pokemon',
            },
            {
                reward: getStyleItem('White Scarf'),
                rewardQuantity: 1,
                rewardType: 'styleItem',
            }
        ],
        requester: `Birdkeeper Toby`
    },
    {
        id: 2,
        
        title: `Mewtwo Strikes Back!`,
        description: `Raid Mewtwo's lair & defeat Mewtwo`,
        rank: 'S+',
        accepted: false,
        rewards: [
            {
                reward: {amount: 40000},
                rewardQuantity: 1,
                rewardType: 'money',
            },
            {
                reward: createPokemon({species: 'Mewtwo', level: 70}),
                rewardQuantity: 1,
                rewardType: 'pokemon',
            }
        ],
        requester: `Birdkeeper Toby`
    }
]