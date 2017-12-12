
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Picker,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import ApiClient from "../../Utils/ApiClient";

export default class AddFood extends Component {

    static navigationOptions = {
        title: "Add New Food",
        headerStyle: { backgroundColor: "#CE563C" },
        headerTitleStyle: { color: "white" }
      };
      constructor(props) {
        super(props);
        this.state = {
          name: "",
          kcal: 0,
          quantity: 0,
        };
      }
    
      componentDidMount() {
      }

      save = async () => {
        var name = this.state.name;
        var kcal=parseInt(this.state.kcal);
        var qu=parseInt(this.state.quantity);
        var addResult = await ApiClient.addFood(name, kcal,qu);
        console.log(addResult);
        if (addResult) {
          Alert.alert(name + " was added successfully!");
        } else {
            console.log("addResult is not ok")
            Alert.alert(addResult.message);
        }
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
      };

      render() {
        
        const {state} = this.props.navigation;
        var food = state.params ? state.params.food : "<undefined>";
        var options =["Home","Savings","Car","GirlFriend"];
        /*
        let quantities = this.state.qList.map(data => {
            return (
              <Picker.Item
                key={data.key}
                value={data.value}
                label={data.value}
              />
            );
        });*/

        /*
        <Picker
                 mode="dropdown"
                 selectedValue={}
                 onValueChange={(itemValue, itemIndex) => this.setState({qList: itemValue})}
                 >
                    {options.map((item, index) => {
             return (<Item label={item} value={index} key={index}/>) 
                            })}
                 </Picker>*/
        return (
            <View style={styles.container} >      
                <TextInput style = {styles.input} placeholder="Food name"
                onChangeText={name => this.setState({ name })}
                /> 
                <TextInput style = {styles.input} placeholder="callories"
                onChangeText={kcal => this.setState({ kcal })}
                /> 
                 <TextInput style={styles.input} placeholder="quantity"
                 onChangeText={quantity => this.setState({ quantity })}
                 />
                 
                 
                 <TouchableOpacity
                    style={styles.button} 
                    onPress={this.save}> 
          <Text style={styles.textBtn}>Save</Text>
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

          textBtn:{
            textAlign: 'center',
            fontWeight: '700'
          }
    });