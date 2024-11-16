import { ScaleLinear } from "d3-scale";
import React from "react";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";
import { Line, Rect } from "react-native-svg";

const MARGIN = 2;

export interface Candle {
  date: string;
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandleProps {
  candle: Candle;
  index: number;
  width: number;
  scaleY: ScaleLinear<number, number>;
  scaleBody: ScaleLinear<number, number>;
  translateX: SharedValue<number>
}

const AnimatedLine = Animated.createAnimatedComponent(Line)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export default ({ candle, index, width, scaleY, scaleBody, translateX }: CandleProps) => {
  const { close, open, high, low } = candle;
  const fill = close > open ? "#4AFA9A" : "#E33F64";
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);

  const lineProps = useAnimatedProps(() => {
    return {
      x1: x + width / 2 - translateX.value,
      x2: x + width / 2 - translateX.value
    }
  })

  const rectProps = useAnimatedProps(() => {
    return {
      x: x + MARGIN - translateX.value
    }
  })

  return (
    <>
      <AnimatedLine
        animatedProps={lineProps}
        y1={scaleY(low)}
        y2={scaleY(high)}
        stroke={fill}
        strokeWidth={1}
      />
      <AnimatedRect
        animatedProps={rectProps}
        y={scaleY(max)}
        width={width - MARGIN * 2}
        height={scaleBody(max - min)}
        fill={fill}
      />
    </>
  );
};