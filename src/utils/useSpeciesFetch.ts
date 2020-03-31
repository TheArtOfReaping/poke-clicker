// @ts-nocheck
import * as Pokedex from 'pokeapi-js-wrapper';
import { dexEntries } from 'utils';

// hooks.js
import { useState, useEffect } from "react";
import { Pokemon } from './getSpecies';

export function useSpeciesFetch(pokeId?: number) {
const dex = new Pokedex.Pokedex();
  const [data, setData] = useState<Pokemon>();
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    try {
        if (!pokeId) return;
        if (dexEntries[pokeId] != null) {
            setData(dexEntries[pokeId]);
            setLoading(false);
        }
        const response = await dex.resource(['api/v2/pokemon/' + pokeId]);
        console.log(response);
        dexEntries[pokeId] = response[0];
        setData(response[0]);
        setLoading(false);
        console.log(response);
    } catch (e) {
        setLoading(false);
    }
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
