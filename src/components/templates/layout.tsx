import Meta from "@/atoms/meta";
import MustBeAuthed from "@/atoms/mustBeAuthed";
import { darkTheme, lightTheme, ThemeOptions } from "@/brand/theme";
import Footer from "@/organisms/footer";
import Navbar from "@/organisms/navbar";
import { AnimationContext } from "app";
import { motion } from "framer-motion";
import { createContext, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
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
`;

const Container = styled(motion.div)`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  background-color: ${({ theme }) => theme.colors.themed.major};
  margin: 0;
  padding: 0;
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

  useEffect(() => {
    if (theme) {
      setTernaryDarkMode(theme);
    }
  }, [theme]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {restricted && <MustBeAuthed />}
      <themeContext.Provider value={ternaryDarkMode}>
        <Meta title={title} />
        <Page>
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
              >
                {console.log(value)}
                {children}
              </Container>
            )}
          </AnimationContext.Consumer>
          <Footer />
        </Page>
      </themeContext.Provider>
    </ThemeProvider>
  );
}
