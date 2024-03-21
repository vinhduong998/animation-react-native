import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppleStock from './component/apple-stock/apple-stock';

const MainSrc = () => {
  return (
    <View style={styles.container}>
      <AppleStock />
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