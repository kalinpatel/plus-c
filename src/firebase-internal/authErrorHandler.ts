import { FirebaseError } from "firebase";

export default function handleError(error: FirebaseError): string {
  console.warn(`Auth Error Occurred: ${error.code}`);
  switch (error.code) {
    case "auth/account-exists-with-different-credential":
      return "You signed in with a different provider for this email.";
    case "auth/user-disabled":
      return "Your account has been disabled.";
    case "auth/popup-blocked":
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "You have cancelled the login process. Try again.";
    case "auth/user-cancelled":
      return "You did not complete the entire login process. Try again.";
    default:
      return `An unknown error occurred. Please try again. Error Code: ${error.code}`;
  }
}
