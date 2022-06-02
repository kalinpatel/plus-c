import LogoLink from "@/atoms/logoLink";
import SignInButton from "@/atoms/signInButton";
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
