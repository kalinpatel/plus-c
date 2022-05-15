import SignOutButton from "@/atoms/signOutButton";
import {
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
} from "@/molecules/dropdownMenu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { UserInfo } from "firebase/index";
import { useEffect, useState } from "react";
import { MdHistory, MdSettings } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AuthButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  margin-left: 10px;
  padding-left: 26px;
  padding-right: 25px;
`;

const UserPicture = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.themed.major};
  transition: border-color 0.18s ease-in-out;
  &:hover,
  ${AuthButton}:hover > & {
    border-color: ${({ theme }) => theme.colors.brand.tertiary};
  }
`;

const EmptyUserPicture = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 25px;
  width: 25px;
  padding: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  border: 1.5px solid ${({ theme }) => theme.colors.peripheral.minorVariant};
  color: ${({ theme }) => theme.colors.themed.minor};
  fill: ${({ theme }) => theme.colors.themed.minor};
  transition: border-color 0.18s ease-in-out, fill 0.18s ease-in-out,
    color 0.18s ease-in-out;
  &:hover,
  ${AuthButton}:hover > & {
    border-color: ${({ theme }) => theme.colors.brand.tertiary};
    fill: ${({ theme }) => theme.colors.brand.tertiary};
    color: ${({ theme }) => theme.colors.brand.tertiary};
  }
`;

const UserName = styled(DropdownHeader)`
  font-size: 14px;
  text-align: center;
  width: calc(100% - 24px - 24px);
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-top: 0px;
  margin-top: 4px;
  padding-top: 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.peripheral.grey};
  color: ${({ theme }) => theme.colors.themed.minor};
`;

const HistoryIcon = styled(MdHistory)`
  margin-right: 4px;
`;

const SettingsIcon = styled(MdSettings)`
  margin-right: 4px;
`;

interface UserAccountMenuProps {
  user: UserInfo | null;
}

export default function UserAccountMenu({ user }: UserAccountMenuProps) {
  const navigate = useNavigate();

  const UserDefaultPicture: JSX.Element = (
    <EmptyUserPicture>
      <RiUser3Fill />
    </EmptyUserPicture>
  );
  const [userIconPicture, setUserIconPicture] =
    useState<JSX.Element>(UserDefaultPicture);
  function changeUserIconPicture(userPictureURL: any, userDisplayName: any) {
    if (userPictureURL) {
      setUserIconPicture(
        <UserPicture
          src={userPictureURL}
          referrerPolicy="no-referrer"
          alt="User Icon Picture"
        />
      );
    } else if (userDisplayName) {
      setUserIconPicture(
        <EmptyUserPicture>{userDisplayName.substring(0, 1)} </EmptyUserPicture>
      );
    } else {
      setUserIconPicture(UserDefaultPicture);
    }
  }
  useEffect(() => {
    changeUserIconPicture(user?.photoURL, user?.displayName);
  }, [user]);

  return (
    <DropdownMenu
      menuButton={() => (
        <AuthButton name="User Account Dropdown">{userIconPicture}</AuthButton>
      )}
      direction="bottom"
      align="end"
      offsetY={4}
      menuClassName="inner-menu"
      transition
    >
      <UserName>{user?.displayName}</UserName>
      <DropdownItem onClick={() => navigate("/user/history")}>
        <HistoryIcon /> History
      </DropdownItem>
      <DropdownItem onClick={() => navigate("/user/settings")}>
        <SettingsIcon /> Settings
      </DropdownItem>
      <SignOutButton />
    </DropdownMenu>
  );
}
