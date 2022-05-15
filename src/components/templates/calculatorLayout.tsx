import Header from "@/atoms/header";
import Layout from "./layout";

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
      {children}
    </Layout>
  );
}
