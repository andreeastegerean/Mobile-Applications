import React, {Component}  from 'react';
import {StyleSheet, View,Image,TextInput,TouchableOpacity,Text,KeyboardAvoidingView} from 'react-native';

export default class LoginForm extends Component{
    
    LoginClick = () => {
        this.props.navigation.navigate("FoodList");
    }
        render(){
            return (
                <View style={styles.container}>
                    <TextInput 
                    placeholder="username"
                    returnKeyType="next"
                    style={styles.input} />
                    <TextInput 
                    placeholder="password"
                    secureTextEntry
                    returnKeyType="go"
                    style={styles.input} />
                    <TouchableOpacity style={styles.loginButton } onPress={this.LoginClick}>
                    <Text style={styles.textButton}>Login </Text>
                    </TouchableOpacity>
                    </View>

                    
            )
        }
    
    }

    const styles= StyleSheet.create(
        {
            container: {
                padding: 40,
            },
            input: {
                height: 40,
                backgroundColor: 'rgba(255,255,255,0.2)',
                marginBottom: 20,
            },
            loginButton:{
                paddingVertical: 10,
                backgroundColor: '#2980b9'
            },
            textButton:{
                textAlign: 'center',
                fontWeight: '700'
            }
        }
    );