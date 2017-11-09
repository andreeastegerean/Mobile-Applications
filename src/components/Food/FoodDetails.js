
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

export default class FoodDetails extends Component{
    static navigationOptions = {
        header:null,
    };

    constructor(props) {
        super(props);
        const { state } = this.props.navigation;
        const { navigate } = this.props.navigation;
        var food = state.params ? state.params.food : "<undefined>";
        this.state = {
          name: food.name,
          kcal: food.kcal,
          quantity: food.quantity
        };
      }
      goToFoods = () =>{
          this.props.navigate("FoodList")
      }
    render() {
        const {state} = this.props.navigation;
        var food = state.params ? state.params.food : "<undefined>";
        return (
            <View style={styles.container} >      
                <TextInput style = {styles.input} value={this.state.name} 
                onChangeText={name => this.setState({ name })}
                /> 
                <TextInput style = {styles.input} value={this.state.kcal}
                onChangeText={kcal => this.setState({ kcal })}
                /> 
                 <TextInput style={styles.input} value={this.state.quantity}
                 onChangeText={quantity => this.setState({ quantity })}
                 />
                 <TouchableOpacity
          style={styles.button}
          onPress={this.goToFoods
              }
        >
          <Text style={styles.textBtn}>Go Back</Text>
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
          }
    }

);