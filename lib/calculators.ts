export const formatINR = (value: number) =>
  Number.isFinite(value)
    ? value.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
    : "—";

/** Future value of a monthly SIP, compounded monthly. */
export function sipFutureValue(monthlyAmount: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (monthlyAmount <= 0 || n <= 0) return 0;
  if (r === 0) return monthlyAmount * n;
  return monthlyAmount * (((1 + r) ** n - 1) / r) * (1 + r);
}

/** Future value of a one-time lumpsum, compounded annually. */
export function lumpsumFutureValue(principal: number, annualRatePct: number, years: number) {
  if (principal <= 0 || years <= 0) return principal;
  return principal * (1 + annualRatePct / 100) ** years;
}

/** Compound annual growth rate between an initial and final value. */
export function cagr(initialValue: number, finalValue: number, years: number) {
  if (initialValue <= 0 || finalValue <= 0 || years <= 0) return 0;
  return ((finalValue / initialValue) ** (1 / years) - 1) * 100;
}

/** Monthly SIP required to reach a future goal amount. */
export function requiredSipForGoal(goalAmount: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (goalAmount <= 0 || n <= 0) return 0;
  if (r === 0) return goalAmount / n;
  return goalAmount / ((((1 + r) ** n - 1) / r) * (1 + r));
}

/**
 * Corpus needed at retirement to fund inflation-adjusted monthly expenses
 * for the years in retirement, drawn down against a post-retirement return.
 */
export function retirementCorpus({
  currentAge,
  retirementAge,
  lifeExpectancy,
  monthlyExpense,
  inflationPct,
  postRetirementReturnPct,
}: {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  monthlyExpense: number;
  inflationPct: number;
  postRetirementReturnPct: number;
}) {
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  if (yearsToRetirement <= 0 || yearsInRetirement <= 0 || monthlyExpense <= 0) {
    return { expenseAtRetirement: 0, corpus: 0, yearsToRetirement, yearsInRetirement };
  }

  const expenseAtRetirement = monthlyExpense * (1 + inflationPct / 100) ** yearsToRetirement;

  // Real (inflation-adjusted) monthly rate of return during retirement.
  const realAnnualRate =
    (1 + postRetirementReturnPct / 100) / (1 + inflationPct / 100) - 1;
  const realMonthlyRate = realAnnualRate / 12;
  const months = yearsInRetirement * 12;

  const corpus =
    realMonthlyRate === 0
      ? expenseAtRetirement * months
      : expenseAtRetirement * ((1 - (1 + realMonthlyRate) ** -months) / realMonthlyRate);

  return { expenseAtRetirement, corpus, yearsToRetirement, yearsInRetirement };
}
