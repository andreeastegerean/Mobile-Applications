
import React, { Component } from 'react';
import {
    AppRegistry,
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    TextInput,
    Linking
} from 'react-native';
import ApiClient from "../../Utils/ApiClient";

export default class FoodDetails extends Component{
    static navigationOptions = {
        title: "Details",
        headerStyle: { backgroundColor: "#CE563C" },
        headerTitleStyle: { color: "white" },
    };

    constructor(props) {
        super(props);
        const { state } = this.props.navigation;
        const { navigate } = this.props.navigation;
        var food = state.params ? state.params.food : "<undefined>";
        this.state = {
            name: food.Name,
            kcal: food.Kcal,
            quantity: food.Quantity
          };
          console.log(this.state.name)
          console.log(this.state.kcal)
          console.log(this.state.quantity)
      }

      update = async () => {
        const { state } = this.props.navigation;
        var food = state.params ? state.params.food : "<undefined>";
        var foodId = food.Id;
        console.log("ID-ul food-ului este "+ foodId);
        var resp = await ApiClient.updateFood(
            foodId,
          this.state.name,
          this.state.kcal,
          this.state.quantity
        )
          if (resp.ok === true) {
           
           Alert.alert(name+" was updated!");
            this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack();
    
          } else {
            
            Alert.alert("Error At update", "Error");
          }
    
      }

    render() {
        const {state} = this.props.navigation;
        var food = state.params ? state.params.food : "<undefined>";
        return (
            <View style={styles.container} >      
                <TextInput style = {styles.input} value={this.state.name} 
                onChangeText={name => this.setState({ name })}
                /> 
                <TextInput style = {styles.input} value={this.state.kcal.toString()}
                onChangeText={kcal => this.setState({ kcal })}
                /> 
                 <TextInput style={styles.input} value={this.state.quantity.toString()}
                 onChangeText={quantity => this.setState({ quantity })}
                 />
                 <TouchableOpacity
          style={styles.button}
          onPress={this.update}
        >
          <Text style={styles.textBtn}>Update</Text>
        </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create(
    {
        foodName:{
            color:'#E91E63',
            fontSize:25,
            textAlign:'center',
        },

        container: {
            flex: 1,
            paddingTop: 50,
            padding: 20,
            backgroundColor: "#D0B3AD"
        },
        text: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2c3e50",
            color: "white",
            fontSize: 30
          },

          input: {
            height: 40,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: 20,
        },

          button:{
            backgroundColor: "#832713",
            paddingVertical: 15,
            marginTop: 30
          },
          textBtn: {
            textAlign: 'center',
            fontWeight: '700'
          }
    }

);