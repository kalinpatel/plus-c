const list: string[] = [
  "\\frac{d}{dx}(\\sin(x))=\\cos(x)",
  "\\frac{d}{dx}(\\cos(x))=-\\sin(x)",
  "\\frac{d}{dx}(\\tan(x))=\\sec^2(x)",
  "\\frac{d}{dx}(\\sec(x))=\\sec(x)\\tan(x)",
  "\\frac{d}{dx}(\\csc(x))=-\\csc(x)\\cot(x)",
  "\\frac{d}{dx}(\\cot(x))=-\\csc^2(x)",
  "\\frac{d}{dx}(e^{x})=e^{x}",
  "\\frac{d}{dx}(\\ln(x))=\\frac{1}{x}",
  "\\frac{d}{dx}(\\log_b(x))=\\frac{1}{x\\ln(b)}",
  "\\int e^xdx=e^{x}+C",
  "\\int\\sin(x)dx=-\\cos(x)+C",
  "\\int\\cos(x)dx=\\sin(x)+C",
  "\\int\\frac{1}{x}dx=\\ln(x)+C",
  "\\int a dx=ax+C",
  "\\frac{d}{dx}(\\sin^{-1}(x))=\\frac{1}{\\sqrt{1-x^2}}",
  "\\frac{d}{dx}(\\cos^{-1}(x))=\\frac{-1}{\\sqrt{1-x^2}}",
  "\\frac{d}{dx}(\\tan^{-1}(x))=\\frac{1}{1+x^2}",
  "\\frac{d}{dx}(\\arcsin(x))=\\frac{1}{\\sqrt{1-x^2}}",
  "\\frac{d}{dx}(\\arccos(x))=\\frac{-1}{\\sqrt{1-x^2}}",
  "\\frac{d}{dx}(\\arctan(x))=\\frac{1}{1+x^2}",
  "\\frac{d}{dx}(f(g(x)))=f'(g(x))\\cdot g'(x)",
  "e^x=\\sum_{n=0}^{\\infty}\\frac{x^n}{n!}",
];

export default function CreateList(): string[] {
  const newList: string[] = [];
  for (let i = 0; i < list.length; i++) {
    const index = Math.floor(Math.random() * newList.length);
    newList.splice(index, 0, list[i]);
  }
  return newList;
}
