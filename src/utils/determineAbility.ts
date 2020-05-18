import { SpeciesName } from './SpeciesName';
import { choose } from 'utils';

export enum Ability {
    Overgrow = 'Overgrow',
    Blaze = 'Blaze',
    Torrent = 'Torrent',
    SolarPower = 'Solar Power',
    RainDish = 'Rain Dish',
    Chlorophyll = 'Chlorophyll',
}

const getAbility = (hidden: boolean) => (regularAbilities: Ability[], hiddenAbility: Ability | null = null) => {
    if (hidden) {
        if (!hiddenAbility) {
            return choose(regularAbilities);
        }
        return hiddenAbility;
    } else {
        return choose(regularAbilities);
    }
};

export const determineAbility = function determineAbility (species: SpeciesName, hidden = false) {
    const ab = getAbility(hidden);
    switch (species) {
    case 'Bulbasaur':
        return ab([Ability.Overgrow]);
    case 'Charmander':
        return ab([Ability.Blaze]);
    case 'Squirtle':
        return ab([Ability.Torrent]);
    default:
        return undefined;
    }
};