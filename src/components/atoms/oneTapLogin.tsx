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
import { useLocation } from "react-router-dom";
import { useEffectOnce, useWindowSize } from "usehooks-ts";

interface OneTapLoginProps {
  disabled?: boolean;
}

interface AnalyticsProperties {
  method: string;
  value?: number;
}

export default function OneTapLogin({ disabled }: OneTapLoginProps) {
  const [signedIn, loadingSignedIn] = useAuthState(firebaseAuth);
  const [hidden, setHidden] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const location = useLocation();

  useEffect(() => {
    if (windowWidth < 768) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [windowWidth]);

  useEffectOnce(() => {
    // Always present One Tap on new session
    document.cookie =
      "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

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
    <GoogleOneTapLogin
      onError={console.log}
      disabled={
        hidden ||
        disabled ||
        loadingSignedIn ||
        !!(!loadingSignedIn && signedIn) ||
        (location.pathname !== "/" &&
          !location.pathname.startsWith("/study") &&
          location.pathname !== "/study")
      }
      googleAccountConfigs={{
        callback: handleOneTapLogin,
        cancel_on_tap_outside: false,
        client_id: googleConfig.client_id,
      }}
    />
  );
}
