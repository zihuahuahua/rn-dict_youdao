import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { AppRegistry } from 'react-native';
// 页面
import Home from '../pages/home'
import Test from '../pages/test'
const AppNavigator = createStackNavigator(
  {
    Test: Test,
    Home: Home,
  }, {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Navigation = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}

AppRegistry.registerComponent('App', () => App);
