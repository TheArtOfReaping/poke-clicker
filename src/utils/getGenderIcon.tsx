import React from 'react';
import {PartyPokemon} from 'utils';
import {colors} from 'utils';

export const getGenderIcon = (gender: PartyPokemon['gender']) => {
    if (gender === 'm') {
        return <span role='img' aria-label='male' style={{color: colors.secondary.get()}}>♂</span>;
    } else if (gender === 'f') {
        return <span role='img' aria-label='female' style={{color: colors.pink.get()}}>♀️</span>;
    } else {
        return null;
    }
};