import Meta from "@/atoms/meta";
import MustBeAuthed from "@/atoms/mustBeAuthed";
import useIsInstalledMobile from "@/hooks/useIsInstalledMobile";
import ErrorBoundaryComponent from "@/molecules/errorBoundry";
import Navbar from "@/organisms/navbar";
import { AnimationContext } from "app";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  background-color: ${({ theme }) => theme.colors.themed.major};
  margin: 0;
  padding: 0;
`;

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

interface LayoutProps {
  children: any;
  title: string;
  restricted?: boolean;
  background?: string;
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 94px);
  background-size: cover;
`;

export default function Layout({
  children,
  title,
  restricted,
  background,
}: LayoutProps) {
  const isMobilePWA = useIsInstalledMobile();
  let bg = "";
  if (background) {
    bg = `url(${background})`;
  }

  return (
    <>
      {restricted && <MustBeAuthed />}
      <Meta title={title} />
      <Navbar />
      <Page className={isMobilePWA ? "mobile " : ""}>
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
              <ErrorBoundaryComponent>
                <ImageWrapper
                  style={{
                    backgroundImage: bg,
                  }}
                >
                  {children}
                </ImageWrapper>
              </ErrorBoundaryComponent>
            </Container>
          )}
        </AnimationContext.Consumer>
      </Page>
    </>
  );
}
