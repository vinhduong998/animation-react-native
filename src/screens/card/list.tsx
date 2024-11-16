import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ListRenderItemInfo, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';

const ARRAY_IMAGE = [
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097378/6594e43a0d11b9762123e4ea-1705996097378-e033b295-d7ce-43ec-9d3a-246f7991b01e.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097348/6594e43a0d11b9762123e4ea-1705996097348-hot-girl-mac-trang-phuc-co-trang%20%282%29.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097452/6594e43a0d11b9762123e4ea-1705996097452-image-co-mot-khung-canh-tet-que-lam-nao-long-nhung-nguoi-con-xa-xu-165223754261653.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097591/6594e43a0d11b9762123e4ea-1705996097591-images2961687_photo_1_15921951689531655112624_16055841958812092389178.png?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097517/6594e43a0d11b9762123e4ea-1705996097517-luu-diec-phi-31-8610-1655191985.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097238/6594e43a0d11b9762123e4ea-1705996097238-pngtree-outdoorsy-young-woman-sporting-shades-confidently-posing-with-a-juice-bottle-meets-the-camera-gaze-photo-image_42709010.jpg?w=2160&h=NaN&fit=crop&auto=format",
  "https://cdn1.behapyglobal.com/lgbtapp.s3.ap-southeast-1.amazonaws.com/2024/01/23_1705996097437/6594e43a0d11b9762123e4ea-1705996097437-trong-tuan-moi-4-cung-hoang-dao-nay-se-rat-thuan-loi-trong-cong-viec-va-tinh-yeu-hot-girl-mac-trang-phuc-co-trang-4.jpg?w=2160&h=NaN&fit=crop&auto=format"
]

const WIDTH_ITEM = 200
const HEIGHT_ITEM = 300

const Item = ({ item }: { item: string }) => {
  const navigation: any = useNavigation()

  const onPress = () => {
    navigation.navigate("Detail", { item })
  }


  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.Image
        source={{ uri: item }}
        style={[styles.item]}
        sharedTransitionTag={`image-${item}`}
      />
    </TouchableWithoutFeedback>
  )
}

const ListScreen = () => {
  const renderItem = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <Item item={item} />
    )
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={ARRAY_IMAGE}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 200
  },
  contentContainerStyle: {
    paddingHorizontal: 100,
    gap: 20
  },
  item: {
    height: HEIGHT_ITEM,
    width: WIDTH_ITEM,
    borderRadius: 20
  }
})

export default ListScreen;