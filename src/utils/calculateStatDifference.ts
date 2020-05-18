import { calculateOtherStat } from './calculateOtherStat';

export const calculateStatDifference = (firstLevel: number, secondLevel: number, stat?: number) => {
    const statA = calculateOtherStat(firstLevel, stat);
    const statB = calculateOtherStat(secondLevel, stat);
    return statB - statA;
};