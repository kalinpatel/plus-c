import SignOutButton from "@/atoms/signOutButton";
import StudyLogo from "@/brand/assets/StudyLogo.svg";
import useIsInstalledMobile from "@/hooks/useIsInstalledMobile";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { UserInfo } from "firebase";
import { useEffect, useRef, useState } from "react";
import { CgClose, CgMenuLeft } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { useLockedBody } from "usehooks-ts";
import StudyLogoDark from "@/brand/assets/StudyLogoDark.svg";

const Wrapper = styled.div`
  &.mobile {
    position: fixed;
    top: 0;
    z-index: 9998;
    .inner-menu {
      border-radius: 0px;
      height: calc(100vh - 50px);
      overflow-y: scroll;
      position: fixed;
      top: 50px !important;
    }
  }
`;

const NavbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 94px;
  border-radius: 0px;
  background-color: ${({ theme }) => theme.colors.themed.major};
  border: none;
  .logo {
    height: 45px;
  }
  .dropdown-icon {
    height: 38px;
    width: 38px;
    color: ${({ theme }) => theme.colors.themed.minor};
    cursor: pointer;
    margin-right: 30px;
    transition: color 0.18s ease-in-out;
  }
  .dropdown-icon:hover {
    color: ${({ theme }) => theme.colors.brand.tertiary};
  }
  &.open .dropdown-icon {
    color: ${({ theme }) => theme.colors.themed.minor};
  }
  &.open .dropdown-icon:hover {
    color: ${({ theme }) => theme.colors.brand.tertiary};
  }
  ${Wrapper}.mobile & {
    height: 50px;
    padding-bottom: 5px;
    box-shadow: 0px 0px 10px
      ${({ theme }) =>
        theme.darkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)"};
    .logo {
      height: 35px;
      position: relative;
      left: -10%;
    }
  }
`;

const CollapsibleMenu = styled(Menu)`
  position: static;
  height: fit-content;
  .inner-menu {
    position: static;
    width: 100vw !important;
    height: fit-content;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
    margin-bottom: 10px;
    .szh-menu__item {
      width: calc(100% - 24px - 48px);
      margin-left: 12px;
      margin-right: 12px;
      margin-bottom: 4px;
      color: ${({ theme }) => theme.colors.themed.minor};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 10px 24px;
      &:hover {
        background-color: ${({ theme }) =>
          theme.colors.peripheral.majorVariant};
      }
      &.indented {
        margin-left: 30px;
        width: calc(100% - 42px - 48px);
        &::before {
          content: "-";
          margin-right: 6px;
        }
        &.current {
          color: ${({ theme }) => theme.colors.peripheral.grey};
          cursor: default;
        }
      }
    }
    .szh-menu__header.indented {
      margin-left: 54px;
      padding-left: 0px;
      padding-right: 4px;
      width: fit-content;
      color: ${({ theme }) => theme.colors.peripheral.minorVariant};
      border-bottom: 1px solid
        ${({ theme }) => theme.colors.peripheral.minorVariant};
    }
  }
`;

const InternalDropdown = styled(MenuItem)`
  position: relative;
  .dropdown-arrow {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 12px;
    transition: transform 0.18s ease-in-out;
    &.up {
      transform: rotate(180deg);
    }
  }
  &.open {
    color: ${({ theme }) => theme.colors.themed.alwaysDark} !important;
  }
  &.closed {
    background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  }
`;

const SubDropdown = styled.div`
  display: none;
  &.open {
    display: block;
  }
`;

const SignOutButtonWrapper = styled.div`
  margin-left: 38px;
  width: calc(100% - 40px);
  @media (max-width: ${({ theme }) =>
      theme.breakpoints.lg}) and (min-width: ${({ theme }) =>
      theme.breakpoints.sm}) {
    width: 240px;
  }
`;

const Logo = styled.img`
  height: 60px;
  margin-left: 10px;
`;

interface CollapsibleNavProps {
  user: UserInfo | null | undefined;
}

export default function CollapsibleNav({ user }: CollapsibleNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isMobilePWA = useIsInstalledMobile();
  const [, setLockedBody] = useLockedBody();
  const menuRef = useRef<HTMLElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (isMobilePWA && menuRef.current) {
      const touchEvents = [
        "touchstart",
        "touchmove",
        "touchend",
        "touchcancel",
      ];
      touchEvents.forEach((event) => {
        menuRef.current?.addEventListener(event, (e) => {
          console.log(e);
          e.stopPropagation();
        });
      });
    }
  }, [menuRef]);

  return (
    <Wrapper className={isMobilePWA ? "mobile" : ""}>
      <CollapsibleMenu
        menuButton={({ open }) => {
          if (isMobilePWA) {
            console.log(open);
            setLockedBody(true);
          }
          return (
            <NavbarButton
              className={open ? "open" : "closed"}
              aria-label="Navigation Menu Button"
            >
              <Logo src={theme.darkMode ? StudyLogoDark : StudyLogo} />
              {open ? (
                <CgClose className="dropdown-icon" />
              ) : (
                <CgMenuLeft className="dropdown-icon" />
              )}
            </NavbarButton>
          );
        }}
        transition
        menuClassName="inner-menu"
        ref={menuRef}
      >
        <>
          <MenuItem onClick={() => navigate("/")}>Back to +C</MenuItem>
          {user ? (
            <>
              <InternalDropdown
                onClick={(e) => {
                  e.keepOpen = true;
                  setUserMenuOpen(!userMenuOpen);
                }}
              >
                {user.displayName
                  ? `Account: ${user.displayName}`
                  : "Account Options"}
                <RiArrowDropDownLine
                  className={`dropdown-arrow ${userMenuOpen ? "up" : "down"}`}
                />
              </InternalDropdown>
              <SubDropdown
                className={`sub-menu ${userMenuOpen ? "open" : "closed"}`}
              >
                <MenuItem
                  className="indented"
                  onClick={() => navigate("/user/history")}
                >
                  History
                </MenuItem>
                <MenuItem
                  className="indented"
                  onClick={() => navigate("/user/settings")}
                >
                  Settings
                </MenuItem>
                <SignOutButtonWrapper>
                  <SignOutButton />
                </SignOutButtonWrapper>
              </SubDropdown>
            </>
          ) : (
            <MenuItem
              onClick={() =>
                navigate("/user/auth", {
                  state: location.pathname,
                })
              }
            >
              Sign In
            </MenuItem>
          )}
          <MenuItem onClick={() => navigate("/study")}>Start Studying</MenuItem>
        </>
      </CollapsibleMenu>
    </Wrapper>
  );
}
