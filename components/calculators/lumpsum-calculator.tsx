"use client";

import { useMemo, useState } from "react";
import { CalculatorShell, NumberField, ResultStat } from "./calculator-shell";
import { formatINR, lumpsumFutureValue } from "@/lib/calculators";

export function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { futureValue, gains } = useMemo(() => {
    const futureValue = lumpsumFutureValue(principal, rate, years);
    return { futureValue, gains: futureValue - principal };
  }, [principal, rate, years]);

  return (
    <CalculatorShell
      eyebrow="Calculators"
      title="Lumpsum Calculator"
      description="Estimate the future value of a one-time investment, compounded annually at your expected rate of return."
      inputs={
        <div className="space-y-8">
          <NumberField row="01" id="principal" label="Investment Amount" suffix="₹" value={principal} onChange={setPrincipal} step={5000} max={10000000} />
          <NumberField row="02" id="rate" label="Expected Annual Return" suffix="%" value={rate} onChange={setRate} step={0.5} max={30} />
          <NumberField row="03" id="years" label="Investment Duration" suffix="years" value={years} onChange={setYears} step={1} max={40} />
        </div>
      }
      result={
        <div>
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-accent mb-8">Projected Value</p>
          <ResultStat label="Future Value" value={formatINR(futureValue)} emphasis />
          <div className="mt-8">
            <ResultStat label="Invested Amount" value={formatINR(principal)} />
            <ResultStat label="Estimated Gains" value={formatINR(gains)} />
          </div>
        </div>
      }
    />
  );
}
