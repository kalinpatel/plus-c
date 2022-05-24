import styled from "styled-components";

const Container = styled.section`
  width: min(46rem, 100vw);
`;

interface MathInputSectionProps {
  children: any;
}

export default function MathInputSection({ children }: MathInputSectionProps) {
  return <Container>{children}</Container>;
}
