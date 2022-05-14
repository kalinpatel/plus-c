import TeX from "@matejmazur/react-katex";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledFadingLatex = styled.span`
  user-select: none;
  &.fade-in {
    animation: fade-in 0.8s ease-in-out;
    @keyframes fade-in {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }
  &.fade-out {
    animation: fade-out 0.8s ease-in-out;
    @keyframes fade-out {
      0% {
        opacity: 1;
        transform: translateY(0px);
      }
      100% {
        opacity: 0;
        transform: translateY(-5px);
      }
    }
  }
`;

interface FadingLatexProps {
  latexExpression: string;
  interval?: number;
  className?: string;
}

export default function FadingLatex({
  latexExpression,
  interval = 1000,
  className,
}: FadingLatexProps) {
  const intervalBeforeFadeOut = interval - 800;
  const [fadingState, setFadingState] = useState({
    fade: "",
    latex: "",
  });
  useEffect(() => {
    const currentExpression = latexExpression;
    setFadingState({ fade: "fade-in", latex: currentExpression });
    const timeout = setTimeout(() => {
      setFadingState({
        fade: "fade-out",
        latex: currentExpression,
      });
    }, intervalBeforeFadeOut);
    return () => {
      clearTimeout(timeout);
    };
  }, [latexExpression]);
  return (
    <StyledFadingLatex className={`${fadingState.fade} ${className}`}>
      <TeX math={fadingState.latex} />
    </StyledFadingLatex>
  );
}
