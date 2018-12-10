import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { AppRegistry } from 'react-native';
// 页面
import Search from '../pages/search'
import Test from '../pages/test'
const AppNavigator = createStackNavigator(
  {
    Test: Test,
    Search: Search,
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
