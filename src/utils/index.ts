export * from './pokemonData';
export * from './Types';
export * from './typeToColor';
export * from './captureFormula';
export * from './expFormula';
export * from './expRequiredFormula';
export * from './listOfPokemon';
export * from './getPokemonIcon';
export * from './listOfItems';

export const calculateBaseDPS = (species: any, pokemon: any) => {
  // return ((species.stats.find(s => s.) + species.stats.spatk + species.stats.spd) * pokemon.level ) / 100;
  return 10;
};

export const choose = <T = any>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
