import Header from "@/atoms/header";
import OneTapLogin from "@/atoms/oneTapLogin";
import Layout from "@/templates/layout";
import styled from "styled-components";

const LegalText = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export default function Home() {
  return (
    <Layout title="Home">
      <Header title="Home" subtitle="No visual content yet" />
      <LegalText>
        <p>
          This app is meant to calculate the answer to a given calculus problem.
          It is able to run fully offline when installed as a PWA, and can
          generate solutions on your device, without needing to reach out to a
          server.
        </p>
        <p>
          Data is collected through Google Analytics and Firebase Performance
          Monitoring when you use this site. When you sign in, your account
          information is saved. When you perform a calculation while logged in,
          your calculation is saved, and is linked to you. See the{" "}
          <a href="/legal/privacy">privacy policy</a> for more details and for
          instructions on deleting your account.
        </p>
      </LegalText>
      <OneTapLogin />
    </Layout>
  );
}
