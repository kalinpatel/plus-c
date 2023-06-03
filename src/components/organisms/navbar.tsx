import LogoLink from "@/atoms/logoLink";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  width: calc(100vw - 40px);
  height: 80px;
  padding: 0 20px;
  margin: 0px;
  padding-top: 14px;
  background-color: transparent;
`;

const NavLinks = styled.div`
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 35px;
  color: ${({ theme }) => theme.colors.themed.minor};
  background-color: transparent;
  padding: 0 5px 0 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid transparent;
  transition: all 0.18s ease-in-out;
  cursor: pointer;
  &:hover,
  &:focus,
  &.open {
    border: 1px solid ${({ theme }) => theme.colors.brand.accent} !important;
    color: ${({ theme }) => theme.colors.brand.accent};
  }
`;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navigation>
      <LogoLink disabled={location.pathname === "/"} />
      <NavLinks>
        <Button
          onClick={() => navigate("/eulers-method")}
          style={{
            paddingInline: "14px",
            marginRight: "8px",
          }}
        >
          Euler&apos;s Method Calculator
        </Button>
        <Button
          onClick={() => window.open("https://kalinpatel.me/plus-c", "_blank")}
          style={{
            paddingInline: "14px",
            marginRight: "8px",
          }}
        >
          About
        </Button>
      </NavLinks>
    </Navigation>
  );
}
