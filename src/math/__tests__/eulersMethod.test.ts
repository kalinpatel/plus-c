import calculateEulersMethod from "../calculators/eulersMethod";

describe("Calculate Euler's Method", () => {
  test("correct values with number of steps", () => {
    const result = calculateEulersMethod({
      initialX: "1",
      initialY: "3",
      finalX: "3",
      step: {
        definedAs: "number",
        value: "2",
      },
      diffEq: "2xy",
    });
    expect(result).toEqual({
      completed: true,
      answerTex: "45",
      result: [
        {
          x: "1",
          y: "3",
          dydx: "6",
          dy: "6",
        },
        {
          x: "2",
          y: "9",
          dydx: "36",
          dy: "36",
        },
        {
          x: "3",
          y: "45",
          dydx: null,
          dy: null,
        },
      ],
    });
  });
  test("correct values with step size", () => {
    const result = calculateEulersMethod({
      initialX: "1",
      initialY: "3",
      finalX: "3",
      step: {
        definedAs: "size",
        value: "1",
      },
      diffEq: "2xy",
    });
    expect(result).toEqual({
      completed: true,
      answerTex: "45",
      result: [
        {
          x: "1",
          y: "3",
          dydx: "6",
          dy: "6",
        },
        {
          x: "2",
          y: "9",
          dydx: "36",
          dy: "36",
        },
        {
          x: "3",
          y: "45",
          dydx: null,
          dy: null,
        },
      ],
    });
  });
});
