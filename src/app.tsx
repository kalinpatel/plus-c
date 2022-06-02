import { darkTheme, lightTheme, ThemeOptions } from "@/brand/theme";
import { firebaseApp } from "@/firebase";
import useIsInstalledMobile from "@/hooks/useIsInstalledMobile";
import Footer from "@/organisms/footer";
import Navbar from "@/organisms/navbar";
import NotFound from "@/pages/404";
import EulersMethod from "@/pages/content/methods/eulersMethod";
import HelpPage from "@/pages/help";
import Home from "@/pages/home";
import License from "@/pages/legal/license";
import TermsOfUse from "@/pages/legal/terms";
import ShareHandler from "@/pages/shareHandler";
import Auth from "@/pages/user/auth";
import Settings from "@/pages/user/settings";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { AnimatePresence } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useTernaryDarkMode } from "usehooks-ts";

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

const GlobalStyle = createGlobalStyle`
body > .ML__keyboard {
  --keyboard-background: ${({ theme }) =>
    theme.colors.brand.secondary} !important;
  --keyboard-text: #fff !important;
  --keyboard-text-active: ${({ theme }) =>
    theme.colors.brand.tertiary} !important;
  --keyboard-background-border: ${({ theme }) =>
    theme.colors.brand.secondary} !important;
  --keycap-background: ${({ theme }) =>
    theme.colors.peripheral.majorVariant} !important;
  --keycap-background-active: ${({ theme }) =>
    theme.darkMode
      ? theme.colors.peripheral.darkGrey
      : theme.colors.peripheral.extraLightGrey} !important;
  --keycap-modifier-background: ${({ theme }) =>
    theme.darkMode
      ? theme.colors.peripheral.darkGrey
      : theme.colors.peripheral.extraLightGrey} !important;
  --keycap-modifier-border: ${({ theme }) =>
    theme.darkMode
      ? theme.colors.peripheral.darkGrey
      : theme.colors.peripheral.extraLightGrey} !important;
  --keycap-text: ${({ theme }) => theme.colors.themed.minor} !important;

  @media (max-width: 768px) {
    .ML__keyboard--plate {
      padding-bottom: 40px !important;
    }
  }
}
body {
  background-color: ${({ theme }) => theme.colors.themed.major};
  font-family: ${({ theme }) => theme.typography.fontFamily};
}
`;

interface ThemeContectInterface {
  setting: ThemeOptions;
  setSetting: (setting: ThemeOptions) => void;
}

export const AnimationContext = createContext(DesktopAnimation);

export const themeContext = createContext<ThemeContectInterface>({
  setting: "light",
  setSetting: () => undefined,
});

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

  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode } =
    useTernaryDarkMode();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <themeContext.Provider
        value={{
          setting: ternaryDarkMode as ThemeOptions,
          setSetting: setTernaryDarkMode,
        }}
      >
        <Navbar />
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
        <Footer />
      </themeContext.Provider>
    </ThemeProvider>
  );
}
