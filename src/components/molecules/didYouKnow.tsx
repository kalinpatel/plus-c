import FadingLatex from "@/atoms/fadingLatex";
import CreateList from "@/math/derivativesIntegralsList";
import { useEffect, useState } from "react";

const list = CreateList();

interface DidYouKnowProps {
  interval?: number;
  className?: string;
}

export default function DidYouKnow({
  interval = 4000,
  className,
}: DidYouKnowProps) {
  const [currentLatex, setCurrentLatex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLatex === list.length - 1) {
        setCurrentLatex(0);
      } else {
        setCurrentLatex(currentLatex + 1);
      }
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [currentLatex]);
  return (
    <>
      <FadingLatex
        latexExpression={list[currentLatex]}
        interval={interval}
        className={className}
      />
    </>
  );
}
