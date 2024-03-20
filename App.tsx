import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainSrc from './src';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainSrc />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
