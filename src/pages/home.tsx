import DefaultButton from "@/atoms/defaultButton";
import Header from "@/atoms/header";
import DidYouKnow from "@/molecules/didYouKnow";
import Layout from "@/templates/layout";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SmallText = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const DidYouKnowWrapper = styled.div`
  h5 {
    font-size: 1.7rem;
    opacity: 1;
    text-align: center;
    color: ${({ theme }) => theme.colors.themed.minor};
    user-select: none;
    background: ${({ theme }) => theme.colors.themed.major};
    padding: 4px;
    .math-fact {
      display: block;
      margin-top: 18px;
      min-height: 80px;
    }
  }
`;

export default function Home() {
  const navigate = useNavigate();
  return (
    <Layout title="Home">
      <Header title="Home" subtitle="Welcome to +C!" />
      <SmallText>
        <p>
          This app is meant to calculate the answer to a given calculus problem.
          It is able to run fully offline when installed as a PWA, and can
          generate solutions on your device, without needing to reach out to a
          server.
        </p>
      </SmallText>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <DefaultButton
          onClick={() => {
            navigate("/eulers-method");
          }}
          className="primary"
        >
          Open Euler's Method Calculator
        </DefaultButton>
      </div>
      <DidYouKnowWrapper>
        <h5>
          Did you know that...{" "}
          <DidYouKnow interval={5000} className="math-fact" />
        </h5>
      </DidYouKnowWrapper>
    </Layout>
  );
}
