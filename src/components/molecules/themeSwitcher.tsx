import DarkPreview from "@/brand/assets/darkPreview.svg";
import LightPreview from "@/brand/assets/lightPreview.svg";
import SystemPreview from "@/brand/assets/systemPreview.svg";
import { ThemeOptions } from "@/brand/theme";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  width: calc(100% - 40px);
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.peripheral.majorVariant};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const ThemeItem = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.colors.themed.minor};
  width: 14rem;
  color: ${({ theme }) => theme.colors.themed.minor};
  cursor: pointer;
  background: none;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
  box-shadow: 0px 2px 8px 2px
    rgba(0, 0, 0, ${({ theme }) => (theme.darkMode ? "0.4" : "0.1")});
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  &:hover:not(.current) {
    transform: translateY(-1px);
    box-shadow: 0px 3px 10px 2px
      rgba(0, 0, 0, ${({ theme }) => (theme.darkMode ? "0.5" : "0.2")});
  }
  &.current {
    color: ${({ theme }) =>
      theme.darkMode
        ? theme.colors.peripheral.extraLightGrey
        : theme.colors.peripheral.extraDarkGrey};
    pointer-events: none;
  }
`;

const ThemeImage = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.default};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.default};
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.themed.minor};
`;

const ThemeTitle = styled.h3`
  font-size: 1.2rem;
  margin-left: 8px;
  margin-top: 8px;
`;

const ThemeInfoText = styled.p`
  margin-left: 8px;
  margin-top: -16px;
  min-height: 35px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 55px;
  }
`;

interface ThemeItemTypes {
  title: string;
  image: string;
  theme: ThemeOptions;
  info?: string;
}

const ThemesList: ThemeItemTypes[] = [
  {
    title: "Gleam",
    image: LightPreview,
    theme: "light",
    info: "Always a light theme",
  },
  {
    title: "Shadow",
    image: DarkPreview,
    theme: "dark",
    info: "Always a dark theme",
  },
  {
    title: "Automatic",
    image: SystemPreview,
    theme: "system",
    info: "Changes based on your device's dark mode setting",
  },
];

interface ThemeSwitcherProps {
  onThemeChange: (theme: ThemeOptions) => void;
  currentTheme: ThemeOptions;
}

export default function ThemeSwitcher({
  onThemeChange,
  currentTheme,
}: ThemeSwitcherProps) {
  return (
    <Wrapper>
      {ThemesList.map((theme) => (
        <ThemeItem
          onClick={() => onThemeChange(theme.theme)}
          key={theme.title}
          className={currentTheme === theme.theme ? " current" : ""}
        >
          <ThemeImage src={theme.image} />
          <ThemeTitle>
            {theme.title}
            {currentTheme === theme.theme ? " (current)" : ""}
          </ThemeTitle>
          <ThemeInfoText>{theme.info}</ThemeInfoText>
        </ThemeItem>
      ))}
    </Wrapper>
  );
}
