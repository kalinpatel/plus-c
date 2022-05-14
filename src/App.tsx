import { firebaseApp } from "@/firebase";
import NotFound from "@/pages/404";
import Home from "@/pages/home";
import License from "@/pages/legal/license";
import TermsOfUse from "@/pages/legal/terms";
import Auth from "@/pages/user/auth";
import Settings from "@/pages/user/settings";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

export default function App() {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(
      import.meta.env.REACT_CLIENT_GOOGLE_RECAPTCHA_KEY
    ),
    isTokenAutoRefreshEnabled: true,
  });

  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {/* Home page */}
        <Route index element={<Home />} />
        {/* User pages */}
        <Route path="/user/auth" element={<Auth />} />
        <Route path="/user/settings" element={<Settings />} />
        {/* Legal pages */}
        <Route path="/legal/license" element={<License />} />
        <Route path="/legal/terms" element={<TermsOfUse />} />
        <Route path="/legal/privacy" element={<TermsOfUse privacy />} />
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
