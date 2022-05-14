import { Menu, MenuHeader, MenuItem, MenuProps } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { MdArrowDropDown } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const DropdownMenu = styled(Menu)`
  &,
  .inner-menu {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    background-color: ${({ theme }) =>
      theme.colors.peripheral.majorVariant} !important;
    padding: 10px 0px;
  }
`;

export const DropdownHeader = styled(MenuHeader)`
  margin-left: 18px;
  margin-right: 12px;
  padding-left: 0px;
  padding-right: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: fit-content;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.peripheral.minorVariant};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.peripheral.minorVariant};
`;

export const DropdownItem = styled(MenuItem)`
  margin-left: 12px;
  margin-right: 12px;
  padding-left: 6px;
  padding-right: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  color: ${({ theme }) => theme.colors.themed.minor};
  &.current {
    cursor: default;
    color: ${({ theme }) => theme.colors.peripheral.grey};
    &:hover {
      background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
    }
  }
  &:hover:not(.current) {
    background-color: ${({ theme }) =>
      theme.darkMode
        ? theme.colors.peripheral.darkGrey
        : theme.colors.peripheral.extraLightGrey} !important;
  }
`;

export const DropdownButton = styled.button`
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
  svg {
    position: relative;
    height: 25px;
    width: auto;
  }
  &:hover,
  &:focus,
  &.open {
    border: 1px solid ${({ theme }) => theme.colors.brand.accent} !important;
    color: ${({ theme }) => theme.colors.brand.accent};
  }
  &:hover:not(.open) {
    svg {
      animation: bounce 0.9s ease-in-out 4;
      @keyframes bounce {
        0% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-1px);
        }
        60% {
          transform: translateY(2px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
`;

interface ItemOptions {
  header?: string;
  name?: string;
  path?: string;
}

interface DropdownOptions {
  name: string;
  items: Array<ItemOptions>;
  path: string;
  customButton?: JSX.Element;
  menuOptions?: MenuProps;
}

export default function Dropdown({
  name,
  items,
  customButton,
  path,
}: DropdownOptions) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <DropdownMenu
      menuButton={({ open }) =>
        customButton ? (
          customButton
        ) : (
          <DropdownButton className={`${open ? "open" : ""}`}>
            {name} <MdArrowDropDown />
          </DropdownButton>
        )
      }
      direction="bottom"
      offsetY={6}
      viewScroll="close"
      align="end"
      key={name}
      menuClassName="inner-menu"
      transition
    >
      {items.map((item) =>
        item.header ? (
          <DropdownHeader
            key={item.header.replace(/\s/g, "")}
            className="header"
          >
            {item.header}
          </DropdownHeader>
        ) : (
          <DropdownItem
            onClick={() => {
              const itemPath = `/${path}/${item.path}`;
              if (location.pathname !== itemPath) {
                navigate(itemPath);
              }
            }}
            key={item.name?.replace(/\s/g, "")}
            className={`${
              location.pathname.includes(`/${path}/${item.path}`)
                ? "current"
                : ""
            }`}
          >
            {item.name}
          </DropdownItem>
        )
      )}
    </DropdownMenu>
  );
}
