import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

export type Screen = "input" | "output";

interface CalculatorInputOutputProps {
  screen?: Screen;
  output: any;
  input: any;
}

const Wrapper = styled(motion.div)`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function CalculatorInputOutput({
  screen,
  output: Output,
  input: Input,
}: CalculatorInputOutputProps) {
  const [showingOutput, setShowingOutput] = useState(false);

  useEffect(() => {
    if (screen === "output") {
      setShowingOutput(true);
    } else if (screen === "input") {
      setShowingOutput(false);
    }
  }, [screen]);

  const OutputAnimation = {
    initial: { opacity: 0, y: "0vh" },
    animate: {
      opacity: 1,
      y: "0vh",
      transition: { duration: 0.28 },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const InputAnimation = {
    initial: { opacity: 0, y: "0vh" },
    animate: {
      opacity: 1,
      y: "0vh",
      transition: { duration: 0.28 },
    },
    exit: { opacity: 0, y: "10vh", transition: { duration: 0.5 } },
  };

  if (showingOutput) {
    return (
      <Wrapper
        initial="initial"
        animate="animate"
        exit="exit"
        variants={OutputAnimation}
        key="output"
      >
        {Output}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper
        initial="initial"
        animate="animate"
        exit="exit"
        variants={InputAnimation}
        key="input"
      >
        {Input}
      </Wrapper>
    );
  }
}
