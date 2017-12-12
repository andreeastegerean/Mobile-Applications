
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
            currentlySelectedValue: {key:"1",value:"1g"}
        };
    }

    componentDidMount() {
    }

    save = async () => {
        var name = this.state.name;
        var kcal = parseInt(this.state.kcal);
        var qu = parseInt(this.state.currentlySelectedValue);
        console.log(name + kcal + qu);
        ApiClient.addFood(name, kcal, qu)
            .then(alert(name + " added successfully!"))
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            })


        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
    };

    render() {

        const { state } = this.props.navigation;
        var food = state.params ? state.params.food : "<undefined>";
        var options = [{ key: "1", value: "1g" }, { key: "2", value: "2g" }, { key: "3", value: "3g" }];

        let quantities = options.map(data => {
            return (
                <Picker.Item
                    key={data.key}
                    value={data.key}
                    label={data.value}
                />
            );
        });
        return (
            <View style={styles.container} >
                <TextInput style={styles.input} placeholder="Food name"
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput style={styles.input} placeholder="callories"
                    onChangeText={kcal => this.setState({ kcal })}
                />
                <Picker
                selectedValue={this.state.currentlySelectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ currentlySelectedValue: itemValue })
                }
                >{quantities}</Picker>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.save}>
                    <Text style={styles.textBtn}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create(
    {
        foodName: {
            color: '#E91E63',
            fontSize: 25,
            textAlign: 'center',
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

        button: {
            backgroundColor: "#832713",
            paddingVertical: 15,
            marginTop: 30
        },

        textBtn: {
            textAlign: 'center',
            fontWeight: '700'
        }
    });