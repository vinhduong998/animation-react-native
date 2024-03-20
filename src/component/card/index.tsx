import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './list';
import DetailScreen from './detail';
import { NavigationContainer } from '@react-navigation/native';

const CardStack = createNativeStackNavigator()

const CardNavigator = () => {
  return (
    <NavigationContainer>
      <CardStack.Navigator
        initialRouteName='List'
      >
        <CardStack.Screen name="List" component={ListScreen} />
        <CardStack.Screen name="Detail" component={DetailScreen} options={{ presentation: "transparentModal", animation: "fade" }} />
      </CardStack.Navigator>
    </NavigationContainer>
  )
}

export default CardNavigator;