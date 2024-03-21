import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Marquee from './component/marquee/marquee';
import Slide from './component/ballon-slider';

const MainSrc = () => {
  return (
    <View style={styles.container}>
      <Slide />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
export default MainSrc;