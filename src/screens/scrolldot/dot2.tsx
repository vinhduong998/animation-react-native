import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  list: any[]
  aniIndex: SharedValue<number>
}

const PADDING = 10
const WIDTH_DOT = 14

const ItemDot = ({ index, aniIndex }: { index: number, aniIndex: SharedValue<number> }) => {
  const styleDot = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(aniIndex.value, [index - 0.5, index, index + 0.5], ["#00000030", "#000000", "#00000030"], "RGB")
    }
  })

  return (
    <Animated.View key={`dot1-${index}`} style={[styles.dot, styleDot]} />
  )
}

const Dot2 = ({ list, aniIndex }: Props) => {
  const renderDot = (_: any, index: number) => {
    return (
      <ItemDot key={`dot1-${index}`} index={index} aniIndex={aniIndex} />
    )
  }

  const styleLine = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -(PADDING / 2) + (WIDTH_DOT + PADDING) * aniIndex.value
        },
        {
          scaleX: interpolate(aniIndex.value % 1, [0, 0.5, 1], [0, 1, 0], Extrapolation.CLAMP),
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
    height: WIDTH_DOT
  },
  line: {
    height: 4,
    width: WIDTH_DOT + PADDING,
    zIndex: 10,
    backgroundColor: "black",
    position: "absolute"
  }
})

export default Dot2;