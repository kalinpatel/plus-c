import { MathNode, parse } from "mathjs";
import { parseTex as latexParse } from "tex-math-parser";

export function parseTex(tex: string): MathNode {
  return latexParse(tex) as unknown as MathNode;
}

export function stringToTex(math: string): string {
  return parse(math).toTex();
}
