import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import NumberFloat from './number-float';

const NumberFloatScreen = () => {
  const [number, setNumber] = useState(196911)

  const onChange = () => {
    setNumber(Math.round(Math.random() * 100000) + 100000)
  }

  return (
    <View style={styles.container}>
      <NumberFloat value={number} locale={"en-US"} fontSize={500} currency='USD' />
      <Button
        onPress={onChange}
        title='Regenerate Number'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default NumberFloatScreen;