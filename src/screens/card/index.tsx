import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './detail';
import ListScreen from './list';

const CardStack = createNativeStackNavigator()

const CardNavigator = () => {
  return (
    <CardStack.Navigator
      initialRouteName='List'
      screenOptions={{
        presentation: "transparentModal"
      }}
    >
      <CardStack.Screen name="List" component={ListScreen} />
      <CardStack.Screen name="Detail" component={DetailScreen} />
    </CardStack.Navigator>
  )
}

export default CardNavigator;