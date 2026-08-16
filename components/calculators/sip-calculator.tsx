"use client";

import { useMemo, useState } from "react";
import { CalculatorShell, NumberField, ResultStat } from "./calculator-shell";
import { formatINR, sipFutureValue } from "@/lib/calculators";

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { invested, futureValue, gains } = useMemo(() => {
    const invested = monthly * years * 12;
    const futureValue = sipFutureValue(monthly, rate, years);
    return { invested, futureValue, gains: futureValue - invested };
  }, [monthly, rate, years]);

  return (
    <CalculatorShell
      eyebrow="Calculators"
      title="SIP Calculator"
      description="Estimate the future value of a monthly Systematic Investment Plan, compounded monthly at your expected rate of return."
      inputs={
        <div className="space-y-8">
          <NumberField row="01" id="monthly" label="Monthly Investment" suffix="₹" value={monthly} onChange={setMonthly} step={500} max={200000} />
          <NumberField row="02" id="rate" label="Expected Annual Return" suffix="%" value={rate} onChange={setRate} step={0.5} max={30} />
          <NumberField row="03" id="years" label="Investment Duration" suffix="years" value={years} onChange={setYears} step={1} max={40} />
        </div>
      }
      result={
        <div>
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-accent mb-8">Projected Value</p>
          <ResultStat label="Future Value" value={formatINR(futureValue)} emphasis />
          <div className="mt-8">
            <ResultStat label="Total Invested" value={formatINR(invested)} />
            <ResultStat label="Estimated Gains" value={formatINR(gains)} />
          </div>
        </div>
      }
    />
  );
}
