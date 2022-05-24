export type Step = {
  title?: string;
  content: string;
  math: string;
};

export interface CalculatorAnswer {
  completed: true;
  result: string;
  information: Array<Step>;
  misc?: any;
}

export interface CalculatorFailure {
  completed: false;
  error: string;
}

export type CalculatorReturn = CalculatorAnswer | CalculatorFailure;
