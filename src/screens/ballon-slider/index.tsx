import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, clamp, interpolate, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Device } from 'ui/device.ui';

const WIDTH_SLIDE = Device.width - 60
const WIDTH_TINT = 40
const HEIGHT_SLIDE = 4
const RATIO_SCALE = 3 / 4

const BallonSlider = () => {
  const translateX = useSharedValue(- WIDTH_TINT / 2)
  const scaleTint = useSharedValue(0)
  const textInputRef = useRef<TextInput>(null)

  const aniValue = useDerivedValue(() => withTiming(translateX.value, { duration: 150 }), [translateX])
  const aniRotate = useDerivedValue(() => {
    return withSpring(-clamp(translateX.value - aniValue.value, -40, 40))
  }, [translateX])

  const setTextValue = (value: number) => {
    textInputRef.current?.setNativeProps({
      text: `${Math.round((value + WIDTH_TINT / 2) / WIDTH_SLIDE * 100)}`
    })
  }

  const styleViewPercentSlide = useAnimatedStyle(() => ({
    transform: [{
      translateX: interpolate(translateX.value, [0, WIDTH_SLIDE], [-WIDTH_SLIDE, WIDTH_TINT / 2], Extrapolation.CLAMP)
    }]
  }))

  const viewValueSlide = useAnimatedStyle(() => ({
    left: aniValue.value + WIDTH_TINT * (1 - RATIO_SCALE) / 2,
    transform: [
      { rotate: aniRotate.value + "deg" },
      { scale: scaleTint.value },
      { translateY: interpolate(scaleTint.value, [0, 1], [0, -60], Extrapolation.CLAMP) }
    ]
  }))

  const styleContentTint = useAnimatedStyle(() => ({
    transform: [{
      scale: scaleTint.value
    }]
  }))

  const styleTint = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scaleTint.value, [0, 1], [RATIO_SCALE, 1], Extrapolation.CLAMP)
      },
    ],
    left: translateX.value
  }))

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scaleTint.value = withTiming(1, { duration: 200 })
    })
    .onChange(({ changeX, velocityX }) => {
      const translateValue = clamp(translateX.value + changeX, - WIDTH_TINT / 2, WIDTH_SLIDE - WIDTH_TINT / 2)
      translateX.value = translateValue;
      runOnJS(setTextValue)(translateValue)
    })
    .onTouchesUp(() => {
      scaleTint.value = withTiming(0, { duration: 200 })
    })

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <View style={styles.slide}>
          <Animated.View style={[styles.viewPercentSlide, styleViewPercentSlide]} />
        </View>
        <Animated.View style={[styles.viewValueSlide, viewValueSlide]}>
          <TextInput ref={textInputRef} editable={false} style={styles.textInput} value='0' />
          <View style={styles.line} />
        </Animated.View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.tint, styleTint]}>
            <Animated.View style={[styles.contentTint, styleContentTint]} />
          </Animated.View>
        </GestureDetector>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  },
  slide: {
    height: HEIGHT_SLIDE,
    backgroundColor: "#00000030",
    width: WIDTH_SLIDE,
    overflow: "hidden"
  },
  viewPercentSlide: {
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  tint: {
    width: WIDTH_TINT,
    height: WIDTH_TINT,
    borderRadius: WIDTH_TINT,
    backgroundColor: "black",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: -WIDTH_TINT / 2
  },
  contentTint: {
    backgroundColor: "white",
    width: WIDTH_TINT - 4,
    height: WIDTH_TINT - 4,
    borderRadius: WIDTH_TINT - 4
  },
  viewValueSlide: {
    position: "absolute",
    width: WIDTH_TINT * RATIO_SCALE + 5,
    paddingVertical: 6,
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center"
  },
  textInput: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center"
  },
  line: {
    height: 10,
    width: 4,
    backgroundColor: "black",
    position: "absolute",
    bottom: -8
  }
})

export default BallonSlider;