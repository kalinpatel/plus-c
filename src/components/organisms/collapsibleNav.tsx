import SignOutButton from "@/atoms/signOutButton";
import Logo from "@/brand/logo";
import pages from "@/pages/index";
import { Menu, MenuHeader, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { UserInfo } from "firebase";
import React, { useState } from "react";
import { CgClose, CgMenuLeft } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";

const NavbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 94px;
  border-radius: 0px;
  background-color: transparent;
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
  .dropdown-icon:hover,
  .dropdown-icon:focus {
    color: ${({ theme }) => theme.colors.brand.tertiary};
  }
  &.open .dropdown-icon {
    color: ${({ theme }) => theme.colors.themed.minor};
  }
  &.open .dropdown-icon:hover {
    color: ${({ theme }) => theme.colors.brand.tertiary};
  }
  .always-visible-button {
    display: block;
    z-index: 1000000;
    position: fixed;
    top: 12px;
    right: 12px;
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
          theme.darkMode
            ? theme.colors.peripheral.darkGrey
            : theme.colors.peripheral.extraLightGrey};
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
          &:hover {
            background-color: ${({ theme }) =>
              theme.colors.peripheral.majorVariant};
          }
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

interface CollapsibleNavProps {
  user: UserInfo | null | undefined;
}

export default function CollapsibleNav({ user }: CollapsibleNavProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const allSubMenuSetters: Array<
    React.Dispatch<React.SetStateAction<boolean>>
  > = [];

  return (
    <CollapsibleMenu
      menuButton={({ open }) => (
        <NavbarButton
          className={open ? "open" : "closed"}
          aria-label="Navigation Menu Button"
        >
          <Logo
            type={theme.darkMode ? "text-light" : "text-dark"}
            className="logo"
          />
          {open ? (
            <CgClose className="dropdown-icon" />
          ) : (
            <CgMenuLeft className="dropdown-icon" />
          )}
        </NavbarButton>
      )}
      transition
      menuClassName="inner-menu"
    >
      <>
        <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
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
        {pages.map((category, categoryIndex) => {
          const [subMenuOpen, setSubMenuOpen] = useState(false);
          allSubMenuSetters.push(setSubMenuOpen);
          return (
            <div key={`${categoryIndex}-wrapper`}>
              <InternalDropdown
                key={`${categoryIndex}-button`}
                onClick={(e) => {
                  e.keepOpen = true;
                  setSubMenuOpen(!subMenuOpen);
                }}
              >
                {category.name}
                <RiArrowDropDownLine
                  className={`dropdown-arrow ${subMenuOpen ? "up" : "down"}`}
                />
              </InternalDropdown>
              <SubDropdown
                key={`${categoryIndex}-menu`}
                className={`sub-menu ${subMenuOpen ? "open" : "closed"}`}
              >
                {category.items.map((item, itemIndex) => {
                  if (item.header) {
                    return (
                      <MenuHeader
                        className="indented"
                        key={`${categoryIndex}-${itemIndex}-header`}
                      >
                        {item.header}
                      </MenuHeader>
                    );
                  } else {
                    return (
                      <MenuItem
                        className={`indented ${
                          location.pathname.includes(
                            `/${category.path}/${item.path}`
                          )
                            ? "current"
                            : ""
                        }`}
                        key={`${categoryIndex}-${itemIndex}-item`}
                        onClick={() => {
                          if (
                            location.pathname !==
                            `/${category.path}/${item.path}`
                          ) {
                            navigate(`/${category.path}/${item.path}`);
                          } else {
                            setSubMenuOpen(false);
                          }
                        }}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  }
                })}
              </SubDropdown>
            </div>
          );
        })}
      </>
    </CollapsibleMenu>
  );
}
