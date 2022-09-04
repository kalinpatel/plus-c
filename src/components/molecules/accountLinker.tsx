import { firebaseProviderGoogle, firebaseProviderMicrosoft } from "@/firebase";
import { UserInfo } from "firebase";
import { linkWithPopup, reauthenticateWithPopup, unlink } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { SiMicrosoftoffice } from "react-icons/si";
import styled from "styled-components";

interface AccountLinkerProps {
  user: any;
}

const ProviderList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  width: calc(100% - 40px);
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const ProviderButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  min-width: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.colors.themed.minor};
  cursor: pointer;
  font-weight: 500;
  & > svg {
    margin-right: 8px;
  }
  background-color: ${({ theme }) => theme.colors.peripheral.extraLightGrey};
  transition: background-color 0.18s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.peripheral.lightGrey};
  }
  color: ${({ theme }) => theme.colors.themed.alwaysDark};
  span {
    color: ${({ theme }) => theme.colors.action.success};
    margin-left: 4px;
  }

  &.connected {
    span {
      color: ${({ theme }) => theme.colors.action.error};
    }
  }
`;

export default function AccountLinker({ user }: AccountLinkerProps) {
  const [googleProviderStatus, setGoogleProviderStatus] = useState(false);
  const [microsoftProviderStatus, setMicrosoftProviderStatus] = useState(false);

  useEffect(() => {
    if (user) {
      user.providerData.forEach((provider: UserInfo) => {
        if (provider.providerId === "google.com") {
          setGoogleProviderStatus(true);
        } else if (provider.providerId === "microsoft.com") {
          setMicrosoftProviderStatus(true);
        }
      });
    }
  }, [user]);

  function getProviderFromId(user: any) {
    if (user.providerData[0].providerId === "microsoft.com") {
      return firebaseProviderMicrosoft;
    }
    return firebaseProviderGoogle;
  }

  function handleLink(provider: any, name: string, isLinked: boolean) {
    if (isLinked) {
      if (user.providerData.length > 1) {
        toast
          .promise(unlink(user, provider.providerId), {
            loading: "Unlinking...",
            success: `${name} unlinked`,
            error: `${name} unlink failed`,
          })
          .then(() => {
            if (provider.providerId === "google.com") {
              setGoogleProviderStatus(false);
            } else if (provider.providerId === "microsoft.com") {
              setMicrosoftProviderStatus(false);
            }
          });
      } else {
        toast.error("You must have at least one provider");
      }
    } else {
      toast
        .promise(linkWithPopup(user, provider), {
          loading: "Linking...",
          success: `${name} linked`,
          error: (err) => {
            if (err.code === "auth/requires-recent-login") {
              reauthenticateWithPopup(user, getProviderFromId(user));
              return "Please sign in again to link this account.";
            }
            return `Failed to link ${name}`;
          },
        })
        .then(() => {
          user.providerData.forEach((provider: UserInfo) => {
            if (provider.providerId === "google.com") {
              setGoogleProviderStatus(true);
            } else if (provider.providerId === "microsoft.com") {
              setMicrosoftProviderStatus(true);
            }
          });
        });
    }
  }

  return (
    <ProviderList>
      <ProviderButton
        className={googleProviderStatus ? "connected" : ""}
        onClick={() =>
          handleLink(firebaseProviderGoogle, "Google", googleProviderStatus)
        }
      >
        <FcGoogle />
        Google: <span>{googleProviderStatus ? "Unlink" : "Link"}</span>
      </ProviderButton>
      <ProviderButton
        className={microsoftProviderStatus ? "connected" : ""}
        onClick={() =>
          handleLink(
            firebaseProviderMicrosoft,
            "Microsoft",
            microsoftProviderStatus
          )
        }
      >
        <SiMicrosoftoffice style={{ fill: "#DC3E15" }} />
        Microsoft: <span>{microsoftProviderStatus ? "Unlink" : "Link"}</span>
      </ProviderButton>
    </ProviderList>
  );
}
