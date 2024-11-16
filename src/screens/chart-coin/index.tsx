import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, State } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Candle } from './Candle';
import Chart, { size } from './Chart';
import data from "./data.json";
import Label from './Label';
import Line from './Line';

const getDomain = (rows: Candle[]): [number, number] => {
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

const ChartCoin = () => {
  const [candles, setCandles] = useState(data.slice(0, 60))
  const domain = getDomain(candles);
  const translateLineX = useSharedValue(0)
  const translateX = useSharedValue(0)
  const translateLineY = useSharedValue(0)
  const isPanLine = useSharedValue(false)
  const state = useSharedValue<State>(State.UNDETERMINED)
  const caliber = useSharedValue(size / 20);

  const gesturePan = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      if (isPanLine.value) {
        state.value = State.ACTIVE
      }
    })
    .onChange(({ x, y, changeX }) => {
      if (isPanLine.value) {
        translateLineY.value = Math.max(0, Math.min(y, size))
        translateLineX.value = x
      } else {
        const _translateX = translateX.value - changeX
        translateX.value = Math.min(Math.max(-size * 0.5, _translateX), size * 2.5)
      }
    })
    .onEnd(() => {
      isPanLine.value = false
      state.value = State.END
    })

  const gestureLongPress = Gesture.LongPress()
    .onStart(({ x, y }) => {
      isPanLine.value = true
      state.value = State.ACTIVE

      translateLineY.value = Math.max(0, Math.min(y, size))
      translateLineX.value = x
    })

  const gesturePinch = Gesture.Pinch()
    .onUpdate((e) => {
      // caliber.value = Math.min(2 * baseCaliber, baseCaliber * e.scale)
      console.log("e.scale", e.scale);
    })

  const gesture = Gesture.Simultaneous(gesturePinch, gesturePan, gestureLongPress)


  const viewLineY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateLineY.value }],
      opacity: state.value === State.ACTIVE ? 1 : 0,
    }
  })

  const viewLineX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateLineX.value }],
      opacity: state.value === State.ACTIVE ? 1 : 0,
    }
  })


  return (
    <View style={styles.container}>
      <View>
        <Chart candles={candles} domain={domain} translateX={translateX} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={[{
                ...StyleSheet.absoluteFillObject,
              }, viewLineY]}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={[{
                ...StyleSheet.absoluteFillObject,
              }, viewLineX]}
            >
              <Line x={0} y={size} />
            </Animated.View>
            <Label translateY={translateLineY} opacity={state} {...{ size, domain }} />
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
})
export default ChartCoin;