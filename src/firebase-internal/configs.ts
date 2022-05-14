interface FirebaseConfiguration {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface GoogleConfiguration {
  client_id: string;
}

const firebaseConfig: FirebaseConfiguration = {
  apiKey: import.meta.env.REACT_CLIENT_FIREBASE_API_KEY,
  authDomain: import.meta.env.REACT_CLIENT_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.REACT_CLIENT_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.REACT_CLIENT_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.REACT_CLIENT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_CLIENT_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_CLIENT_FIREBASE_APP_ID,
  measurementId: import.meta.env.REACT_CLIENT_FIREBASE_MEASUREMENT_ID,
};

const googleConfig: GoogleConfiguration = {
  client_id: import.meta.env.REACT_CLIENT_GOOGLE_CLIENT_ID,
};

export { firebaseConfig, googleConfig };
