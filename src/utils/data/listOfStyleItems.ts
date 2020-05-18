import {StyleItem} from 'utils';
import { StyleCategory } from 'utils/models';

export const listOfStyleItems: StyleItem[] = [
    {
        name: 'Red Hat',
        category: StyleCategory.Headgear,
        price: 1000,
        img: 'red-hat',
        quantity: 1,
        id: 0,
    },
    {
        name: 'Pink Hat',
        category: StyleCategory.Headgear,
        price: 2000,
        img: 'pink-hat',
        quantity: 1,
        id: 1,
    },
    {
        name: 'Blue Hair',
        category: StyleCategory.Hair,
        price: 10,
        img: 'blue-hair',
        quantity: 1,
        id: 2,
    },
    {
        name: 'Red Hair',
        category: StyleCategory.Hair,
        price: 10,
        img: 'red-hair',
        quantity: 1,
        id: 3,
    },
    {
        name: 'Black Boots',
        category: StyleCategory.Footwear,
        price: 10,
        img: 'black-boots',
        quantity: 1,
        id: 4,
    },
    {
        name: 'Mint Boots',
        category: StyleCategory.Footwear,
        price: 1000,
        img: 'mint-boots',
        quantity: 0,
        id: 5,
    },
    {
        name: 'Black Coat',
        category: StyleCategory.Jacket,
        price: 1,
        img: 'black-coat',
        quantity: 1,
        id: 6,
    },
    {
        name: 'White Scarf',
        category: StyleCategory.Neckwear,
        price: 1000,
        img: 'white-scarf',
        quantity: 5,
        id: 7,
    },
    {
        name: 'Classic Dawn Hat',
        category: StyleCategory.Headgear,
        price: 4000,
        img: 'classic-dawn-hat',
        quantity: 1,
        id: 8,
    },
    {
        name: 'Dark Dawn Hat',
        category: StyleCategory.Headgear,
        price: 4000,
        img: 'dark-dawn-hat',
        quantity: 0,
        id: 9,
    },
    {
        name: '10 Gallon Hat',
        category: StyleCategory.Headgear,
        price: 4000,
        img: 'ten-gallon-hat',
        quantity: 1,
        id: 10,
    },
    {
        name: 'Sombrero',
        category: StyleCategory.Headgear,
        price: 10000,
        img: 'sombrero',
        quantity: 1,
        id: 11,
    },
    {
        name: 'Dimmahat',
        category: StyleCategory.Headgear,
        price: 200000,
        img: 'dimma-hat',
        quantity: 1,
        id: 12,
    },
    {
        name: 'White Cloth',
        category: StyleCategory.Neckwear,
        price: 20000,
        img: 'white-cloth',
        quantity: 1,
        id: 13,
    },
    {
        name: 'Black Rim Glasses',
        category: StyleCategory.Eyewear,
        price: 20000,
        img: 'black-rim-glasses-2',
        quantity: 1,
        id: 14,
    },
    {
        name: 'Roughhewn Background',
        category: StyleCategory.Background,
        price: 1000,
        img: 'roughhewn-background',
        quantity: 1,
        id: 15,
    },
    {
        name: 'Deep Sea Background',
        category: StyleCategory.Background,
        price: 50000,
        img: 'deep-sea-background',
        quantity: 1,
        id: 16,
    }

];

export const getStyleItem = (name: StyleItem['name']) => listOfStyleItems.find(n => n.name === name);
export const getCategoryStyleItems = (cat: StyleCategory, list: typeof listOfStyleItems) => list.filter(item => item.category === cat);