import React, { useRef } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import { State } from "react-native-gesture-handler";
import Animated, { Extrapolation, interpolate, runOnJS, runOnUI, SharedValue, useAnimatedReaction, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";

interface LabelProps {
  domain: [number, number];
  size: number;
  translateY: SharedValue<number>;
  opacity: SharedValue<State>;
}

const format = (value: number) => {
  'worklet'
  if (Platform.OS === "android") {
    return `$ ${(Math.floor(value * 100) - 100)}`;
  }
  const int = Math.floor(value);
  const dec = Math.floor((value - int) * 100);
  const formattedDec = dec < 10 ? `0${dec}` : dec
  const t = Math.floor(int - 1000)
  const formatInt = t < 1 ? t : `${t},${value % 1000}`
  return `$${formatInt}.${formattedDec}`
};

export default ({ domain: [min, max], size, translateY, opacity }: LabelProps) => {
  const refTextInput = useRef<TextInput>(null)
  const valueTextInput = useDerivedValue(() => {
    const value = interpolate(translateY.value, [0, size], [min, max], Extrapolation.CLAMP);
    return format(value)
  })

  const setTextInput = (text: string) => {
    refTextInput.current?.setNativeProps({ text: text })
  }

  useAnimatedReaction(() => {
    return valueTextInput.value
  }, (data) => {
    runOnJS(setTextInput)(data)
  })

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value === State.ACTIVE ? 1 : 0
    }
  })

  return (
    <Animated.View
      style={[styles.container, style]}
    >
      <TextInput
        editable={false}
        underlineColorAndroid="transparent"
        ref={refTextInput}
        style={{ color: "black", fontVariant: ["tabular-nums"] }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "#FEFFFF",
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});