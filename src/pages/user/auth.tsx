import HandleSignInWithMagicLink from "@/atoms/handleSignInWithMagicLink";
import MustBeOnline from "@/atoms/mustBeOnline";
import { firebaseAuth } from "@/firebase";
import DidYouKnow from "@/molecules/didYouKnow";
import LoginWithMagicLink from "@/molecules/loginWithMagicLink";
import LoginWithSocialProvider from "@/molecules/loginWithSocialProvider";
import Layout from "@/templates/layout";
import { onAuthStateChanged } from "firebase/auth";
import { UserInfo } from "firebase/index";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffectOnce } from "usehooks-ts";

const Page = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-top: 40px;
    min-height: 0px;
    grid-template-columns: 1fr;
  }
  width: 100vw;
`;

const LoginArea = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: min(calc(100vw - 28px), 30rem);
  margin: 0 auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: relative;
    top: -100px;
  }
  background-color: ${({ theme }) => theme.colors.brand.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  color: ${({ theme }) => theme.colors.themed.alwaysLight};
  padding-bottom: 6px;
  box-shadow: 0px 3px 10px 2px rgba(0, 0, 0, 0.2);
  & > p {
    width: calc(100% - 44px);
    padding-left: 2px;
    text-align: center;
    strong {
      display: block;
      margin-bottom: 6px;
    }
    a {
      color: ${({ theme }) => theme.colors.themed.alwaysLight};
      transition: color 0.18s ease-in-out;
      &:hover {
        color: ${({ theme }) => theme.colors.brand.tertiary};
      }
    }
  }
  form {
    height: 95px;
    width: 100%;
  }
`;

const AsideArea = styled.aside`
  grid-column: 2;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1;
    margin-top: 40px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: relative;
    left: -20px;
    top: -100px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(100% - 40px);
  margin: 0px auto;
  pointer-events: none;
  h5 {
    font-size: 1.7rem;
    opacity: 0.85;
    text-align: center;
    color: ${({ theme }) => theme.colors.themed.minor};
    user-select: none;
    .math-fact {
      display: block;
      margin-top: 18px;
      min-height: 80px;
    }
  }
`;

const MethodSeparator = styled.div`
  height: 0px;
  border-top: 2px solid ${({ theme }) => theme.colors.peripheral.extraLightGrey};
  border-radius: 2px;
  width: calc(100% - 40px);
  margin-bottom: 20px;
  margin-top: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    position: absolute;
    top: -10px;
    background-color: ${({ theme }) => theme.colors.brand.secondary};
    color: ${({ theme }) => theme.colors.peripheral.extraLightGrey};
    padding-inline: 6px;
  }
`;

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const referrerState: any = location.state;

  function handleAuthDestination(user: UserInfo | null) {
    if (user) {
      if (referrerState && referrerState !== "signedOut") {
        navigate(referrerState);
      } else {
        navigate("/");
      }
    }
  }

  onAuthStateChanged(firebaseAuth, handleAuthDestination);

  useEffectOnce(() => {
    // Show sign out success toast
    if (referrerState === "signedOut") {
      toast.success("Successfully signed out");
    }

    // See if user should be redirected based on auth state
    handleAuthDestination(firebaseAuth.currentUser);
  });

  return (
    <Layout title="Sign In">
      <MustBeOnline serviceName="Logging in">
        <HandleSignInWithMagicLink />
        <Page>
          <LoginArea>
            <h1>Sign In</h1>
            <LoginWithMagicLink referrer={referrerState} />
            <MethodSeparator>
              <div>or</div>
            </MethodSeparator>
            <LoginWithSocialProvider />
            <p>
              <strong>Why sign in?</strong>
              You&apos;ll get access to a recent history of your calculations.
              Only your email and calculation history will be stored. <br />
              See the <Link to="/legal/privacy">privacy statement</Link> for
              more information.
            </p>
          </LoginArea>
          <AsideArea>
            <h5>
              Did you know that...{" "}
              <DidYouKnow interval={5000} className="math-fact" />
            </h5>
          </AsideArea>
        </Page>
      </MustBeOnline>
    </Layout>
  );
}
