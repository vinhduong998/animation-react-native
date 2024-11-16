import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  list: any[]
  aniIndex: SharedValue<number>
}

const WIDTH_DOT = 14
const PADDING = 10

const Dot4 = ({ list, aniIndex }: Props) => {
  const widthLineDot = WIDTH_DOT * 2 + PADDING

  const renderDot = (_: any, index: number) => {
    return (
      <View key={`dot1-${index}`} style={styles.dot} />
    )
  }

  const styleLine = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -(PADDING / 2 - 1) + (widthLineDot - WIDTH_DOT) * aniIndex.value
        },
        {
          scaleX: interpolate(aniIndex.value % 1, [0, 0.5, 1], [1, 1.8, 1], Extrapolation.CLAMP),
        },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.line, styleLine]} />
      <View style={styles.content}>
        {list.map(renderDot)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  content: {
    flexDirection: "row",
    gap: PADDING,
    alignItems: "center"
  },
  dot: {
    width: WIDTH_DOT,
    height: WIDTH_DOT,
    borderRadius: WIDTH_DOT,
    backgroundColor: "#00000030"
  },
  line: {
    height: WIDTH_DOT + 8,
    width: WIDTH_DOT + 8,
    borderRadius: WIDTH_DOT + 8,
    zIndex: 10,
    position: "absolute",
    borderWidth: 2
  }
})

export default Dot4;