import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Button, Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import {useState} from "react";

function SignInScreen({navigation}) {
    const auth = getAuth()

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        console.log("signing in")
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.background}>
            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
            <View style={styles.controls}>
                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Email'
                        value={value.email}
                        onChangeText={(text) => setValue({...value, email: text})}
                    />
                </View>
                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Password'
                        value={value.password}
                        onChangeText={(text) => setValue({...value, password: text})}
                        secureTextEntry={true}
                    />
                </View>
                <Button title="Sign in" onPress={()=>signIn()}/>
                <Button title="Sign up" onPress={()=>navigation.navigate("sign up")}/>
            </View>
        </View>
    );
}

function SignUpScreen({navigation}) {

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })
    const auth = getAuth()

    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('sign up');
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.background}>
            <Text style={styles.header}> sign up screen </Text>

            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.controls}>
                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Email'
                        value={value.email}
                        onChangeText={(text) => setValue({...value, email: text})}
                    />
                </View>
                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Password'
                        value={value.password}
                        onChangeText={(text) => setValue({...value, password: text})}
                        secureTextEntry={true}
                    />
                </View>

                <Button title="Sign up" onPress={signUp}/>
            </View>
        </View>
    );
}



const Stack = createNativeStackNavigator();
function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen name="Welcome" component={WelcomeScreen} />*/}
                <Stack.Screen name="sign in" component={SignInScreen} />
                <Stack.Screen name="sign up" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AuthStack