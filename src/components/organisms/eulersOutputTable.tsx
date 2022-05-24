import MathText from "@/atoms/mathStyledText";
import {
  EulersMethodAnswer,
  EulersMethodInputs,
} from "@/math/calculators/eulersMethod";
import { Values } from "@/pages/content/methods/eulersMethod";
import TeX from "@matejmazur/react-katex";
import styled from "styled-components";

const Container = styled.section`
  width: min(46rem, 100vw);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Table = styled.table`
  width: min(46rem, 100vw);
  border-spacing: 0;
  border: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
  border-radius: ${({ theme }) => theme.borderRadius.default};
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

interface EulersOutputTableProps {
  input: EulersMethodInputs | Values;
  result: EulersMethodAnswer | null;
}

export default function EulersOutputTable({
  input,
  result,
}: EulersOutputTableProps) {
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
          given point{" "}
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
          {result.result.map((row, index) => (
            <tr
              key={index}
              className={
                index === result.result.length - 1 ? "" : "border-bottom"
              }
            >
              <td>
                <TeX math={row.x} />
              </td>
              <td>
                <TeX math={row.y} />
              </td>
              <td>
                <TeX math={row.dydx || "—"} />
              </td>
              <td>
                <TeX math={row.dy || "—"} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
