import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChartCoin from './screens/chart-coin';

const MainSrc = () => {
  return (
    <View style={styles.container}>
      <ChartCoin />
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