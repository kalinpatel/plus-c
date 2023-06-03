import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { firebaseConfig } from "./configs";

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
export const firebaseAnalytics = getAnalytics(firebaseApp);

// Initialize Firebase Performance Monitoring
export const firebasePerformance = getPerformance(firebaseApp);
