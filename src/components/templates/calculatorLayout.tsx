import Header from "@/atoms/header";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Layout from "./layout";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 100%;
  margin-top: 30px;
`;

interface CalculatorLayoutProps {
  children: any;
  title: string;
}

export default function CalculatorLayout({
  children,
  title,
}: CalculatorLayoutProps) {
  return (
    <Layout title={title}>
      <Header title={title} />
      <AnimatePresence exitBeforeEnter>
        <Page>{children}</Page>
      </AnimatePresence>
    </Layout>
  );
}
