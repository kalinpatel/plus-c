import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";

const Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.themed.minor};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function ErrorFallback({ error }: { error: any }) {
  return (
    <Wrapper role="alert">
      <h3>Something went wrong</h3>
      <pre>{error.message}</pre>
    </Wrapper>
  );
}

export default function ErrorBoundaryComponent({
  children,
}: {
  children: any;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}
