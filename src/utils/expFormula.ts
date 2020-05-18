export interface ExpFormulaOpts {
  isWild?: boolean;
  baseExp: number;
  foeLevel: number;
  level: number;
  trade?: 'OT' | 'DT' | 'IT';
  hasLuckyEgg?: boolean;
  hasAffectionAbove2?: boolean;
}

export const expFormula = ({
    isWild,
    baseExp,
    foeLevel,
    level,
    trade = 'OT',
    hasLuckyEgg,
    hasAffectionAbove2,
}: ExpFormulaOpts) => {
    const a = isWild ? 1 : 1.5;

    const b = baseExp;
    const l = foeLevel;
    const l2 = level;

    const e = hasLuckyEgg ? 1.5 : 1;
    const f = hasAffectionAbove2 ? 1.2 : 1;
    const p = 1;

    const t = trade === 'OT' ? 1 : trade === 'DT' ? 1.5 : 1;

    const step1 = a * b * l;
    const step2 = 1;

    const step3 = (2 * l + 10) ^ 2.5;
    const step4 = (l + l2 + 10) ^ 2.6;

    const step5 = step1 / step2;
    const step6 = step3 / step4;
    const step7 = step5 * step6 + 1;
    return Math.floor(step7 * t * e * p);
};
