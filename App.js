import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/login';
import LoginForm from './src/components/Login/loginForm'
import FoodList from './src/components/Food/FoodList';
import { StackNavigator } from "react-navigation";
import FoodDetails from './src/components/Food/FoodDetails'
const Application = StackNavigator(
  {
    Login: {screen: Login},
    FoodList: { screen: FoodList },
    FoodDetails: {screen: FoodDetails}
  },
  {
    headerMode: "screen",
    header: null
  }
);
export default class App extends React.Component {
  render() {
    return <Application />;
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
