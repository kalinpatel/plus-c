import Button from "@/atoms/defaultButton";
import Header from "@/atoms/header";
import MagicLinkText from "@/atoms/magicLinkText";
import ProfileContainer from "@/atoms/profileContainer";
import { firebaseAuth } from "@/firebase";
import AccountLinker from "@/molecules/accountLinker";
import DeleteAccountOrData from "@/molecules/deleteAccountOrData";
import ThemeSwitcher from "@/molecules/themeSwitcher";
import Layout from "@/templates/layout";
import { themeContext } from "app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const Section = styled.section`
  width: calc(100vw - 40px);
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50rem;
  }
  h2,
  h3 {
    color: ${({ theme }) => theme.colors.themed.minor};
  }
  & > p {
    color: ${({ theme }) => theme.colors.peripheral.minorVariant};
  }

  &:not(:first-child) {
    margin-top: 40px;
    padding-top: 20px;
    h2 {
      margin-top: 0px;
    }
    border-top: 1px solid ${({ theme }) => theme.colors.themed.minor};
  }
  &.danger {
    border-color: ${({ theme }) => theme.colors.action.error};
    h2 {
      color: ${({ theme }) => theme.colors.action.error};
    }
  }
  &:first-child {
    margin-bottom: -12px;
    margin-top: 20px;
  }
  &.centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default function Settings() {
  const [user] = useAuthState(firebaseAuth);
  const navigate = useNavigate();

  return (
    <Layout title="Settings">
      <Header
        title="Settings"
        subtitle="Modify your account and display preferences"
      />
      <Page>
        {user && (
          <Section>
            <ProfileContainer />
          </Section>
        )}
        {!user && (
          <Section className="centered">
            <h3>Sign in to your account to see more preferences.</h3>
            <Button className="primary" onClick={() => navigate("/user/auth")}>
              Sign In
            </Button>
          </Section>
        )}
        <Section>
          <h2>Theme Preference</h2>
          <p>Your choice will only be saved on this device, in this browser.</p>
          <themeContext.Consumer>
            {(value) => (
              <ThemeSwitcher
                onThemeChange={value.setSetting}
                currentTheme={value.setting}
              />
            )}
          </themeContext.Consumer>
        </Section>
        {user && (
          <Section>
            <h2>Linked Accounts</h2>
            <p>
              You can link your Google and Microsoft accounts to your account
              for easier login.{" "}
              <MagicLinkText user={firebaseAuth.currentUser} />
            </p>
            <AccountLinker user={firebaseAuth.currentUser} />
          </Section>
        )}
        {user && (
          <Section className="danger">
            <h2>Danger Zone</h2>
            <p>
              The buttons below can cause irreversible changes to your account!
              Think carefully before using them.
            </p>
            <p>
              Both buttons below will clear your entire history of calculations.
            </p>
            <DeleteAccountOrData />
          </Section>
        )}
      </Page>
    </Layout>
  );
}
