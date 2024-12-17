import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from 'A2bApp/src/navigation/routes';
import React, { useLayoutEffect } from 'react';
import { Dimensions, ImageRequireSource, LogBox, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Ignore log notification by message
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

const { width, height } = Dimensions.get('window');

interface ItemType {
  title: string;
  description: string;
  image: ImageRequireSource;
}

const IMAGES = [
  {
    title: 'Title 1',
    description: 'Description 1',
    image: require('A2bApp/src/containers/main/assets/1.jpg'),
  },
  {
    title: 'Title 2',
    description: 'Description 2',
    image: require('A2bApp/src/containers/main/assets/2.jpg'),
  },
  {
    title: 'Title 3',
    description: 'Description 3',
    image: require('A2bApp/src/containers/main/assets/3.jpg'),
  },
  {
    title: 'Title 4',
    description: 'Description 4',
    image: require('A2bApp/src/containers/main/assets/4.jpeg'),
  },
  {
    title: 'Title 5',
    description: 'Description 5',
    image: require('A2bApp/src/containers/main/assets/5.jpeg'),
  },
];

const PADDING_HORIZONTAL = 40;
const WIDTH_ITEM = width - 2 * PADDING_HORIZONTAL;
const TRANSLATEX_IMAGE = 100;
const SCALE_ITEM = 0.9;
const HEIGHT_ITEM = height * 0.6;

interface ItemProps {
  translateX: SharedValue<number>;
  item: ItemType;
  index: number;
}

const Item = ({ item, translateX, index }: ItemProps) => {
  const inputText = [(index - 0.5) * width, index * width, (index + 0.5) * width];
  const styleText = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, inputText, [0, 1, 0], Extrapolation.CLAMP),
      transform: [
        {
          translateX: interpolate(translateX.value, inputText, [-100, 1, 100], Extrapolation.CLAMP),
        },
      ],
    };
  });

  const styleView = useAnimatedStyle(() => {
    const inputView = [(index - 1) * width, index * width, (index + 1) * width];
    const paddingHorizontal = (WIDTH_ITEM * (1 - SCALE_ITEM)) / 2 + PADDING_HORIZONTAL * 1.5;
    const translateY = (HEIGHT_ITEM * (1 - SCALE_ITEM)) / 2;
    return {
      transform: [
        {
          translateX: interpolate(translateX.value, inputView, [-paddingHorizontal, 0, paddingHorizontal]),
        },
        {
          translateY: interpolate(translateX.value, inputView, [translateY, 0, translateY]),
        },
        {
          scale: interpolate(translateX.value, inputView, [SCALE_ITEM, 1, SCALE_ITEM]),
        },
      ],
    };
  });

  const styleAniImage = useAnimatedStyle(() => {
    const inputImage = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      transform: [
        {
          scale: interpolate(translateX.value, inputImage, [1.6, 1, 1.6]),
        },
        {
          translateX: interpolate(translateX.value, inputImage, [-TRANSLATEX_IMAGE, 0, TRANSLATEX_IMAGE]),
        },
      ],
    };
  });

  return (
    <View style={styles.item}>
      <Animated.View style={[styleText]}>
        <Text style={styles.titleItem}>{item.title}</Text>
        <Text style={styles.descriptionItem}>{item.description}</Text>
      </Animated.View>

      <Animated.View style={[styles.imageItem, styleView]}>
        <Animated.Image source={item.image} style={[styles.imageItem, styleAniImage]} resizeMode="cover" />
      </Animated.View>
    </View>
  );
};

interface ItemOverlayProps {
  item: ImageRequireSource;
  index: number;
  translateX: SharedValue<number>;
}

const ImageOverlay = ({ index, item, translateX }: ItemOverlayProps) => {
  const styleImage = useAnimatedStyle(() => {
    const input = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      opacity: interpolate(translateX.value, input, [0, 1, 0], Extrapolation.CLAMP),
    };
  });
  return (
    <Animated.View style={[styles.itemImageOverlay, styleImage]}>
      <Animated.Image source={item} style={[styles.imageOverlay]} resizeMode={'cover'} />
    </Animated.View>
  );
};

const Overlay = ({ translateX }: { translateX: SharedValue<number> }) => {
  return (
    <View style={styles.overlay}>
      {IMAGES.map((item, index) => (
        <ImageOverlay key={index.toString()} item={item.image} index={index} translateX={translateX} />
      ))}
      <BlurView style={StyleSheet.absoluteFillObject} blurType="dark" blurAmount={15} />
    </View>
  );
};

const WallpaperAnimatedCarousel = () => {
  const translateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item, index }: { item: ItemType; index: number }) => {
    return <Item key={index} item={item} index={index} translateX={translateX} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Overlay translateX={translateX} />
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}>
        {IMAGES.map((item, index) => renderItem({ item, index }))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  item: {
    width: width,
    paddingHorizontal: PADDING_HORIZONTAL,
    justifyContent: 'space-around',
  },
  imageItem: {
    width: width - 2 * PADDING_HORIZONTAL,
    height: HEIGHT_ITEM,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageOverlay: {
    width: '100%',
    height: '100%',
  },
  itemImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  titleItem: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
  descriptionItem: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white',
  },
});

export default WallpaperAnimatedCarousel;
