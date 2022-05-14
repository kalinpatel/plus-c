import Header from "@/atoms/header";
import OneTapLogin from "@/atoms/oneTapLogin";
import Layout from "@/templates/layout";

export default function Home() {
  return (
    <Layout title="Home">
      <Header title="Home" subtitle="No content yet" />
      <OneTapLogin />
    </Layout>
  );
}
