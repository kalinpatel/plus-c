import { darkTheme, lightTheme } from "@/brand/theme";
import useIsInstalledMobile from "@/hooks/useIsInstalledMobile";
import Footer from "@/organisms/footer";
import Navbar from "@/organisms/navbar";
import NotFound from "@/pages/404";
import EulersMethod from "@/pages/eulersMethod";
import Home from "@/pages/home";
import { AnimatePresence } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useMediaQuery } from "usehooks-ts";
import TermsOfUse from "./pages/legal/terms";

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

export const AnimationContext = createContext(DesktopAnimation);

ReactGA.initialize("G-GW4Y469NL6");

export default function App() {
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

  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navbar />
      <AnimationContext.Provider value={animationValue}>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            {/* Home page */}
            <Route index element={<Home />} />

            {/* ---- CONTENT START ---- */}
            <Route path="/eulers-method" element={<EulersMethod />} />
            <Route path="/legal/terms" element={<TermsOfUse />} />
            <Route path="/legal/privacy" element={<TermsOfUse privacy />} />
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </AnimationContext.Provider>
      <Footer />
    </ThemeProvider>
  );
}
