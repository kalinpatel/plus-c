import { Helmet } from "react-helmet";

interface MetaProps {
  title: string;
}

export default function Meta({ title }: MetaProps) {
  const formattedTitle =
    title === "Home" ? "+C | Calculus Problem Solver" : `${title} | +C`;

  document.title = formattedTitle;
  return (
    <Helmet>
      <meta property="og:title" content={formattedTitle} />
    </Helmet>
  );
}
