import {Region} from 'utils';

export enum StyleCategory {
    Headgear = 'headgear',
    Hair = 'hair',
    Eyewear = 'eyewear',
    Neckwear = 'neckwear',
    Shirt = 'shirt',
    Jacket = 'jacket',
    Bottoms = 'bottoms',
    Footwear = 'footwear',
    Bag = 'bag',
    Background = 'background',
  }
  
  export type StyleItem<T = any> = {
    name: string,
    price?: number,
    category?: T,
    img: string,
    quantity: number;
    id: number;
  }
  
  export type ClothingComposite = {
    headgear?: StyleItem<StyleCategory.Headgear>;
    hair?: StyleItem<StyleCategory.Hair>;
    eyewear?: StyleItem<StyleCategory.Eyewear>;
    neckwear?: StyleItem<StyleCategory.Neckwear>;
    shirt?: StyleItem<StyleCategory.Shirt>;
    jacket?: StyleItem<StyleCategory.Jacket>;
    bottoms?: StyleItem<StyleCategory.Bottoms>;
    footwear?: StyleItem<StyleCategory.Footwear>;
    bag?: StyleItem<StyleCategory.Bag>;
    skinColor?: SkinColor;
    background?: StyleItem<StyleCategory.Background>;
  };

  export enum SkinColor {
      Peach = '#edbcab',
      Brown = '#453125',
      Black = '#1f1712',
      Olive = '#f0e7c2',
  }
  
  export interface Trainer {
    name?: Trainer;
    clothing?: ClothingComposite;
    startDate?: number;
    regionsVisited?: Set<Region>;
    score?: number;
    money?: number;
    bp?: number;
  }