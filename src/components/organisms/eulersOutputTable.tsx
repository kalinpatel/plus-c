import MathText from "@/atoms/mathStyledText";
import {
  EulersMethodAnswer,
  EulersMethodInputs,
} from "@/math/calculators/eulersMethod";
import { Values } from "@/pages/content/methods/eulersMethod";
import TeX from "@matejmazur/react-katex";
import { useState } from "react";
import Tooltip from "react-power-tooltip";
import styled, { useTheme } from "styled-components";

const Container = styled.section`
  width: min(46rem, 100vw);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: ${({ theme }) => theme.colors.themed.minor};
`;

const Table = styled.table`
  width: min(46rem, 100vw);
  border-spacing: 0;
  border: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background-color: ${({ theme }) => theme.colors.themed.major};
  color: ${({ theme }) => theme.colors.themed.minor};
  font-size: ${({ theme }) => theme.typography.fontSize.default};
  margin-bottom: 40px;
  th,
  td {
    text-align: center;
  }
  th {
    border-bottom: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
  }
  .border-bottom td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
  }
  td,
  th {
    padding: 10px;
    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
    }
  }
  th {
    background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
    &:first-child {
      border-top-left-radius: ${({ theme }) => theme.borderRadius.large};
    }
    &:last-child {
      border-top-right-radius: ${({ theme }) => theme.borderRadius.large};
    }
  }
  td {
    position: relative;
    cursor: help;
    &.no-cursor {
      cursor: not-allowed;
    }
  }
`;

const ColumnHeader = styled.th`
  text-align: center;
  padding: 10px;
  font-weight: 500;
`;

const Givens = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.themed.minor};
`;

const StyledTooltip = styled.div`
  color: ${({ theme }) => theme.colors.themed.minor};
  font-weight: 500;
  font-size: 0.95rem;
`;

interface EulersOutputTableProps {
  input: EulersMethodInputs | Values;
  result: EulersMethodAnswer | null;
}

export default function EulersOutputTable({
  input,
  result,
}: EulersOutputTableProps) {
  const theme = useTheme();

  if (!result) {
    return <h3>No result can be shown. Try again.</h3>;
  }
  return (
    <Container>
      <MathText style={{ fontSize: "1.6rem" }}>
        y({input.finalX})&nbsp;&#8776;&nbsp;
        <TeX math={result.answerTex} />
      </MathText>
      <Givens>
        <p>
          Differential equation <TeX math={"\\frac{dy}{dx}= " + input.diffEq} />{" "}
          used to approximate the value of{" "}
          <MathText style={{ fontSize: "1rem" }}>
            y(
            <TeX math={input.finalX} />)
          </MathText>{" "}
          given point <wbr />
          <MathText style={{ fontSize: "1rem" }}>
            (<TeX math={input.initialX} />, <TeX math={input.initialY} />)
          </MathText>
        </p>
      </Givens>
      <Table>
        <thead>
          <tr>
            <ColumnHeader>
              <TeX math={"x"} />
            </ColumnHeader>
            <ColumnHeader>
              <TeX math={"y"} />
            </ColumnHeader>
            <ColumnHeader>
              <TeX math={"\\frac{dy}{dx}"} />
            </ColumnHeader>
            <ColumnHeader>
              <TeX math={"dy"} />
            </ColumnHeader>
          </tr>
        </thead>
        <tbody>
          {result.result.map((row, index) => {
            const [xTooltipShown, setXTooltipShown] = useState(false);
            const [yTooltipShown, setYTooltipShown] = useState(false);
            const [dyTooltipShown, setDyTooltipShown] = useState(false);
            const [dydxTooltipShown, setDydxTooltipShown] = useState(false);

            return (
              <tr
                key={index}
                className={
                  index === result.result.length - 1 ? "" : "border-bottom"
                }
              >
                <td
                  onMouseOver={() => setXTooltipShown(true)}
                  onMouseLeave={() => setXTooltipShown(false)}
                >
                  <TeX math={row.x} />
                  <Tooltip
                    show={xTooltipShown}
                    static
                    backgroundColor={
                      theme.darkMode
                        ? theme.colors.peripheral.extraDarkGrey
                        : theme.colors.peripheral.extraLightGrey
                    }
                    // @ts-expect-error Border radius is a valid prop, but is not defined in the type
                    borderRadius={theme.borderRadius.default}
                    position="top start"
                    arrowAlign="center"
                    textBoxWidth="240px"
                  >
                    <StyledTooltip>{row.xReason}</StyledTooltip>
                  </Tooltip>
                </td>
                <td
                  onMouseOver={() => setYTooltipShown(true)}
                  onMouseLeave={() => setYTooltipShown(false)}
                >
                  <TeX math={row.y} />
                  <Tooltip
                    show={yTooltipShown}
                    static
                    backgroundColor={
                      theme.darkMode
                        ? theme.colors.peripheral.extraDarkGrey
                        : theme.colors.peripheral.extraLightGrey
                    }
                    // @ts-expect-error Border radius is a valid prop, but is not defined in the type
                    borderRadius={theme.borderRadius.default}
                    position="top start"
                    arrowAlign="center"
                    textBoxWidth="240px"
                  >
                    <StyledTooltip>{row.yReason}</StyledTooltip>
                  </Tooltip>
                </td>
                <td
                  onMouseOver={() => setDydxTooltipShown(true)}
                  onMouseLeave={() => setDydxTooltipShown(false)}
                  className={!row.dydxReason ? "no-cursor" : ""}
                >
                  <TeX math={row.dydx || "—"} />
                  {row.dydx && (
                    <Tooltip
                      show={dydxTooltipShown}
                      static
                      backgroundColor={
                        theme.darkMode
                          ? theme.colors.peripheral.extraDarkGrey
                          : theme.colors.peripheral.extraLightGrey
                      }
                      // @ts-expect-error Border radius is a valid prop, but is not defined in the type
                      borderRadius={theme.borderRadius.default}
                      position="top start"
                      arrowAlign="center"
                      textBoxWidth="240px"
                    >
                      <StyledTooltip>{row.dydxReason}</StyledTooltip>
                    </Tooltip>
                  )}
                </td>
                <td
                  onMouseOver={() => setDyTooltipShown(true)}
                  onMouseLeave={() => setDyTooltipShown(false)}
                  className={!row.dyReason ? "no-cursor" : ""}
                >
                  <TeX math={row.dy || "—"} />
                  {row.dy && (
                    <Tooltip
                      show={dyTooltipShown}
                      static
                      backgroundColor={
                        theme.darkMode
                          ? theme.colors.peripheral.extraDarkGrey
                          : theme.colors.peripheral.extraLightGrey
                      }
                      // @ts-expect-error Border radius is a valid prop, but is not defined in the type
                      borderRadius={theme.borderRadius.default}
                      position="top start"
                      arrowAlign="center"
                      textBoxWidth="240px"
                    >
                      <StyledTooltip>{row.dyReason}</StyledTooltip>
                    </Tooltip>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
