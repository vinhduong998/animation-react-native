import React, { useState } from 'react';
import { View, StyleSheet, ImageProps, Image, ImageURISource, LayoutChangeEvent } from 'react-native';

interface Props extends ImageProps {
  round?: number
  thumb?: boolean
  source: ImageURISource
}

const ImageBase = ({ round = 0, thumb = true, source, ...props }: Props) => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  if (!source?.uri) {
    return (
      <View style={{ borderRadius: round, overflow: "hidden" }}>
        <Image
          source={require("assets/images/default_avatar.jpg")}
          {...props}
        />
      </View>
    )
  }
  // if (thumb) {
  //   return (
  //     <Image
  //       source={source}
  //       resizeMode="cover"
  //       {...props}
  //     />
  //   )
  // }\

  return (
    <View style={{ flex: 1 }} onLayout={(event: LayoutChangeEvent) => {
      setSize({ width: Math.round(event.nativeEvent.layout.width * 1.5), height: Math.round(event.nativeEvent.layout.height * 1.5) })
    }}>
      <Image
        source={{ uri: `https://img.behapyglobal.com/unsafe/${size.width}x${size.height}/${source.uri}` }}
        resizeMode="cover"
        {...props}
      />
    </View>
  )
}

export default ImageBase;