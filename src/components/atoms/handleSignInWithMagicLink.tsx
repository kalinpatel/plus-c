import {
  firebaseAnalytics,
  firebaseAuth,
  getOrganizationAffiliation,
} from "@/firebase";
import handleError from "@/firebase/authErrorHandler";
import { logEvent } from "firebase/analytics";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";

export default function HandleSignInWithMagicLink() {
  const navigate = useNavigate();
  useEffectOnce(() => {
    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
      let retrievedEmail = window.localStorage.getItem("emailForSignIn");
      if (!retrievedEmail) {
        retrievedEmail = window.prompt(
          "Please provide your email for confirmation"
        );
      }
      toast
        .promise(signInWithEmailLink(firebaseAuth, retrievedEmail!), {
          loading: "Logging you in...",
          success: "Successfully logged in",
          error: handleError,
        })
        .then((userCredential) => {
          const redirectLink = window.localStorage.getItem(
            "redirectLinkForSignIn"
          );
          window.localStorage.removeItem("emailForSignIn");
          window.localStorage.removeItem("redirectLinkForSignIn");

          const organizationAffiliation = getOrganizationAffiliation(
            userCredential.user
          );
          let eventProperties;
          if (organizationAffiliation) {
            eventProperties = {
              method: "Magic Link",
              value: organizationAffiliation,
            };
          } else {
            eventProperties = {
              method: "Magic Link",
            };
          }
          logEvent(firebaseAnalytics, "login", eventProperties);

          if (redirectLink) {
            navigate(redirectLink);
          } else {
            navigate("/");
          }
        });
    }
  });
  return null;
}
