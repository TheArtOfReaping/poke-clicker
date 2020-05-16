import { head, tail, last, clamp, reverse } from "ramda";
import { PartyPokemon } from 'utils';

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: {
        name: string;
        url: string;
    }
    version_group: {
        name: string;
        url: string;
    }
}
export interface Move {
    move: {name: string; url: string};
    version_group_details: VersionGroupDetail[];
}

const zeroIfUndefined = (n?: number) => n == null ? 0 : n;

const mapMovesToLearnableMove = (move: Move) => {
    const {name} = move.move;
    return {
        name,
        level: head(move.version_group_details
            .map(detail => detail.level_learned_at))
    }
}

export function generateWildPokemonMoves({ moves, level }: { moves?: Move[], level: number }): PartyPokemon['moves'] {
    console.log(moves, level);
    if (!moves) {
        return [{
            rank: 0,
            move: 'Protect',
        }];
    }
    const learnableForWild = moves
        .filter(move => move.version_group_details.some(
            detail => detail.move_learn_method.name === 'level-up' && detail.level_learned_at !== 0
        ))
        .map(mapMovesToLearnableMove)
        .sort((a, b) => zeroIfUndefined(a?.level) - zeroIfUndefined(b?.level))
        .reverse();
    
    const getLastLevelMove = last(learnableForWild.filter(move => (move?.level || 0) <= level));
    const index = getLastLevelMove == null ? 0 : learnableForWild.indexOf(getLastLevelMove);
    const start = clamp(0, Infinity, index - 3);
    console.log(learnableForWild, getLastLevelMove, index, start);
    return learnableForWild.slice(start, index).map(move => ({move: move.name, rank: 0}));
}