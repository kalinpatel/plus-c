import Meta from "@/atoms/meta";
import MustBeAuthed from "@/atoms/mustBeAuthed";
import useIsInstalledMobile from "@/hooks/useIsInstalledMobile";
import ErrorBoundaryComponent from "@/molecules/errorBoundry";
import { AnimationContext } from "app";
import { motion } from "framer-motion";
import styled from "styled-components";

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

interface LayoutProps {
  children: any;
  title: string;
  restricted?: boolean;
}

export default function Layout({ children, title, restricted }: LayoutProps) {
  const isMobilePWA = useIsInstalledMobile();

  return (
    <>
      {restricted && <MustBeAuthed />}
      <Meta title={title} />
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
              <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
            </Container>
          )}
        </AnimationContext.Consumer>
      </Page>
    </>
  );
}
