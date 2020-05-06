import React from 'react';
import { PartyPokemon, getGenderIcon, getPokemonIcon, colors, typeToStyle, Types, calculateBaseDPS, calculateOtherStat, moves, StatName } from 'utils';
import {classes} from 'typestyle';
import {styles, getStat, getStatShorthand, getTypes, capitalize} from 'components/Party';
import { Button } from 'components/Button';
import { useDispatch } from 'react-redux';
import { editPokemon } from 'actions';
import { color } from 'csx';
import { ItemIcon } from 'components/Inventory';
import { getItem } from 'utils/listOfRoutes';

export interface PokemonViewProps {
    pokemon: PartyPokemon;
    id: number;
    idx: number;
    hp: number;
}

export function PokemonView({
    pokemon,
    id,
    idx,
    hp,
}: PokemonViewProps) {
    const dispatch = useDispatch();

    return <div className={classes(styles.ExpandedView, pokemon?.shiny && styles.ExpandedViewShiny)}>
    <div className={styles.PokemonData}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img
          style={{
            height: '128px',
            marginTop: '-32px',
            imageRendering: 'pixelated',
            filter: pokemon?.superShiny ? `hue-rotate(${pokemon?.superShinySeed || 0}deg)` : undefined,
          }}
          alt={pokemon.species}
          src={getPokemonIcon(pokemon.species, pokemon.shiny)}
        />
        
        <span>{pokemon?.pokeball && <span className={styles.ItemIcon}><ItemIcon {...getItem(pokemon.pokeball)} /></span>}{pokemon.species} {getGenderIcon(pokemon.gender)} lv.{pokemon.level}</span><span>{(pokemon?.shiny || pokemon?.superShiny) && <img className={styles.SpecialAttributeImg} src='./images/ui/shiny-star.png' />}
        {pokemon?.favorite && <img className={styles.SpecialAttributeImg} src='./images/ui/favorite-heart.png' />}</span>
        
        <div style={{display: 'flex', margin: '0 auto'}}>{getTypes(id)?.map(type => <div style={{...typeToStyle(capitalize(type.type.name) as Types), width: '3rem'}}>{capitalize(type.type.name)}</div>)}</div>
      </div>
      <div className={styles.PokemonStats}>
        <div className={styles.PokemonStat}>
          <span>HP</span>
          <span>{hp}</span>
        </div>
        {
          (['attack', 'defense', 'special-attack', 'special-defense', 'speed'] as StatName[]).map((stat: StatName) => {
            return <div className={styles.PokemonStat}>
          <span>{getStatShorthand(stat).toUpperCase()}</span>
            <span title={getStat(id, stat)?.toString()}>{calculateOtherStat(pokemon.level, getStat(id, stat))}</span>
          </div>
          })
        }
      </div>
      <div>
        <div className={styles.DPSBadge}>DPS: {calculateBaseDPS(pokemon.level, getStat(id, 'special-attack'), getStat(id, 'attack'), getStat(id, 'speed'))}</div>
        <div className={styles.DPSBadge}>
          Ability: {pokemon?.ability || 'None'}
        </div>
        <div className={styles.DPSBadge}>
          Item: {pokemon?.item || 'None'}
        </div>
        <div className={styles.DPSBadge}>
         ❤❤❤
        </div>
      </div>
    </div>
    <div className={styles.MoveSet}>
      {pokemon?.moves?.map((moveId: number) => {
        const move = moves.find((m) => m.id === moveId);
        const rank = pokemon?.moveRanks?.[moveId];
        return (
          move && (
            <div
                className={styles.Move}
                style={typeToStyle(move.type)}
            >
              <div className={styles.MoveName}>{move.name}</div>
              {rank?.rank &&  <div className={styles.MoveRank} style={{background: colors.black.tint1, color: colors.white.get()}}>{rank?.rank}</div>}
            </div>
          )
        );
      })}
    </div>
    <div className={styles.PokemonOptions}>
      <Button onClick={e => console.log(pokemon, pokemon.id, id, idx)} className={styles.PokemonOptionsButton} options={{smallFont: true}} value={!pokemon?.favorite ? "Favorite" : "Unfavorite"} />
      {/* {party.length > 1 && (
        <Button className={styles.PokemonOptionsButton} options={{ smallFont: true }} value="Release" />
      )} */}
      <Button
        className={styles.PokemonOptionsButton}
        options={{ smallFont: true }}
        value="Change Nickname"
      />
      <Button className={styles.PokemonOptionsButton} options={{ smallFont: true }} value="Mark" />
      <Button className={styles.PokemonOptionsButton} options={{ smallFont: true }} value="Evolve" />
    </div>
  </div>
}