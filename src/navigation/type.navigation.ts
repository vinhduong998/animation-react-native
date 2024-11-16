import BallonSlider from "screens/ballon-slider";
import CardNavigator from "screens/card";
import ChartCoin from "screens/chart-coin";
import HomeScreen from "screens/home/home.screen";
import marquee from "screens/marquee/marquee";
import Messenger from "screens/messenger/messenger";
import NumberFloatScreen from "screens/number-float/number-float.screen";
import ScrollDot from "screens/scrolldot/scroll.dot";

export type RootStackList = {
  HOME_SCREEN: undefined
  APPLE_STOCK: undefined
  BALLON_SLIDER: undefined;
  CHART_COIN: undefined;
  CARD_SHARED_ELEMENT: undefined
  MARQUEE: undefined
  MESSENGER: undefined
  SCROLL_DOT: undefined
  NUMBER_FLOAT: undefined
};

export const ListNavigation: {
  name: keyof RootStackList,
  component: any
}[] = [
    {
      name: "HOME_SCREEN",
      component: HomeScreen
    },
    {
      name: "BALLON_SLIDER",
      component: BallonSlider
    },
    {
      name: "CHART_COIN",
      component: ChartCoin
    },
    {
      name: "CARD_SHARED_ELEMENT",
      component: CardNavigator
    },
    {
      name: "MARQUEE",
      component: marquee
    },
    {
      name: "MESSENGER",
      component: Messenger
    },
    {
      name: "SCROLL_DOT",
      component: ScrollDot
    },
    {
      name: "NUMBER_FLOAT",
      component: NumberFloatScreen
    }
  ]