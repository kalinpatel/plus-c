import {
  firebaseAnalytics,
  firebaseAuth,
  getOrganizationAffiliation,
} from "@/firebase";
import handleError from "@/firebase/authErrorHandler";
import { googleConfig } from "@/firebase/configs";
import { logEvent } from "firebase/analytics";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleOneTapLogin from "react-google-one-tap-login";
import toast from "react-hot-toast";
import { useWindowSize } from "usehooks-ts";

interface OneTapLoginProps {
  disabled?: boolean;
}

interface AnalyticsProperties {
  method: string;
  value?: number;
}

export default function OneTapLogin({ disabled }: OneTapLoginProps) {
  const [signedIn] = useAuthState(firebaseAuth);
  const [hidden, setHidden] = useState(false);
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (windowWidth < 768) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [windowWidth]);

  function handleOneTapLogin({ credential }: any) {
    if (!credential) return;

    const parsedCredential = GoogleAuthProvider.credential(credential);

    toast
      .promise(
        signInWithCredential(firebaseAuth, parsedCredential),
        {
          loading: "Signing in...",
          success: "Successfully signed in!",
          error: handleError,
        },
        {
          style: {
            minWidth: "260px",
          },
        }
      )
      .then(({ user }) => {
        const organization = getOrganizationAffiliation(user);
        const eventProperties: AnalyticsProperties = {
          method: "Google",
        };
        if (organization) eventProperties.value = organization;
        logEvent(firebaseAnalytics, "sign_in", eventProperties);
      });
  }

  return (
    <>
      {!disabled && !signedIn && !hidden && (
        <GoogleOneTapLogin
          onError={console.log}
          disabled={!!signedIn || disabled || hidden}
          googleAccountConfigs={{
            callback: handleOneTapLogin,
            cancel_on_tap_outside: false,
            client_id: googleConfig.client_id,
          }}
        />
      )}
    </>
  );
}
