import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native';
import ApiClient from "../../Utils/ApiClient";
import { AsyncStorage } from "react-native";

export default class FoodList extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: "Foods",
            headerStyle: { backgroundColor: "#CE563C" },
            headerTitleStyle: { color: "white" },
            headerRight: <Button title="+" onPress={() => params.handleAdd()} />,
            headerLeft: <Button title="Chart" onPress={() => params.handleChart()} />
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {
                    Id: 0,
                    Name: "",
                    Kcal: 0,
                    Quantity: 0
                }],
        }
    }

    goToAdd = () => {
        this.props.navigation.navigate("AddFood", { onGoBack: () => this.reloadData() });
    };

    goToChart = () => {
        this.props.navigation.navigate("PieChart",{onGoBack: () => this.reloadData()});
    };

    componentDidMount() {
        this.props.navigation.setParams({ handleAdd: this.goToAdd,handleChart: this.goToChart });
        this.reloadData();
    }

    reloadData = async () => {
        ApiClient.fetchFoods().then(foods => {
            var list = foods;
            if (foods !== null) {

                this.setState({ dataSource: list }, function () {
                    console.log(this.state.dataSource);
                });
            }
        }).catch((error) => {
            console.log("Api call error");
            alert(error.message);
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <FlatList
                        style={styles.flatContainer}
                        data={this.state.dataSource}
                        renderItem={
                            ({ item }) => <View style>
                                <Text style={styles.text}>
                                    {item.Name}, {item.Kcal}, {item.Quantity}</Text>

                                <Button
                                    title={"Edit"}
                                    onPress={
                                        () => navigate('FoodDetails', { food: item })

                                    }>
                                </Button>

                                <Button
                                    title={"Delete"}
                                    onPress={() => {
                                        ApiClient.deleteFood(item.Id);
                                        this.reloadData();
                                    }
                                    }
                                >
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
        backgroundColor: '#CE563C',
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



