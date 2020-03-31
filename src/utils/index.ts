export * from './captureFormula';
export * from './expFormula';
export * from './expRequiredFormula';
export * from './generateRewards';
export * from './getContrastColor';
export * from './getPokemonIcon';
export * from './listOfItems';
export * from './listOfPokemon';
export * from './Types';
export * from './typeToColor';
export * from './ZIndexMap';
export * from './listOfMoves';
export * from './getSpecies';
export * from './colors';
export * from './getGenderIcon';
export * from './dateAsRng';
export * from './speciesToNumber';
export * from './determineShiny';
export * from './positionalSort';

export const calculateBaseDPS = (level: number, spAtk: any, atk: any) => {
  return ((spAtk + atk) * level) / 100;
};

export const choose = <T = any>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const calculateHP = (level: number, hpStat?: number) => {
  if (!hpStat) return 0;
  //return Math.floor((( ( 2 * hpStat + 31 + (252 / 4) * level) / 100)) + level + 10);
  let res = 2 * hpStat;
  res = res + 31 + 0;
  res = res * level;
  res = res / 100;
  res = res + level;
  res = res + 10;
  return Math.floor(res);
};
  
export const calculateOtherStat = (level: number, stat?: number) => {
  if (!stat) return 0;
  const evs = (252 / 4);
  return Math.floor((2 * stat + 31 + 0) * level / 100 + 5 * 1);
};

export const calculateStatDifference = (firstLevel: number, secondLevel: number, stat?: number) => {
  const statA = calculateOtherStat(firstLevel, stat);
  const statB = calculateOtherStat(secondLevel, stat);
  return statB - statA;
}