import { createContext } from 'react';

export type SystemTheme = {
  backgroundMain: string;
  background: string;
  newBG: string;
  backgroundPremium: string;
  backgroundLightPremium: string;
  backgroundPrimary: string;
  text: string;
  textMain: string;
  textLight: string;
  textDark: string;
  textError: string;
  textInactive: string;
  backgroundTextInput: string;

  btnNegative: string;
  btnActive: string;
  btnInactive: string;
  btnLight: string;
  btnLightSmoke: string;

  icon: string;
  iconActive: string;
  iconInactive: string;
  iconLight: string;
  iconDark: string;

  gradient1: string
  gradient2: string
  btnSuccess: string
  mainLinear: string[]
  mainPrimary: string
  textSecondary: string
  white: string
  textDisable: string
  infoBase: string
  warningAction: string
  premiumColor: string
}

export const RootColor = {
  Transparent: "#00000000",
  DarkBackground: "#212121",
  LightBackground: "#FFF",
  MainPremium: "#cb4859",
  MainLightPremium: "rgb(241, 223, 223)",
  DarkText: "#FFF",
  LightText: "#0E1426",
  RedNegative: "#D70103",
  MainColor: "#a51c30",
  Blue: "#3498db",
  SpanishGray: "#8F8F8F",
  Smoke: "#D9D9D9",
  WhiteSmoke: "#E8E8E8",
  PremiumColor: "#FAAD14",
  Green: "#389E0D",
  MainLinear: ["#A51C30", "#DC3545"],
  MainPrimary: "#DC3545",
  TextSecondary: "#626F82",
  White: "#FFF",
  NewBackground: "#F7F8F8",
  TextDisable: "#C0C5CD",
  InfoBase: "#1677FF",
  WarningAction: '#E18700',
  PrimaryBackground: "#FDEFF1",
  PrimaryHorizontal: "#E35D6A"
}



export const themes: {
  light: SystemTheme,
  dark: SystemTheme
} = {
  light: {
    backgroundMain: RootColor.MainColor,
    background: RootColor.LightBackground,
    newBG: RootColor.NewBackground,
    backgroundPremium: RootColor.MainPremium,
    backgroundLightPremium: RootColor.MainLightPremium,
    backgroundPrimary: RootColor.PrimaryBackground,
    text: RootColor.LightText,
    textMain: RootColor.MainColor,
    textLight: RootColor.DarkText,
    textDark: RootColor.LightText,
    textError: RootColor.RedNegative,
    textInactive: RootColor.SpanishGray,

    backgroundTextInput: RootColor.WhiteSmoke,

    btnNegative: RootColor.RedNegative,
    btnActive: RootColor.MainColor,
    btnInactive: RootColor.SpanishGray,
    btnLight: RootColor.LightBackground,
    btnLightSmoke: RootColor.Smoke,

    icon: RootColor.LightText,
    iconActive: RootColor.MainColor,
    iconInactive: RootColor.SpanishGray,
    iconLight: RootColor.DarkText,
    iconDark: RootColor.LightText,

    gradient1: "rgb(243, 115, 152)",
    gradient2: "rgb(224, 219, 70)",
    btnSuccess: RootColor.Green,
    mainLinear: RootColor.MainLinear,
    mainPrimary: RootColor.MainPrimary,
    textSecondary: RootColor.TextSecondary,
    white: RootColor.White,
    textDisable: RootColor.TextDisable,
    infoBase: RootColor.InfoBase,
    warningAction: RootColor.WarningAction,
    premiumColor: RootColor.PremiumColor,
  },
  dark: {
    backgroundMain: RootColor.MainColor,
    background: RootColor.DarkBackground,
    newBG: RootColor.NewBackground,
    backgroundPremium: RootColor.MainPremium,
    backgroundLightPremium: RootColor.MainLightPremium,
    backgroundPrimary: RootColor.PrimaryBackground,
    text: RootColor.DarkText,
    textMain: RootColor.MainColor,
    textLight: RootColor.DarkText,
    textDark: RootColor.LightText,
    textError: RootColor.RedNegative,
    textInactive: RootColor.SpanishGray,

    backgroundTextInput: RootColor.WhiteSmoke,

    btnNegative: RootColor.RedNegative,
    btnActive: RootColor.MainColor,
    btnInactive: RootColor.SpanishGray,
    btnLight: RootColor.LightBackground,
    btnLightSmoke: RootColor.Smoke,

    icon: RootColor.LightText,
    iconActive: RootColor.MainColor,
    iconInactive: RootColor.SpanishGray,
    iconLight: RootColor.DarkText,
    iconDark: RootColor.LightText,

    gradient1: "rgb(243, 115, 152)",
    gradient2: "rgb(224, 219, 70)",
    btnSuccess: RootColor.Green,
    mainLinear: RootColor.MainLinear,
    mainPrimary: RootColor.MainPrimary,
    textSecondary: RootColor.TextSecondary,
    white: RootColor.White,
    textDisable: RootColor.TextDisable,
    infoBase: RootColor.InfoBase,
    warningAction: RootColor.WarningAction,
    premiumColor: RootColor.PremiumColor,
  },
};

export const ThemeContext = createContext({ theme: themes.light, switchTheme: () => { } });