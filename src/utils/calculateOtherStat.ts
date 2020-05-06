export const calculateOtherStat = (level: number, stat?: number) => {
    if (!stat) return 0;
    const evs = (252 / 4);
    return Math.floor((2 * stat + 31 + 0) * level / 100 + 5 * 1);
  };