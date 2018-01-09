import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/login';
import LoginForm from './src/components/Login/loginForm'
import FoodList from './src/components/Food/FoodList';
import AddFood from './src/components/Food/AddFood';
import { StackNavigator } from "react-navigation";
import FoodDetails from './src/components/Food/FoodDetails'
import PieChart from './src/components/Chart/Chart'
import Register from './src/components/Register/Register'
const Application = StackNavigator(
  {
    Login: {screen: Login},
    Register: {screen: Register},
    FoodList: { screen: FoodList },
    FoodDetails: {screen: FoodDetails},
    AddFood: {screen: AddFood},
    PieChart: {screen: PieChart}
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
