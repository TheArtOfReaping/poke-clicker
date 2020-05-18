import { ExpFormulaOpts } from './expFormula';
import { clamp } from 'ramda';


export type MoneyFormulaOpts = {
    hasAmuletCoin?: boolean;
  } & Pick<ExpFormulaOpts, 'isWild' | 'baseExp' | 'foeLevel' | 'level'>;

export const moneyFormula = ({
    isWild,
    baseExp,
    foeLevel,
    level,
    hasAmuletCoin,
}: MoneyFormulaOpts) => {
    const a = isWild ? 1 : 3;
    const b = baseExp;
  
    const e = hasAmuletCoin ? 1.5 : 1;
    const step1 = b + (foeLevel - level) + 10;
    const step2 = step1 * e;
    return clamp(1, 50000, Math.floor(step2));
};