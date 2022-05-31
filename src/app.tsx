import { firebaseApp } from "@/firebase";
import useIsInstalledMobile from "@/hooks/useIsInstalledMobile";
import NotFound from "@/pages/404";
import HelpPage from "@/pages/help";
import Home from "@/pages/home";
import License from "@/pages/legal/license";
import TermsOfUse from "@/pages/legal/terms";
import Auth from "@/pages/user/auth";
import Settings from "@/pages/user/settings";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { AnimatePresence } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import EulersMethod from "./pages/content/methods/eulersMethod";
import ShareHandler from "./pages/shareHandler";

const DesktopAnimation = {
  initial: { opacity: 0, y: "unset" },
  animate: {
    opacity: 1,
    y: "unset",
    transition: { duration: 0.28 },
  },
  exit: { opacity: 0, y: "-5vh", transition: { duration: 0.15 } },
};

const MobileAnimation = {
  initial: { opacity: 0, y: "0vh" },
  animate: {
    opacity: 1,
    y: "0vh",
    transition: { duration: 0.08 },
  },
  exit: { opacity: 0, y: "0vh", transition: { duration: 0.08 } },
};

export const AnimationContext = createContext(DesktopAnimation);

export default function App() {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(
      import.meta.env.REACT_CLIENT_GOOGLE_RECAPTCHA_KEY
    ),
    isTokenAutoRefreshEnabled: true,
  });

  const location = useLocation();
  const isMobilePWA = useIsInstalledMobile();
  const [animationValue, setAnimationValue] = useState(DesktopAnimation);

  useEffect(() => {
    if (isMobilePWA) {
      setAnimationValue(MobileAnimation);
    } else {
      setAnimationValue(DesktopAnimation);
    }
  }, [isMobilePWA]);

  return (
    <AnimationContext.Provider value={animationValue}>
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
          {/* Methods */}
          <Route path="/methods/eulers-method" element={<EulersMethod />} />
          {/* Help */}
          <Route path="/help" element={<HelpPage />} />
          {/* Share Handler */}
          <Route path="/share/*" element={<ShareHandler />} />
          <Route path="/link/*" element={<ShareHandler />} />
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </AnimationContext.Provider>
  );
}
