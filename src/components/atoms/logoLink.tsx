import Logo from "@/brand/logo";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";

const StyledLink = styled.button`
  display: flex;
  align-items: center;
  height: auto;
  width: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  & > svg {
    margin: 0px 20px;
    height: 50px;
    width: 61px;
  }
  &.disabled {
    cursor: default;
  }
`;

interface LogoLinkProps {
  disabled?: boolean;
}

export default function LogoLink({ disabled }: LogoLinkProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <StyledLink
      onClick={() => {
        if (!disabled) {
          navigate("/");
        }
      }}
      className={disabled ? "disabled" : ""}
      aria-label="Home"
    >
      <Logo type={theme.darkMode ? "letter-light" : "letter-dark"} />
    </StyledLink>
  );
}
