import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native';
import ApiClient from "../../Utils/ApiClient";
import { AsyncStorage } from "react-native";
export default class FoodList extends Component {


    static navigationOptions = {
        title: "Foods",
        headerStyle: { backgroundColor: "#CE563C" },
        headerTitleStyle: { color: "white" }
    };
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {
                  Id: 0,
                  Name: "",
                  Kcal:0,
                  Quantity:0
                }],
        }
    }

    componentDidMount() {
        console.log("am ajuns in component did mount")
        this.reloadData();
      }

    reloadData = async () => {
        
        console.log("am intrat in reload data")
        ApiClient.fetchFoods().then(foods => {
          if (foods != null) {
            this.setState({dataSource: foods},function () {
                console.log(this.state.dataSource);
                console.log("am intrat in fct de la setState")
            });
          }
        }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
      }

    goToFoodDetails = () => {
        this.props.navigation.navigate("FoodDetails")
    }

    
    render() {
        const { navigate } = this.props.navigation;
        console.log("am ajuns si in render")
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <FlatList
                        style={styles.flatContainer}
                        data={this.dataSource}
                        renderItem={
                            ({ item }) => <View style>
                                <Text style={styles.text}>
                                    {item.Name}, {item.Kcal}, {item.Quantity}</Text>

                                <Button
                                    title={"View/Edit"}
                                    onPress= {
                                        () => navigate('FoodDetails',{ food : item })

                                    }>
                                </Button>
                            </View>

                        }
                        extraData={this.state}
                    >
                    </FlatList>
                </ScrollView>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#D0B3AD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginLeft: 25,
        fontSize: 20,
        paddingBottom: 4,
        textAlign: 'center',

    },
    cell: {
        flex: 1,
        margin: 5,
        backgroundColor: "#CD9184",
        height: 50,
        width: 90
    },
    scrollContainer: {


    },
    flatContainer: {
        backgroundColor: 'red',
        paddingBottom: 4,
        flex: 1,
        margin: 5,
    },
    editButton: {
        backgroundColor: '#CE563C',
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 24,
    }
});



