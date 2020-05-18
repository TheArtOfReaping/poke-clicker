export const calculateHP = (level: number, hpStat?: number) => {
    if (!hpStat) {
        throw new Error('Hp stat could not be found.');
    }
    //return Math.floor((( ( 2 * hpStat + 31 + (252 / 4) * level) / 100)) + level + 10);
    let res = 2 * hpStat;
    res = res + 31 + 0;
    res = res * level;
    res = res / 100;
    res = res + level;
    res = res + 10;
    return Math.floor(res);
};