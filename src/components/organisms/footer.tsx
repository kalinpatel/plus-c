import Logo from "@/brand/logo";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: fit-content;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 40px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: calc(100vw - 40px);
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: fit-content;
  width: 100vw;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const CompanySection = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: row;
  svg {
    width: 200px;
  }
  width: fit-content;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const CopyrightText = styled.div`
  margin-left: 20px;
  margin-top: 0px;
  @media (max-width: 1000px) {
    margin-left: 0px;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  p {
    margin-top: 4px;
    margin-bottom: 8px;
  }
  font-size: 12pt;
  color: ${({ theme }) => theme.colors.themed.minor};
  text-align: left;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: center;
    margin-bottom: 30px;
  }
`;

const LicenseLink = styled(Link)`
  font-size: 12pt;
  color: ${({ theme }) => theme.colors.themed.minor};
  text-align: left;
  text-decoration: underline;
  transition: all 0.18s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: center;
  }
`;

const LinksSection = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    grid-column: 1;
  }
`;

const FooterLink = styled(Link)`
  font-size: 12pt;
  color: ${({ theme }) => theme.colors.peripheral.minorVariant};
  text-align: center;
  text-decoration: underline;
  transition: all 0.18s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

export default function Footer() {
  const theme = useTheme();

  return (
    <Container>
      <Main>
        <CompanySection>
          <Logo type={theme.darkMode ? "text-light" : "text-dark"} />
          <CopyrightText>
            <p>Made by Kalin Patel</p>
            <LicenseLink to="/legal/license">
              Open Source under the MPL 2.0 License
            </LicenseLink>
          </CopyrightText>
        </CompanySection>
        <LinksSection>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/user/settings">Settings</FooterLink>
          <FooterLink to="/legal/terms">
            Terms of Use & Privacy Statement
          </FooterLink>
        </LinksSection>
      </Main>
    </Container>
  );
}
