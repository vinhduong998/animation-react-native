import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AppNavigation from 'navigation/app.navigation';
import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'ui/theme/theme.provider';
import getStore, { persistor } from './src/configs/store.config';

const store = getStore()

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <MenuProvider>
                <BottomSheetModalProvider>
                  <AppNavigation />
                </BottomSheetModalProvider>
                {/*
              <SocketConnect ref={GlobalPopupHelper.globalSocketRef} />
              <GlobalPopupApp ref={GlobalPopupHelper.globalUIRef} />
              <WrapDropdown ref={GlobalPopupHelper.globalAlertRef} />
              <WrapAlertView ref={GlobalPopupHelper.alertRef} />
              <WrapActionSheetView ref={GlobalPopupHelper.actionSheetRef} />
              <DisconnectNetworkScreen />
              <ModalMedia ref={GlobalPopupHelper.modalMediaRef} />
              <ModalMediaPost ref={GlobalPopupHelper.modalMediaPostRef} /> */}
              </MenuProvider>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
