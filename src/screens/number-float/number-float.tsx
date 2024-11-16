import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextLayoutEventData, TextProps, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import { Device } from 'ui/device.ui';
import { HS } from 'ui/sizes.ui';
interface Props {
  value: number
  locale: Intl.LocalesArgument
  fontSize?: number
  currency: string
}

interface TickProps {
  value: string
  fontSize: number
  index: number
}

interface TickNumberProps extends TextProps {
  fontSize: number
}

const numbersToNine = [...Array(10).keys()]


const TickNumber = ({ fontSize, children, style, ...props }: TickNumberProps) => {
  return (
    <Text
      style={[
        style,
        {
          fontVariant: ['tabular-nums'],
          fontWeight: '900',
          fontSize: fontSize
        }
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

const Tick = ({ value, fontSize, index }: TickProps) => {
  const ani = useSharedValue(0)

  useEffect(() => {
    ani.value = withDelay(50 * index, withSpring(Number(value), { duration: 500, stiffness: 200 }))
  }, [value])


  const styleA = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(ani.value, [0, numbersToNine.length - 1], [0, -fontSize * 1.1 * (numbersToNine.length - 1)]) }
      ]
    }
  })

  return (
    <Animated.View
      style={[styleA]}>
      {numbersToNine.map((number, id) => (
        <TickNumber
          key={`tick-${number}-${id}`}
          fontSize={fontSize}
          style={{ lineHeight: fontSize * 1.1 }}
        >
          {String(number)}
        </TickNumber>
      ))}
    </Animated.View>
  )
}

const NumberFloat = ({ value, locale, fontSize = 30, currency }: Props) => {
  const [newFontSize, setNewFontSize] = useState(fontSize)

  const intNumber = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(value)

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setNewFontSize(Math.floor(e.nativeEvent.lines[0].ascender) - 4)
  }

  return (
    <View>
      <TickNumber fontSize={fontSize} numberOfLines={1} adjustsFontSizeToFit onTextLayout={onTextLayout} style={{ position: "absolute", left: 100000 }}>{String(intNumber)}</TickNumber>
      <View style={[styles.container, { height: newFontSize * 1.1 }]}>
        {
          String(intNumber).split("").map((i, id) => {
            if (!!i.match(/([0-9])/)) {
              return <Tick key={id} value={i} fontSize={newFontSize} index={id} />
            }
            return <TickNumber key={id} fontSize={newFontSize} style={{ lineHeight: newFontSize * 1.1 }}>{i}</TickNumber>
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden"
  }
})

export default NumberFloat;