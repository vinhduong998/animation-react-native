import TextBase from 'component/core/text/text.base';
import navigationHelper from 'helpers/navigation.helper';
import { ListNavigation, RootStackList } from 'navigation/type.navigation';
import React from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { HS, VS } from 'ui/sizes.ui';

const HomeScreen = () => {

  const renderItem = ({ item }: {
    item: {
      name: keyof RootStackList;
      component: any;
    }
  }) => {
    return (
      <Pressable style={styles.item} onPress={() => navigationHelper.navigate(item.name)}>
        <TextBase title={item.name} fontSize={16} fontWeight='600' />
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ListNavigation}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ gap: VS._10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    paddingVertical: VS._10,
    paddingHorizontal: HS._16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black'
  }
})

export default HomeScreen;