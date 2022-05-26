import styled from "styled-components";

const MathFont = styled.span`
  font-family: "Lora", serif;
  font-weight: 600;
  font-style: italic;
  color: inherit;
  &.no-italics {
    font-style: normal;
  }
`;

interface MathTextProps {
  noItalics?: boolean;
  children: any;
  style?: any;
}
export default function MathText({
  children,
  style = {},
  noItalics,
}: MathTextProps) {
  return (
    <MathFont style={style} className={noItalics ? "no-italics" : ""}>
      {children}
    </MathFont>
  );
}
