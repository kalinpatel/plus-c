import SignOutButton from "@/atoms/signOutButton";
import { firebaseAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import { useMediaQuery } from "usehooks-ts";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.themed.minor};
  width: calc(100% - 20px);
  height: fit-content;
  padding: 10px;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100vw - 60px);
    padding: 10px;
    margin: 0 auto;
  }
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
`;

const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  p,
  h3 {
    margin: 0;
  }
  h3 {
    margin-bottom: 8px;
  }
  user-select: none;
  color: ${({ theme }) => theme.colors.themed.minor};
  .mobile-sign-out {
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const DesktopSignOutButton = styled.button`
  width: 100px;
  height: 35px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.colors.themed.minor};
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.themed.minor};
  color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  transition: background-color 0.18s ease-in-out, color 0.18s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.action.error};
    color: ${({ theme }) => theme.colors.themed.alwaysLight};
  }
`;

export default function ProfileContainer() {
  const isOnMobileScreen = useMediaQuery("(max-width: 768px)");

  return (
    <UserContainer>
      <ProfilePicture src={firebaseAuth.currentUser?.photoURL || ""} />
      <ProfileInfo>
        <h3>{firebaseAuth.currentUser?.displayName}</h3>
        <p>{firebaseAuth.currentUser?.email}</p>
        {isOnMobileScreen ? (
          <SignOutButton freeform className="mobile-sign-out" />
        ) : (
          <DesktopSignOutButton onClick={() => signOut(firebaseAuth)}>
            Sign Out
          </DesktopSignOutButton>
        )}
      </ProfileInfo>
    </UserContainer>
  );
}
