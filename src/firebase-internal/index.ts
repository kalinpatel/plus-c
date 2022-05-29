import { UserInfo } from "firebase";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getPerformance } from "firebase/performance";
import { firebaseConfig } from "./configs";

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

// Firebase Auth Providers
export const firebaseProviderGoogle = new GoogleAuthProvider();
export const firebaseProviderMicrosoft = new OAuthProvider("microsoft.com");

// Initialize Firebase Analytics
export const firebaseAnalytics = getAnalytics(firebaseApp);

// Initialize Firebase Performance Monitoring
export const firebasePerformance = getPerformance(firebaseApp);

export function getOrganizationAffiliation(user: UserInfo) {
  const organizationsToCheck = [
    {
      domain: "@student.dist113.org",
      // 100s for DHS, 200s for HPHS
      value: (email: string) =>
        Number(`${email.substring(2, 3)}${email.substring(0, 2)}`),
    },
    {
      domain: "@dist113.org",
      // 333 for faculty (300s)
      value: () => 333,
    },
  ];
  for (const organization of organizationsToCheck) {
    if (user.email?.includes(organization.domain)) {
      return organization.value(user.email);
    }
  }
  return null;
}
