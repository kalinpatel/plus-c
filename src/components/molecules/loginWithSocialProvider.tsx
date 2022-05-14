import {
  firebaseAnalytics,
  firebaseAuth,
  firebaseProviderGoogle,
  firebaseProviderMicrosoft,
  getOrganizationAffiliation,
} from "@/firebase";
import handleError from "@/firebase/authErrorHandler";
import { logEvent } from "firebase/analytics";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { SiMicrosoftoffice } from "react-icons/si";
import styled from "styled-components";

const ProviderButton = styled.button`
  background-color: ${({ theme }) => theme.colors.themed.major};
  width: calc(100% - 40px);
  margin: 0px auto;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  height: 35px;
  border: 1px solid ${({ theme }) => theme.colors.themed.minor};
  color: ${({ theme }) => theme.colors.themed.minor};
  position: relative;
  font-weight: 500;
  transition: all 0.18s ease-in-out;
  cursor: pointer;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  svg {
    position: relative;
    left: -8px;
    top: 2px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
    transform: scale(1.01);
  }
  &.magic {
    margin-left: 20px;
    transform: scale(1);
    cursor: not-allowed;
    background-color: ${({ theme }) =>
      theme.darkMode
        ? theme.colors.peripheral.extraDarkGrey
        : theme.colors.peripheral.extraLightGrey};
    &.loading-shown {
      pointer-events: none !important;
    }
  }
`;

export default function LoginWithSocialProvider() {
  function handleSignIn(
    authProvider: GoogleAuthProvider | OAuthProvider,
    displayName: string
  ) {
    toast
      .promise(
        signInWithPopup(firebaseAuth, authProvider),
        {
          loading: `Signing in with ${displayName}...`,
          success: `Signed in with ${displayName}`,
          error: handleError,
        },
        {
          error: {
            duration: 6000,
          },
        }
      )
      .then(({ user }: any) => {
        const organizationAffiliation = getOrganizationAffiliation(user);
        let eventProperties;
        if (organizationAffiliation) {
          eventProperties = {
            method: displayName,
            value: organizationAffiliation,
          };
        } else {
          eventProperties = {
            method: displayName,
          };
        }
        logEvent(firebaseAnalytics, "login", eventProperties);
      });
  }

  return (
    <>
      <ProviderButton
        onClick={() => {
          handleSignIn(firebaseProviderGoogle, "Google");
        }}
      >
        <FcGoogle />
        Continue with Google
      </ProviderButton>
      <ProviderButton
        onClick={() => {
          handleSignIn(firebaseProviderMicrosoft, "Microsoft");
        }}
      >
        <SiMicrosoftoffice style={{ fill: "#DC3E15" }} />
        Continue with Microsoft
      </ProviderButton>
    </>
  );
}
