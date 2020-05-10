// A simplified capture formula for this game
export interface CaptureFormulaArgs {
  maxHP: number;
  currentHP: number;
  rate: number;
  ballBonus?: number;
  statusBonus?: number;
}
export const captureFormula = ({
  maxHP,
  currentHP,
  rate,
  ballBonus = 1,
  statusBonus = 1,
}: CaptureFormulaArgs) => {
  return (
    (((3 * maxHP - 2 * currentHP) * rate * ballBonus) / (3 * maxHP)) *
    statusBonus
  );
};

export const shouldBeCaught = (args: CaptureFormulaArgs) => 255 < captureFormula(args);