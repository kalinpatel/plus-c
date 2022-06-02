import { FiLogIn } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginButton = styled.button`
  width: 100px;
  height: 35px;
  color: ${({ theme }) => theme.colors.themed.minor};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.brand.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ theme }) => theme.colors.brand.tertiary};
  font-weight: 500;
  padding-inline: 12px;
  transition: all 0.18s ease-in-out;
  ${({ theme }) =>
    !theme.darkMode && "box-shadow: 0px 2px 3px 1px rgba(0,0,0,0.1);"};
  &:hover {
    color: ${({ theme }) => theme.colors.brand.tertiary};
    background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  }
  svg {
    position: relative;
    top: 3px;
  }
  animation: fadeIn 0.18s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SignInIcon = styled(FiLogIn)`
  margin-right: 4px;
`;

export default function SignInButton() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <LoginButton
      onClick={() => {
        if (location.pathname !== "/user/auth") {
          navigate("/user/auth", {
            state: window.location.pathname,
          });
        }
      }}
    >
      <SignInIcon />
      Sign In
    </LoginButton>
  );
}
