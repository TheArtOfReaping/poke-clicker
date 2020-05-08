import {StyleItem} from 'utils';
import { StyleCategory } from 'utils/models';

export const listOfStyleItems: StyleItem[] = [
    {
        name: 'Red Hat',
        category: StyleCategory.Headgear,
        price: 1000,
        img: 'red-hat',
    },
    {
        name: 'Pink Hat',
        category: StyleCategory.Headgear,
        price: 2000,
        img: 'pink-hat',
    },
    {
        name: 'Blue Hair',
        category: StyleCategory.Hair,
        price: 10,
        img: 'blue-hair',
    },
    {
        name: 'Red Hair',
        category: StyleCategory.Hair,
        price: 10,
        img: 'red-hair',
    },
    {
        name: 'Black Boots',
        category: StyleCategory.Footwear,
        price: 10,
        img: 'black-boots',
    },
    {
        name: 'Mint Boots',
        category: StyleCategory.Footwear,
        price: 10,
        img: 'mint-boots',
    },
    {
        name: 'Black Coat',
        category: StyleCategory.Jacket,
        price: 1,
        img: 'black-coat',
    }

]

export const getStyleItem = (name: StyleItem['name']) => listOfStyleItems.find(n => n.name === name);
export const getCategoryStyleItems = (cat: StyleCategory) => listOfStyleItems.filter(item => item.category === cat);