import React from 'react';
import { PartyPokemon, toKebabCase, moves, typeToStyle, colors } from 'utils';
import {styles} from 'components/Party';


export interface MoveSetProps {
    pokemon: PartyPokemon;
}

export function MoveSet({pokemon}: MoveSetProps) {
    return <div className={styles.MoveSet}>
        {pokemon?.moves?.map((move, idx) => {
            const data = moves.find(m => toKebabCase(m.name) === move.move);
            const rank = move.rank;
            return (
                data && (
                    <div
                        className={styles.Move}
                        style={typeToStyle(data.type)}
                        key={idx}
                    >
                        <div className={styles.MoveName}>{data?.name}</div>
                        <div className={styles.MoveRank} style={{background: colors.black.tint1, color: colors.white.get()}}>{rank}</div>
                    </div>
                )
            );
        })}
    </div>;
}