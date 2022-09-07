import useIsInstalledDesktop from "@/hooks/useIsInstalledDesktop";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "styled-components";

interface MetaProps {
  title: string;
}

export default function Meta({ title }: MetaProps) {
  const isInstalledDesktop = useIsInstalledDesktop();
  const theme = useTheme();
  const formattedTitle =
    title === "Home" ? "Study Quizlet Free (+C)" : `${title} | Study on +C`;

  useEffect(() => {
    if (isInstalledDesktop) {
      document.title = title;
    }
  }, [isInstalledDesktop]);

  document.title = formattedTitle;
  return (
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;1,400;1,500;1,600&display=swap"
      />
      <meta property="og:title" content={formattedTitle} />
      <meta name="theme-color" content={theme.colors.themed.major} />
    </Helmet>
  );
}
