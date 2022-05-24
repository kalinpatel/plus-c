import Meta from "@/atoms/meta";
import MustBeAuthed from "@/atoms/mustBeAuthed";
import { darkTheme, lightTheme, ThemeOptions } from "@/brand/theme";
import useIsInstalledMobile from "@/hooks/useIsInstalledMobile";
import ErrorBoundaryComponent from "@/molecules/errorBoundry";
import Footer from "@/organisms/footer";
import Navbar from "@/organisms/navbar";
import { AnimationContext } from "app";
import { motion } from "framer-motion";
import { createContext, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { useTernaryDarkMode } from "usehooks-ts";

const Page = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.themed.major};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  overflow-x: hidden;
  &.mobile {
    padding-top: 50px;
  }
`;

const Container = styled(motion.div)`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  background-color: ${({ theme }) => theme.colors.themed.major};
  margin: 0;
  padding: 0;
`;

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
`;

interface LayoutProps {
  theme?: ThemeOptions;
  children: any;
  title: string;
  restricted?: boolean;
}

export const themeContext = createContext<ThemeOptions>("light");

export default function Layout({
  theme,
  children,
  title,
  restricted,
}: LayoutProps) {
  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode } =
    useTernaryDarkMode();
  const isMobilePWA = useIsInstalledMobile();

  useEffect(() => {
    if (theme) {
      setTernaryDarkMode(theme);
    }
  }, [theme]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      {restricted && <MustBeAuthed />}
      <themeContext.Provider value={ternaryDarkMode}>
        <Meta title={title} />
        <Page className={isMobilePWA ? "mobile " : ""}>
          <Navbar />
          <AnimationContext.Consumer>
            {(value) => (
              <Container
                initial="initial"
                animate="animate"
                exit="exit"
                variants={value}
                onAnimationStart={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onAnimationEnd={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
              </Container>
            )}
          </AnimationContext.Consumer>
          <Footer />
        </Page>
      </themeContext.Provider>
    </ThemeProvider>
  );
}
