import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import Item from './component/item';
import ARRAY_DATA from "./data.json";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Marquee from "../marquee/marquee";

const window = Dimensions.get("window")

const AppleStock = () => {
  const aniIndex = useSharedValue(0)
  const snapPoints = useMemo(() => [100, "50%", window.height - 130], [])

  const styleMarquee = useAnimatedStyle(() => {
    return {
      opacity: interpolate(aniIndex.value, [1, 1.5, 2], [0, 0, 1], Extrapolation.CLAMP)
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Crypto currencies</Text>
        <Text style={styles.descriptionHeader}>12th December</Text>
      </View>
      <FlatList
        data={ARRAY_DATA}
        renderItem={(item) => (
          <Item {...item} />
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />

      <Animated.View style={[styles.marquee, styleMarquee]}>
        <Marquee spacing={20} speed={1}>
          <View style={styles.row}>
            {ARRAY_DATA.slice(0, 10).map((i, id) => (
              <Item
                key={`item-${id}`}
                item={i}
              />
            ))}
          </View>
        </Marquee>
      </Animated.View>

      <BottomSheet
        snapPoints={snapPoints}
        index={0}
        animatedIndex={aniIndex}
        enablePanDownToClose={false}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={{ backgroundColor: "white" }}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.titleBottomSheet}>News</Text>
          <BottomSheetFlatList
            data={ARRAY_DATA}
            renderItem={() => (
              <View style={styles.itemBottomSheet} />
            )}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          />
        </View>

      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    paddingTop: 60
  },
  contentContainerStyle: {
    gap: 10,
    paddingBottom: 60
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "white"
  },
  descriptionHeader: {
    fontSize: 16,
    color: "white"
  },
  itemBottomSheet: {
    backgroundColor: "#00000030",
    width: "100%",
    height: 120,
    borderRadius: 20
  },
  bottomSheet: {
    backgroundColor: "#00000090",
    flex: 1,
    paddingHorizontal: 16
  },
  handleStyle: {
    backgroundColor: "#00000090",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  titleBottomSheet: {
    color: "white",
    fontSize: 40,
    fontWeight: "600",
    paddingVertical: 10
  },
  marquee: {
    position: "absolute",
    top: 0,
    paddingTop: 40,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 130,
    backgroundColor: "black"
  },
  row: {
    flexDirection: "row"
  }
})

export default AppleStock;