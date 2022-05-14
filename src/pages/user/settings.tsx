import Header from "@/atoms/header";
import MagicLinkText from "@/atoms/magicLinkText";
import ProfileContainer from "@/atoms/profileContainer";
import { ThemeOptions } from "@/brand/theme";
import { firebaseAuth } from "@/firebase";
import AccountLinker from "@/molecules/accountLinker";
import DeleteAccountOrData from "@/molecules/deleteAccountOrData";
import ThemeSwitcher from "@/molecules/themeSwitcher";
import Layout, { themeContext } from "@/templates/layout";
import { useState } from "react";
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
  h2 {
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
`;

export default function Settings() {
  const [theme, setTheme] = useState<ThemeOptions | undefined>(undefined);

  return (
    <Layout title="Settings" theme={theme} restricted>
      <Header
        title="Settings"
        subtitle="Modify your account and display preferences"
      />
      <Page>
        <Section>
          <ProfileContainer />
        </Section>
        <Section>
          <h2>Theme Preference</h2>
          <p>Your choice will only be saved on this device, in this browser.</p>
          <themeContext.Consumer>
            {(value) => (
              <ThemeSwitcher onThemeChange={setTheme} currentTheme={value} />
            )}
          </themeContext.Consumer>
        </Section>
        <Section>
          <h2>Linked Accounts</h2>
          <p>
            You can link your Google and Microsoft accounts to your account for
            easier login. <MagicLinkText user={firebaseAuth.currentUser} />
          </p>
          <AccountLinker user={firebaseAuth.currentUser} />
        </Section>
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
      </Page>
    </Layout>
  );
}
