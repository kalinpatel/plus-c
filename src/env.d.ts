/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_CLIENT_FIREBASE_API_KEY: string;
  readonly REACT_CLIENT_FIREBASE_AUTH_DOMAIN: string;
  readonly REACT_CLIENT_FIREBASE_DATABASE_URL: string;
  readonly REACT_CLIENT_FIREBASE_PROJECT_ID: string;
  readonly REACT_CLIENT_FIREBASE_STORAGE_BUCKET: string;
  readonly REACT_CLIENT_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly REACT_CLIENT_FIREBASE_APP_ID: string;
  readonly REACT_CLIENT_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
