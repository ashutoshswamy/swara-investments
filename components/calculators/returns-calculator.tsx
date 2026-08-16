"use client";

import { useMemo, useState } from "react";
import { CalculatorShell, NumberField, ResultStat } from "./calculator-shell";
import { formatINR, cagr } from "@/lib/calculators";

export function ReturnsCalculator() {
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(200000);
  const [years, setYears] = useState(5);

  const { rate, absoluteGain } = useMemo(() => {
    return { rate: cagr(initialValue, finalValue, years), absoluteGain: finalValue - initialValue };
  }, [initialValue, finalValue, years]);

  return (
    <CalculatorShell
      eyebrow="Calculators"
      title="Returns Calculator (CAGR)"
      description="Find the compound annual growth rate of an investment given its starting value, ending value, and holding period."
      inputs={
        <div className="space-y-8">
          <NumberField row="01" id="initial" label="Initial Value" suffix="₹" value={initialValue} onChange={setInitialValue} step={5000} max={10000000} />
          <NumberField row="02" id="final" label="Final Value" suffix="₹" value={finalValue} onChange={setFinalValue} step={5000} max={10000000} />
          <NumberField row="03" id="years" label="Holding Period" suffix="years" value={years} onChange={setYears} step={1} max={40} />
        </div>
      }
      result={
        <div>
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-accent mb-8">Growth Rate</p>
          <ResultStat label="CAGR" value={`${rate.toFixed(2)}%`} emphasis />
          <div className="mt-8">
            <ResultStat label="Absolute Gain" value={formatINR(absoluteGain)} />
          </div>
        </div>
      }
    />
  );
}
