import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react'

import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomePageScreen from "./screens/HomePageScreen"
import IntroductionScreen from "./screens/IntroductionScreen"
import PortfolioScreen from "./screens/PortfolioScreen"
import StrategyListScreen from "./screens/StrategyListScreen"
import WishListScreen from "./screens/WishListScreen"

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import wishlist from './reducers/wishlist';
import token from './reducers/token';

const store = createStore(combineReducers({ token, wishlist }));

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomePageScreen" component={ HomePageScreen } />
          <Stack.Screen name="IntroductionScreen" component={ IntroductionScreen } />
          <Stack.Screen name="PortfolioScreen" component={ PortfolioScreen } />
          <Stack.Screen name="StrategyListScreen" component={ StrategyListScreen } />
          <Stack.Screen name="WishListScreen" component={ WishListScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
