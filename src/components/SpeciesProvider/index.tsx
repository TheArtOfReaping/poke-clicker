import React, { Children } from 'react';
import { SpeciesName } from 'utils/SpeciesName';
import { speciesToNumber, getSpecies, Pokemon } from 'utils';
import useSWR from 'swr';
import fetch from 'unfetch';

export interface SpeciesProviderProps {
    speciesNameOrId?: SpeciesName | number;
    render(data?: Pokemon): React.ReactElement;
}

export const determineId = function determineId(id: SpeciesProviderProps['speciesNameOrId']) {
    if (typeof id === 'number') {
        return id;
    } else {
        return speciesToNumber(id);
    }
};

export function SpeciesProvider({speciesNameOrId, render}: SpeciesProviderProps) {
    const id = determineId(speciesNameOrId);    
    const {data, error} = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`,
        url => fetch(url).then(r => r.json() ));

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return render && render(data);
}