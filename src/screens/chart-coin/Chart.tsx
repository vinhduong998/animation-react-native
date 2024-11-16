import { scaleLinear } from "d3-scale";
import React from "react";
import { Dimensions } from "react-native";
import { Svg } from "react-native-svg";

import { SharedValue } from "react-native-reanimated";
import Candle, { Candle as CandleModel } from "./Candle";

export const { width: size } = Dimensions.get("window");

interface ChartProps {
  candles: CandleModel[];
  domain: [number, number];
  translateX: SharedValue<number>
}

export default ({ candles, domain, translateX }: ChartProps) => {
  const width = size / 20;
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size]);

  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle
          key={candle.date}
          candle={candle}
          index={index}
          width={width}
          scaleBody={scaleBody}
          scaleY={scaleY}
          translateX={translateX}
        />
      ))}
    </Svg>
  );
};