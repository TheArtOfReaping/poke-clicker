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
  }
  
  export type StyleItem<T = any> = {
    name: string,
    price?: number,
    category?: T,
    img: string,
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
    skinColor?: SkinColor;
  };

  export enum SkinColor {
      Peach,
      Brown,
      Black,
      Olive,
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