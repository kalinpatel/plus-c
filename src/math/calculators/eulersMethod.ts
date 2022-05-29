import { firebasePerformance } from "@/firebase";
import { trace } from "firebase/performance";
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
  xReason: string;
  yReason: string;
  dydxReason: string | null;
  dyReason: string | null;
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
  let formatted = format(value, FormatOptions);
  for (let i = formatted.length - 1; i >= 0; i--) {
    if (formatted.endsWith("0")) {
      formatted = formatted.slice(0, i);
    } else {
      break;
    }
  }
  if (formatted.endsWith(".")) {
    return formatted.slice(0, formatted.length - 1);
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
  const calcTrace = trace(firebasePerformance, "Calculate Euler's Method");
  calcTrace.start();

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
        xReason: "Initial value was provided.",
        yReason: "Initial value was provided.",
        dydxReason: `Use the given differential equation, and plug in x = ${initialX.toString()} and y = ${initialY.toString()}.`,
        dyReason: `Multiply dy/dx = ${formatted(
          initialDyDx
        )} by dx (step size) = ${stepSize} to find dy.`,
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
        xReason: `x = ${values[i].x} + dx = ${formatted(x)}`,
        yReason: `y = ${values[i].y} + dy = ${formatted(y)}`,
        dydxReason: `Use the given differential equation, and plug in x = ${formatted(
          x
        )} and y = ${formatted(y)}.`,
        dyReason: `Multiply dy/dx = ${formatted(
          dydx
        )} by dx (step size) = ${stepSize} to find dy.`,
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
      xReason: `x = ${
        values[values.length - 1].x
      } + dx (step size) = ${formatted(finalX)}`,
      yReason: `y = ${values[values.length - 1].y} + ${
        values[values.length - 1].dy
      } = ${formatted(finalY)}`,
      dydxReason: null,
      dyReason: null,
    });
    calcTrace.stop();
    calcTrace.putMetric("iterations", values.length);
    return {
      completed: true,
      result: values,
      answerTex: values[values.length - 1].y,
    };
  } catch (err: any) {
    console.log(err);
    calcTrace.stop();
    calcTrace.putAttribute("error", "true");

    return {
      completed: false,
      errorMessage: err.message || "Unknown error.",
    };
  }
}
