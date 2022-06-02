import { firebaseAuth } from "@/firebase";
import { MenuItem } from "@szhsin/react-menu";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MenuButton = styled(MenuItem)`
  font-weight: 500;
  width: calc(100% - 24px - 50px);
  text-align: center;
  margin-top: 10px;
  margin-left: 12px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.secondary};
  color: ${({ theme }) => theme.colors.themed.alwaysLight} !important;
  transition: all 0.18s ease-in-out;
  border: 1px solid ${({ theme }) => theme.colors.brand.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  &:hover {
    background-color: ${({ theme }) => theme.colors.themed.major};
    color: ${({ theme }) => theme.colors.action.error} !important;
    border-color: ${({ theme }) => theme.colors.action.error};
  }
`;

const FreeFormMenuButton = styled.button`
  font-weight: 500;
  width: calc(100% - 24px - 50px);
  text-align: center;
  margin-top: 10px;
  margin-left: 12px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.secondary};
  color: ${({ theme }) => theme.colors.themed.alwaysLight} !important;
  transition: all 0.18s ease-in-out;
  border: 1px solid ${({ theme }) => theme.colors.brand.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.themed.major};
    color: ${({ theme }) => theme.colors.action.error} !important;
    border-color: ${({ theme }) => theme.colors.action.error};
  }
`;

const SignOutIcon = styled(FiLogOut)`
  margin-right: 4px;
`;

interface SignOutButtonProps {
  freeform?: boolean;
  className?: string;
}

export default function SignOutButton({
  freeform,
  className,
}: SignOutButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (freeform) {
    return (
      <FreeFormMenuButton
        className={className}
        onClick={() =>
          signOut(firebaseAuth).then(() => {
            if (location.pathname !== "/user/auth") {
              navigate("/user/auth", {
                state: "signedOut",
              });
            }
          })
        }
      >
        <SignOutIcon /> Sign Out
      </FreeFormMenuButton>
    );
  } else {
    return (
      <MenuButton
        className={className}
        onClick={() => {
          navigate("/user/auth");
          toast.promise(signOut(firebaseAuth), {
            loading: "Signing out...",
            success: "Signed out successfully!",
            error: "Error signing out. Please try again.",
          });
        }}
      >
        <SignOutIcon /> Sign Out
      </MenuButton>
    );
  }
}
