import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native';


export default class FoodList extends Component {


    static navigationOptions = {
        title: "Foods",
        headerStyle: { backgroundColor: "#CE563C" },
        headerTitleStyle: { color: "white" }
    };
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            foods2: [{ key: "Bread", id: 1, kcal: 1300, quantity: 133, },
            { key: "Eggs", id: 2, kcal: 187, quantity: 123, },
            { key: "Chocolate", id: 3, kcal: 13, quantity: 3, },
            ]
        };
    }
    foods = [
        {
            id: '1',
            name: 'Bread',
            kcal: '100',
            quantity: '1'
        },
        {
            id: '2',
            name: 'Chocolate',
            kcal: '1000',
            quantity: '2'
        },
        {
            id: '3',
            name: 'Pasta',
            kcal: '700',
            quantity: '1'
        },
        {
            id: '4',
            name: 'Chicken',
            kcal: '340',
            quantity: '2'
        }
    ]




    goToFoodDetails = () => {
        this.props.navigation.navigate("FoodDetails")
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <FlatList
                        style={styles.flatContainer}
                        data={this.foods}
                        renderItem={
                            ({ item }) => <View style>
                                <Text style={styles.text}>
                                    {item.name}, {item.kcal}, {item.quantity}</Text>

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



