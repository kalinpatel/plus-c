import SignInButton from "@/atoms/signInButton";
import StudyLogo from "@/brand/assets/StudyLogo.svg";
import StudyLogoDark from "@/brand/assets/StudyLogoDark.svg";
import { firebaseAuth } from "@/firebase";
import UserAccountMenu from "@/molecules/userAccountMenu";
import CollapsibleNav from "@/organisms/studyCollapsibleNav";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiPlus } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { useMediaQuery } from "usehooks-ts";

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

const SignInFiller = styled.div`
  width: 100px;
  pointer-events: none;
`;

const MenuButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid transparent;
  cursor: pointer;
  background: none;
  color: ${({ theme }) => theme.colors.themed.minor};
  transition: color 0.18s ease-in-out, border 0.18s ease-in-out;
  &.last {
    margin-right: 12px;
  }
  & > .icon {
    margin-right: 6px;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.brand.accent};
    border: 1px solid ${({ theme }) => theme.colors.brand.accent};
    img {
      scale: 1.1;
    }
  }
`;

const Logo = styled.img`
  height: 75px;
  margin-left: 10px;
`;

export default function Navbar() {
  const isResponsiveNavbar = useMediaQuery("(max-width: 992px)");
  const location = useLocation();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(firebaseAuth);
  const theme = useTheme();

  return (
    <>
      {isResponsiveNavbar ? (
        <CollapsibleNav user={user} />
      ) : (
        <Navigation>
          <Logo src={theme.darkMode ? StudyLogoDark : StudyLogo} />
          <NavLinks>
            <MenuButton
              onClick={() => navigate("/")}
              className={location.pathname !== "/study" ? "" : "last"}
            >
              <IoArrowBack className="icon" />
              Exit to +C
            </MenuButton>
            {location.pathname !== "/study" && (
              <MenuButton onClick={() => navigate("/study")} className="last">
                <BiPlus className="icon" />
                Study a new set
              </MenuButton>
            )}
            {!loading && user ? (
              <UserAccountMenu user={user} />
            ) : loading ? (
              <SignInFiller />
            ) : !user ? (
              <SignInButton />
            ) : (
              <SignInFiller />
            )}
          </NavLinks>
        </Navigation>
      )}
    </>
  );
}
