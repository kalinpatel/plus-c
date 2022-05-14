import MathText from "@/atoms/mathStyledText";
import gridBg from "@/brand/assets/gridBg.svg";
import Layout from "@/templates/layout";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  position: relative;
  height: calc(100vh - ${({ theme }) => theme.headerHeight});
  background: url(${gridBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;
  padding-top: 100px;
  overflow-x: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    background-size: contain;
  }
`;

const DiscontinuityTitle = styled.h1`
  grid-column: 1;
  grid-row: 1;
  padding: 0 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.themed.minor};
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / span 2;
    position: relative;
    top: -100px;
  }
`;

const DiscontinuitySubtitle = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  @media (max-width: ${({ theme }) =>
      theme.breakpoints.lg}) and (min-width: ${({ theme }) =>
      theme.breakpoints.sm}) {
    position: relative;
    left: 140px;
  }
`;

const DiscontinuityFact = styled.h3`
  grid-column: 2;
  grid-row: 2;
  padding: 0 20px;
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.themed.minor};
  height: fit-content;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: relative;
    left: 60px;
    width: 350px;
    grid-column: 2;
    grid-row: 1;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: 1 / span 2;
    grid-row: 1;
    position: relative;
    top: 90px;
    background-color: ${({ theme }) => theme.colors.themed.major};
  }
`;

const HomeButton = styled(Link)`
  position: absolute;
  left: calc(50% - 106px);
  top: calc(50% - 20px);
  width: 170px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  font-size: 22px;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 2px solid ${({ theme }) => theme.colors.themed.alwaysDark};
  color: white;
  background-color: ${({ theme }) => theme.colors.brand.accent};
  transition: all 0.18s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.themed.alwaysDark};
    color: ${({ theme }) => theme.colors.themed.alwaysLight};
    border: 2px solid ${({ theme }) => theme.colors.themed.minor};
  }
`;

export default function NotFound() {
  return (
    <Layout title="Not Found">
      <Container>
        <DiscontinuityTitle>
          Oh No! Looks like <MathText>f(x)</MathText> has a discontinuity here.
          <DiscontinuitySubtitle>(404: Page Not Found)</DiscontinuitySubtitle>
        </DiscontinuityTitle>
        <DiscontinuityFact>
          Fact: for any irremovable discontinuity in <MathText>f(x)</MathText>{" "}
          there will be no corresponding derivative{" "}
          <MathText>f&apos;(x)</MathText> at that point.
        </DiscontinuityFact>
        <HomeButton to="/">
          Go back to
          <MathText style={{ marginLeft: "6px" }} noItalics>
            (0,0)
          </MathText>
        </HomeButton>
      </Container>
    </Layout>
  );
}
