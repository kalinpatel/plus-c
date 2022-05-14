import useIsInstalledDesktop from "@/hooks/useIsInstalledDesktop";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

interface MetaProps {
  title: string;
}

export default function Meta({ title }: MetaProps) {
  const isInstalledDesktop = useIsInstalledDesktop();
  const formattedTitle =
    title === "Home" ? "+C | Calculus Problem Solver" : `${title} | +C`;

  useEffect(() => {
    if (isInstalledDesktop) {
      document.title = title;
    }
  }, [isInstalledDesktop]);

  document.title = formattedTitle;
  return (
    <Helmet>
      <meta property="og:title" content={formattedTitle} />
    </Helmet>
  );
}
