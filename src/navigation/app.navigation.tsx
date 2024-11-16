import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from 'helpers/navigation.helper';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ListNavigation, RootStackList } from './type.navigation';


const NativeStack = createNativeStackNavigator<RootStackList>();

const AppNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}
        onReady={() => {

        }}
      >
        <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor={"transparent"} />
        <NativeStack.Navigator
          screenOptions={{
            animation: "slide_from_right",
            headerBackTitleVisible: false,
            headerShown: false
          }}
        >
          {
            ListNavigation.map(i => (
              <NativeStack.Screen
                key={i.name}
                name={i.name}
                component={i.component}
              />
            ))
          }

        </NativeStack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default AppNavigation;