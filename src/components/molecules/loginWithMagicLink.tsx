import { firebaseAuth } from "@/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImMagicWand } from "react-icons/im";
import styled from "styled-components";

const SendButton = styled.button`
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
`;

const EmailInput = styled.input`
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  width: calc(100% - 57px);
  margin: 0px 20px;
  margin-bottom: 10px;
  padding-left: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  height: 35px;
  border: 2px solid ${({ theme }) => theme.colors.themed.minor};
  color: ${({ theme }) => theme.colors.themed.minor};
  position: relative;
  font-weight: 500;
  &::placeholder {
    color: ${({ theme }) => theme.colors.peripheral.minorVariant};
    opacity: 0.8;
    font-weight: 400;
  }
  &:valid {
    border-color: ${({ theme }) => theme.colors.action.success};
    & + ${SendButton} {
      background-color: white;
      color: ${({ theme }) => theme.colors.action.success};
      border-color: ${({ theme }) => theme.colors.action.success};
      cursor: pointer;
      &:hover {
        transform: scale(1.01);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
      }
    }
  }
  &.loading-shown {
    pointer-events: none !important;
  }
`;

const FormReplacementDiv = styled.div`
  height: 95px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  left: calc(50% - 10px);
  top: calc(50% - 11px);
  border: 3px solid ${({ theme }) => theme.colors.themed.alwaysDark};
  border-top: 3px solid ${({ theme }) => theme.colors.brand.tertiary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface LoginWithMagicLinkProps {
  referrer?: string | null | undefined;
}

export default function LoginWithMagicLink({
  referrer,
}: LoginWithMagicLinkProps) {
  const referrerState = referrer || "/";
  const [sendingState, setSendingState] = useState("not-sent");

  async function sendMagicLink(event: any) {
    const email = event.target[0].value;
    event.preventDefault();

    const actionCodeSettings = {
      url: `${import.meta.env.REACT_CLIENT_FIREBASE_REDIRECT_ORIGIN}/user/auth`,
      handleCodeInApp: true,
    };

    setSendingState("sending");
    await toast.promise(
      sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings),
      {
        loading: "Sending magic link",
        success: "Magic link sent",
        error: (error) => {
          return error.message;
        },
      }
    );
    setSendingState("sent");
    window.localStorage.setItem("emailForSignIn", email);
    window.localStorage.setItem("redirectForLinkSignIn", referrerState);
  }

  return (
    <form onSubmit={sendMagicLink}>
      {sendingState === "not-sent" || sendingState === "sending" ? (
        <>
          <EmailInput
            placeholder="Enter your email"
            type="email"
            required
            autoComplete="email"
            className={sendingState === "sending" ? "loading-shown" : ""}
          />
          <SendButton
            type="submit"
            className={sendingState === "sending" ? "loading-shown" : ""}
          >
            {sendingState === "not-sent" ? (
              <>
                <ImMagicWand />
                Send me a Magic Link
              </>
            ) : (
              <LoadingSpinner />
            )}
          </SendButton>
        </>
      ) : (
        <FormReplacementDiv>
          <p>
            <strong>Sent!</strong> Check your email for a link to sign in.
          </p>
        </FormReplacementDiv>
      )}
    </form>
  );
}
