import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const ARRAY_DATA = Array(15).fill(0).map(i => i)

const DetailScreen = () => {
  const route = useRoute<any>()
  const navigation = useNavigation()
  const item = route.params?.item
  const anim = useSharedValue(-1)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ["55%", "90%"], [])

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close({ duration: 500 })
  }

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<Text onPress={closeBottomSheet}>Back</Text>)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(0, { duration: 750 })
    }, 650);
  }, [])

  const styleImage = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(anim.value, [-1, -0.25], [0, 90], Extrapolation.CLAMP)}deg`
        },
        {
          scale: interpolate(anim.value, [-1, -0.25, 0, 1], [1, 1.5, 1.5, 1.25], Extrapolation.CLAMP)
        }
      ],
      top: interpolate(anim.value, [-1, -0.25, 0, 1], [250, 0, 50, 200], Extrapolation.CLAMP)
    }
  })

  const styleViewTitle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(anim.value, [-1, -0.25, 0, 1], [0, 0, 1, 0], Extrapolation.CLAMP),
      transform: [{
        translateY: interpolate(anim.value, [-0.25, 0, 1], [0, 35, 0], Extrapolation.CLAMP)
      }]
    }
  })

  const onChange = (index: number) => {
    if (index === -1) {
      goBack()
    }
  }

  const renderItem = () => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>Đoạn này là tiêu đề</Text>
        <Text style={styles.description}>Đoạn này là mô tả</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styleViewTitle]}>
        <Text style={styles.titleCard}>Your Card</Text>
        <Text style={styles.descriptionCard}>Check all transactions bellow</Text>
      </Animated.View>

      <Animated.Image
        source={{ uri: item }}
        style={[styles.image, styleImage]}
        sharedTransitionTag={`image-${item}`}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        onChange={onChange}
        animatedIndex={anim}
      >
        <BottomSheetFlatList
          data={ARRAY_DATA}
          renderItem={renderItem}
          style={[styles.list]}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center"
  },
  titleCard: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center"
  },
  descriptionCard: {
    fontSize: 12,
    color: "#FFFFFF60",
    textAlign: "center"
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginVertical: 20
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#DEDEDE30"
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "white"
  },
  description: {
    fontSize: 12,
    color: "white"
  },
  list: {
    marginTop: 10,
    backgroundColor: "black"
  },
  contentContainerStyle: {
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 20
  }
})

export default DetailScreen;