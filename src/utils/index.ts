import { clamp } from 'ramda';
import { Nullable } from './Nullable';

export * from './models';
export * from './data';

export * from './calculateHp';
export * from './calculateOtherStat';
export * from './calculateStatDifference';
export * from './captureFormula';
export * from './colors';
export * from './dateAsRng';
export * from './determineShiny';
export * from './expFormula';
export * from './expRequiredFormula';
export * from './generateRewards';
export * from './getContrastColor';
export * from './getGenderIcon';
export * from './getPokemonIcon';
export * from './getSpecies';
export * from './listOfItems';
export * from './listOfPokemon';
export * from './Nullable';
export * from './positionalSort';
export * from './speciesToNumber';
export * from './Types';
export * from './typeToColor';
export * from './ZIndexMap';
export * from './moneyFormula';
export * from './listOfMoves';
export * from './Region';

export const calculateBaseDPS = (level: number, spAtk?: number, atk?: number, speed?: number) => {
  if (spAtk == null || atk == null || speed == null) {
    return 10;
  }
  return ((spAtk + atk + (speed / 4)) * level) / 100;
};

export const calculateBaseDFS = (level: number, spDef?: number, def?: number) => {
  if (spDef == null || def == null) {
    return 10;
  }
  return ((spDef + def) * level) / 100;
}

export type Modifiers = {};
export type DetermineDamageArgs = {calculateBaseDPS: number, calculateBaseDFS: number, modifiers?: Nullable<Modifiers>};
export const determineDamage = ({calculateBaseDPS, calculateBaseDFS, modifiers}: DetermineDamageArgs) => {
  return clamp(1, Infinity, (calculateBaseDPS - (calculateBaseDFS / 20)));
}

export const choose = <T = unknown>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];


  