import { listOfPokemon } from 'utils';
import { SpeciesName } from './SpeciesName';

export const formatSpeciesName = (species: string | null) => {
  if (species == null) return 'unknown';
  if (species === 'Nidoran♀') return 'nidoran-f';
  if (species === 'Nidoran♂') return 'nidoran-m';
  if (species === 'Mr. Mime') return 'mr-mime';
  if (species === 'Mr. Rime') return 'mr-rime';
  if (species.startsWith('Farfetch')) return 'farfetchd';
  if (species.startsWith('Sirfetch')) return 'sirfetchd';
  if (species === 'Mime Jr.') return 'mime-jr';
  if (species === 'Flabébé') return 'flabebe';
  if (species === 'Type: Null') return 'type-null';
  if (species.startsWith('Tapu'))
    return species.toLowerCase().replace(/\s/, '-');
  if (listOfPokemon.indexOf(species as SpeciesName) < 0) return 'unknown';
  return species.toLowerCase();
};

export const getPokemonIcon = (poke: string, shiny?: boolean) => {
  try {
    const img = require(`../../node_modules/pokesprite-images/pokemon-gen8/${shiny ? 'shiny' : 'regular'}/${formatSpeciesName(
      poke
    )}.png`);
    return img;
  } catch (e) {
    console.error(e, 'Image specified likely does not exist.');
  }
};
