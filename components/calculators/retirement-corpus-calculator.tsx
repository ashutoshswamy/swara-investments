"use client";

import { useMemo, useState } from "react";
import { CalculatorShell, NumberField, ResultStat } from "./calculator-shell";
import { formatINR, retirementCorpus } from "@/lib/calculators";

export function RetirementCorpusCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [postReturn, setPostReturn] = useState(8);

  const { expenseAtRetirement, corpus, yearsToRetirement } = useMemo(
    () =>
      retirementCorpus({
        currentAge,
        retirementAge,
        lifeExpectancy,
        monthlyExpense,
        inflationPct: inflation,
        postRetirementReturnPct: postReturn,
      }),
    [currentAge, retirementAge, lifeExpectancy, monthlyExpense, inflation, postReturn]
  );

  return (
    <CalculatorShell
      eyebrow="Calculators"
      title="Retirement Corpus Calculator"
      description="Estimate the retirement corpus you'll need to sustain your inflation-adjusted monthly expenses through retirement."
      inputs={
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
            <NumberField row="01" id="currentAge" label="Current Age" suffix="years" value={currentAge} onChange={setCurrentAge} min={18} step={1} max={70} />
            <NumberField row="02" id="retirementAge" label="Retirement Age" suffix="years" value={retirementAge} onChange={setRetirementAge} min={40} step={1} max={80} />
            <NumberField row="03" id="lifeExpectancy" label="Life Expectancy" suffix="years" value={lifeExpectancy} onChange={setLifeExpectancy} min={60} step={1} max={100} />
            <NumberField row="04" id="inflation" label="Inflation Rate" suffix="%" value={inflation} onChange={setInflation} step={0.5} max={15} />
            <NumberField row="05" id="postReturn" label="Post-Retirement Return" suffix="%" value={postReturn} onChange={setPostReturn} step={0.5} max={15} />
            <NumberField row="06" id="monthlyExpense" label="Current Monthly Expense" suffix="₹" value={monthlyExpense} onChange={setMonthlyExpense} step={1000} max={500000} />
          </div>
        </div>
      }
      result={
        <div>
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-accent mb-8">Retirement Plan</p>
          <ResultStat label="Corpus Required" value={formatINR(corpus)} emphasis />
          <div className="mt-8">
            <ResultStat label={`Monthly Expense at Age ${retirementAge}`} value={formatINR(expenseAtRetirement)} />
            <ResultStat label="Years to Retirement" value={`${Math.max(yearsToRetirement, 0)} years`} />
          </div>
        </div>
      }
    />
  );
}
