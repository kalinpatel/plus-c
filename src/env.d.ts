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
  readonly REACT_CLIENT_GOOGLE_CLIENT_ID: string;
  readonly REACT_CLIENT_GOOGLE_RECAPTCHA_KEY: string;
  readonly REACT_CLIENT_FIREBASE_REDIRECT_ORIGIN: string;
  readonly REACT_CLIENT_FIREBASE_API_DOMAIN;
  readonly REACT_CLIENT_FIREBASE_LINK_DOMAIN;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
