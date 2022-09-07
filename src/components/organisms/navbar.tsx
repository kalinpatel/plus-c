import LogoLink from "@/atoms/logoLink";
import SignInButton from "@/atoms/signInButton";
import Lightbulb from "@/brand/assets/Lightbulb.svg";
import { firebaseAuth } from "@/firebase";
import Dropdown, { DropdownButton } from "@/molecules/dropdownMenu";
import UserAccountMenu from "@/molecules/userAccountMenu";
import CollapsibleNav from "@/organisms/collapsibleNav";
import pages from "@/pages/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
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

const StudyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  margin-right: 12px;
  height: 35px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid transparent;
  cursor: pointer;
  background: none;
  color: ${({ theme }) => theme.colors.themed.minor};
  transition: color 0.18s ease-in-out, border 0.18s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.brand.accent};
    border: 1px solid ${({ theme }) => theme.colors.brand.accent};
    img {
      filter: invert(30%) sepia(44%) saturate(3312%) hue-rotate(317deg)
        brightness(88%) contrast(93%);
    }
  }
`;

const LightbulbIcon = styled.img`
  transition: scale 0.18s ease-in-out;
  transform: translateY(-2px);
  height: 25px;
  margin-right: 10px;
  transition: filter 0.18s ease-in-out;
  ${({ theme }) =>
    theme.darkMode
      ? "filter: invert(95%) sepia(10%) saturate(199%) hue-rotate(77deg) brightness(118%) contrast(92%);"
      : "filter: invert(14%) sepia(0%) saturate(1205%) hue-rotate(181deg) brightness(99%) contrast(81%);"};
`;

export default function Navbar() {
  const isResponsiveNavbar = useMediaQuery("(max-width: 992px)");
  const location = useLocation();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(firebaseAuth);

  return (
    <>
      {isResponsiveNavbar ? (
        <CollapsibleNav user={user} />
      ) : (
        <Navigation>
          <LogoLink disabled={location.pathname === "/"} />
          <NavLinks>
            {location.pathname !== "/" && (
              <DropdownButton
                onClick={() => navigate("/")}
                style={{
                  paddingInline: "14px",
                  marginRight: "8px",
                }}
              >
                Home
              </DropdownButton>
            )}
            {pages.map((page) => (
              <Dropdown
                name={page.name}
                path={page.path}
                items={page.items}
                key={page.name}
              />
            ))}
            <StudyButton onClick={() => navigate("/study")}>
              <LightbulbIcon src={Lightbulb} alt="Lightbulb icon" />
              Study
            </StudyButton>
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
