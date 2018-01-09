
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    AsyncStorage,
    Alert,
    Picker
} from "react-native";
import Communications from 'react-native-communications';

import ApiClient from "../../Utils/ApiClient";

export default class Register extends Component {
    static navigationOptions = {
        title: "Don't have an account?",
        headerStyle: { backgroundColor: "#EBC8C0" },
        headerTitleStyle: { color: "white" }
    };
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            username: "",
            password: "",
            email: "",
            role: 1
        };
    }

    RegisterClick = () => {
        var fullname = this.state.fullname;
        var username = this.state.username;
        var email = this.state.email;
        var password = this.state.password;
        var role = parseInt(this.state.role);
        console.log(fullname + email + username + role);
        ApiClient.register(fullname, email, username,password,role)
            .then(alert("the account with username "+username + " has been created successfully!"))
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            })


    
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={fullname => this.setState({ fullname })}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder="fullname"
                    placeholderTextColor="rgba(225,225,225,0.7)"
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={username => this.setState({ username })}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder="username"
                    placeholderTextColor="rgba(225,225,225,0.7)"
                />

                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    placeholder="email"
                    placeholderTextColor="rgba(225,225,225,0.7)"
                />

                <TextInput
                    style={styles.input}
                    returnKeyType="go"
                    ref={input => (this.passwordInput = input)}
                    onChangeText={password => this.setState({ password })}
                    placeholder="Password"
                    placeholderTextColor="rgba(225,225,225,0.7)"
                    secureTextEntry
                />
                <Picker
                    selectedValue={this.state.role}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ role: itemValue })}
                >
                    <Picker.Item label="Admin" value="1" />
                    <Picker.Item label="Guest" value="2" />
                </Picker>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.RegisterClick}
                >
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 20,
        backgroundColor: "#CE563C"
    },
    input: {
        height: 40,
        backgroundColor: "rgba(225,225,225,0.2)",
        marginBottom: 5,
        padding: 10,
        color: "#fff"
    },
    buttonContainer: {
        backgroundColor: "#EBC8C0",
        paddingVertical: 15,
        marginTop: 30
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700"
    },
    labelText: {
        color: "white",
        textAlign: "center",
        fontWeight: "600",
        paddingBottom: 50,
        fontSize: 40
    }
});