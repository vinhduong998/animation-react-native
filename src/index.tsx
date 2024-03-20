import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardNavigator from './component/card';

const MainSrc = () => {
  return (
    <View style={styles.container}>
      <CardNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
export default MainSrc;