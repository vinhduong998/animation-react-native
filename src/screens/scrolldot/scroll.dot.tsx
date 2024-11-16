import React from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Device } from 'ui/device.ui';
import Dot1 from './dot1';
import Dot2 from './dot2';
import Dot3 from './dot3';
import Dot4 from './dot4';

const ARRAY_IMAGE = [
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097378/6594e43a0d11b9762123e4ea-1705996097378-e033b295-d7ce-43ec-9d3a-246f7991b01e.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097348/6594e43a0d11b9762123e4ea-1705996097348-hot-girl-mac-trang-phuc-co-trang%20%282%29.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097452/6594e43a0d11b9762123e4ea-1705996097452-image-co-mot-khung-canh-tet-que-lam-nao-long-nhung-nguoi-con-xa-xu-165223754261653.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097591/6594e43a0d11b9762123e4ea-1705996097591-images2961687_photo_1_15921951689531655112624_16055841958812092389178.png?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097517/6594e43a0d11b9762123e4ea-1705996097517-luu-diec-phi-31-8610-1655191985.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097238/6594e43a0d11b9762123e4ea-1705996097238-pngtree-outdoorsy-young-woman-sporting-shades-confidently-posing-with-a-juice-bottle-meets-the-camera-gaze-photo-image_42709010.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097437/6594e43a0d11b9762123e4ea-1705996097437-trong-tuan-moi-4-cung-hoang-dao-nay-se-rat-thuan-loi-trong-cong-viec-va-tinh-yeu-hot-girl-mac-trang-phuc-co-trang-4.jpg?w=2160&h=NaN&fit=crop&auto=format"
]

const TRANSLATE_IMAGE = 150

const Item = ({ item, aniIndex, index }: { index: number, item: string, aniIndex: SharedValue<number> }) => {
  const styleImage = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: interpolate(aniIndex.value, [index - 1, index, index + 1], [-TRANSLATE_IMAGE, 0, TRANSLATE_IMAGE], Extrapolation.CLAMP)
      }]
    }
  })

  return (
    <View style={styles.item}>
      <View style={[styles.viewImage,]}>
        <Animated.Image
          source={{ uri: item }}
          style={[styles.image, styleImage]}
          resizeMode="stretch"
        />
      </View>
    </View>
  )
}

const ScrollDot = () => {
  const aniIndex = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      aniIndex.value = withTiming(event.contentOffset.x / Device.width, { duration: 0 })
    }
  })


  const renderItem = ({ item, index }: ListRenderItemInfo<string>) => {
    return (
      <Item item={item} aniIndex={aniIndex} index={index} />
    )
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={ARRAY_IMAGE}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
        <Dot1 list={ARRAY_IMAGE} aniIndex={aniIndex} />
        <Dot2 list={ARRAY_IMAGE} aniIndex={aniIndex} />
        <Dot3 list={ARRAY_IMAGE} aniIndex={aniIndex} />
        <Dot4 list={ARRAY_IMAGE} aniIndex={aniIndex} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewImage: {
    width: Device.width - 120,
    aspectRatio: 3 / 4,
    overflow: "hidden",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    marginTop: 20,
    width: Device.width - 80,
    marginHorizontal: 40,
    aspectRatio: 3 / 4,
    borderWidth: 20,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15
  },
  image: {
    width: Device.width - 120 + TRANSLATE_IMAGE * 2,
    height: (Device.width - 120) / 3 * 4
  }
})

export default ScrollDot;