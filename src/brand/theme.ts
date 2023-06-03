interface NonColorTheme {
  typography: {
    fontFamily: string;
    fontSize: {
      default: string;
      large: string;
      small: string;
    };
  };
  borderRadius: {
    default: string;
    large: string;
    small: string;
  };
  headerHeight: string;
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface Theme extends NonColorTheme {
  darkMode: boolean;
  colors: {
    themed: {
      major: string;
      minor: string;
      alwaysLight: string;
      alwaysDark: string;
    };
    brand: {
      primary: string;
      primaryAlteration: string;
      secondary: string;
      tertiary: string;
      accent: string;
    };
    action: {
      success: string;
      error: string;
      warning: string;
    };
    peripheral: {
      grey: string;
      darkGrey: string;
      lightGrey: string;
      extraLightGrey: string;
      extraDarkGrey: string;
      majorVariant: string;
      minorVariant: string;
    };
  };
}

const defaultTheme: NonColorTheme = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      default: "1.2rem",
      small: "1rem",
      large: "2.4rem",
    },
  },
  headerHeight: "94px",
  borderRadius: {
    default: "8px",
    large: "18px",
    small: "4px",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
  },
};

export const lightTheme: Theme = {
  colors: {
    themed: {
      major: "#f5f5f5",
      minor: "#353535",
      alwaysLight: "#f5f5f5",
      alwaysDark: "#353535",
    },
    brand: {
      primary: "#177e89",
      primaryAlteration: "#177e89",
      secondary: "#2d728f",
      accent: "#db3069",
      tertiary: "#df9a57",
    },
    action: {
      error: "#f44336",
      success: "#4caf50",
      warning: "#faad14",
    },
    peripheral: {
      grey: "#9e9e9e",
      lightGrey: "#C0C0C0",
      extraLightGrey: "#e5e5e5",
      darkGrey: "#787878",
      extraDarkGrey: "#555555",
      majorVariant: "#ffffff",
      minorVariant: "#505050",
    },
  },
  ...defaultTheme,
  darkMode: false,
};

export const darkTheme: Theme = {
  colors: {
    themed: {
      major: "#353535",
      minor: "#f5f5f5",
      alwaysLight: "#f5f5f5",
      alwaysDark: "#353535",
    },
    brand: {
      primary: "#177e89",
      primaryAlteration: "#29becf",
      secondary: "#2d728f",
      accent: "#db3069",
      tertiary: "#ed851f",
    },
    action: {
      error: "#f44336",
      success: "#4caf50",
      warning: "#ffc53d",
    },
    peripheral: {
      grey: "#9e9e9e",
      lightGrey: "#C0C0C0",
      darkGrey: "#787878",
      extraLightGrey: "#e5e5e5",
      extraDarkGrey: "#555555",
      majorVariant: "#505050",
      minorVariant: "#ffffff",
    },
  },
  ...defaultTheme,
  darkMode: true,
};
