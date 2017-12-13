import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import LoginForm from './loginForm';
import Communications from 'react-native-communications';
export default class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }


    SendEmail = () => {
        /*
        Communications.email([this.state.email],null,null,'Shape of you',
        'Your email is ' + this.state.email+ ' , and your new password is '+this.state.password);*/
        this.props.navigation.navigate("FoodList");
    }


    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.containter}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../Images/apple.png')} />
                    <Text style={styles.text}>Welcome to shape of you, please login first</Text>
                </View>
                <View style={styles.formcontainer}>
                    <TextInput
                        placeholder="username"
                        returnKeyType="next"
                        style={styles.input} 
                        onChangeText={email => this.setState({email})}
                        />
                    <TextInput
                        placeholder="password"
                        secureTextEntry
                        returnKeyType="go"
                        onChangeText= {password => this.setState({password})}
                        style={styles.input} />
                    <TouchableOpacity style={styles.loginButton} onPress={this.SendEmail}>
                        <Text style={styles.textButton}>Login </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create(
    {
        containter: {
            flex: 1,
            backgroundColor: "#CE563C",
        },

        logoContainer: {
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',

        },

        formContainer: {
            flex: 1,
        },

        logo: {
            width: 100,
            height: 100,
        },
        text: {
            color: '#FFF',
            marginTop: 10,
        },
        formcontainer: {
            padding: 40,
        },
        input: {
            height: 40,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: 20,
        },
        loginButton: {
            paddingVertical: 10,
            backgroundColor: '#2980b9'
        },
        textButton: {
            textAlign: 'center',
            fontWeight: '700'
        }
    }
);