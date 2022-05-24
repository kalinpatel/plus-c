import { evaluate, format, FormatOptions, MathNode, parse } from "mathjs";
import { parseTex } from "../parser";

export interface EulersMethodInputs {
  initialX: string;
  initialY: string;
  finalX: string;
  step: {
    definedAs: "number" | "size";
    value: string;
  };
  diffEq: string;
}

interface EulersMethodStep {
  x: string;
  y: string;
  dydx: string | null;
  dy: string | null;
}

export interface EulersMethodAnswer {
  completed: true;
  result: Array<EulersMethodStep>;
  answerTex: string;
}

interface EulersMethodError {
  completed: false;
  errorMessage: string;
}

type EulersMethodReturn = EulersMethodAnswer | EulersMethodError;

const FormatOptions: FormatOptions = {
  precision: 3,
  notation: "fixed",
};

function formatted(value: MathNode): string {
  const formatted = format(value, FormatOptions);
  if (formatted.endsWith(".000")) {
    return formatted.slice(0, formatted.length - 4);
  }
  return formatted;
}

export default function calculateEulersMethod({
  initialX: initialXInput,
  initialY: initialYInput,
  finalX: finalXInput,
  step: stepInput,
  diffEq: diffEqInput,
}: EulersMethodInputs): EulersMethodReturn {
  const initialX = parse(initialXInput);
  const initialY = parse(initialYInput);
  const finalX = parse(finalXInput);
  const diffEq = parseTex(diffEqInput);
  let stepCount: MathNode;
  let stepSize: MathNode;
  if (stepInput.definedAs === "number") {
    stepCount = parse(stepInput.value);
    stepSize = evaluate(`((${finalX}) - (${initialX})) / (${stepCount})`);
  } else {
    stepSize = parse(stepInput.value);
    stepCount = evaluate(`((${finalX}) - (${initialX})) / (${stepSize})`);
  }
  try {
    const initialDyDx = parse(
      diffEq.evaluate({
        x: initialX.toString(),
        y: initialY.toString(),
      })
    );
    const initialDy = parse(
      evaluate(`(${initialDyDx.toString()}) * (${stepSize.toString()})`)
    );
    const values: Array<EulersMethodStep> = [
      {
        x: formatted(initialX),
        y: formatted(initialY),
        dydx: formatted(initialDyDx),
        dy: formatted(initialDy),
      },
    ];
    for (let i = 0; i < Number(stepCount.toString()) - 1; i++) {
      const x = parse(
        evaluate(`${values[i].x.toString()} + (${stepSize.toString()})`)
      );
      const y = parse(
        evaluate(`${values[i].y.toString()} + (${values[i].dy!.toString()})`)
      );
      const dydx = parse(diffEq.evaluate({ x: x.toString(), y: y.toString() }));
      const dy = parse(
        evaluate(`(${dydx.toString()}) * (${stepSize.toString()})`)
      );
      values.push({
        x: formatted(x),
        y: formatted(y),
        dydx: formatted(dydx),
        dy: formatted(dy),
      });
    }
    const finalX = parse(
      evaluate(
        `${values[values.length - 1].x.toString()} + (${stepSize.toString()})`
      )
    );
    const finalY = parse(
      evaluate(
        `${values[values.length - 1].y.toString()} + (${values[
          values.length - 1
        ].dy!.toString()})`
      )
    );
    values.push({
      x: formatted(finalX),
      y: formatted(finalY),
      dydx: null,
      dy: null,
    });
    return {
      completed: true,
      result: values,
      answerTex: values[values.length - 1].y,
    };
  } catch (err: any) {
    console.log(err);
    return {
      completed: false,
      errorMessage: err.message,
    };
  }
}
