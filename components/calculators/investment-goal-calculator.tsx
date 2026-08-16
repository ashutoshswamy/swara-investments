"use client";

import { useMemo, useState } from "react";
import { CalculatorShell, NumberField, ResultStat } from "./calculator-shell";
import { formatINR, requiredSipForGoal } from "@/lib/calculators";

export function InvestmentGoalCalculator() {
  const [goal, setGoal] = useState(2500000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { requiredSip, totalInvested } = useMemo(() => {
    const requiredSip = requiredSipForGoal(goal, rate, years);
    return { requiredSip, totalInvested: requiredSip * years * 12 };
  }, [goal, rate, years]);

  return (
    <CalculatorShell
      eyebrow="Calculators"
      title="Investment Goal Strategy Calculator"
      description="Work out the monthly SIP needed to reach a specific financial goal, given your time horizon and expected rate of return."
      inputs={
        <div className="space-y-8">
          <NumberField row="01" id="goal" label="Goal Amount" suffix="₹" value={goal} onChange={setGoal} step={10000} max={50000000} />
          <NumberField row="02" id="rate" label="Expected Annual Return" suffix="%" value={rate} onChange={setRate} step={0.5} max={30} />
          <NumberField row="03" id="years" label="Time to Goal" suffix="years" value={years} onChange={setYears} step={1} max={40} />
        </div>
      }
      result={
        <div>
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-accent mb-8">Required Strategy</p>
          <ResultStat label="Monthly SIP Needed" value={formatINR(requiredSip)} emphasis />
          <div className="mt-8">
            <ResultStat label="Total Invested" value={formatINR(totalInvested)} />
            <ResultStat label="Goal Amount" value={formatINR(goal)} />
          </div>
        </div>
      }
    />
  );
}
