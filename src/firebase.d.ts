import "firebase";

declare module "firebase" {
  interface UserInfo {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
  }
  interface FirebaseError {
    /**
     * Error codes are strings using the following format: `"service/string-code"`.
     * Some examples include `"app/no-app"` and `"auth/user-not-found"`.
     *
     * While the message for a given error can change, the code will remain the same
     * between backward-compatible versions of the Firebase SDK.
     */
    code: string;
    /**
     * An explanatory message for the error that just occurred.
     *
     * This message is designed to be helpful to you, the developer. Because
     * it generally does not convey meaningful information to end users,
     * this message should not be displayed in your application.
     */
    message: string;
    /**
     * The name of the class of errors, which is `"FirebaseError"`.
     */
    name: string;
    /**
     * A string value containing the execution backtrace when the error originally
     * occurred. This may not always be available.
     *
     * When it is available, this information can be sent to
     * {@link https://firebase.google.com/support/ Firebase Support} to help
     * explain the cause of an error.
     */
    stack?: string;
  }
}
