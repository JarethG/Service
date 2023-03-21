import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {newProfile, setPublicUserInfo, writeResourceOffers} from "./Firebase";
import {Text, TextInput, View, Image} from "react-native";
import {styles} from "../Styles";
import Button from '../Components/Button'
import {UserDataForm} from "./AccountHandler";

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
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <Text style={[styles.header,{alignSelf:"center",padding:10}]}>Share your skills and resources</Text>
            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

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
                <Button title="Sign in" onPress={() => signIn()}/>
                <Button title="Sign up" onPress={() => navigation.navigate("create profile")}/>
        </View>
    );
}

function SignUpScreen({navigation,route}) {
    const profile = route.params.newProfile
    console.log(profile)
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }
        createUserWithEmailAndPassword(getAuth(), value.email, value.password)
            .then((userCredential) => {
                newProfile(value.email, profile).then(r => console.log("new profile created"))
                setPublicUserInfo({name: profile.name, avatar: profile.avatar, monthlyPoints: 0,points: 0,rating:{"0":0}},getAuth().currentUser.uid)
                    .then()
                profile.resources.map((resource)=> {
                    writeResourceOffers(getAuth().currentUser.uid, {
                        title:"Offer: " + resource + " available.",
                        rating:0,
                        avatar:profile.avatar,
                        name:profile.name,
                        isComplete:false,
                        uid:getAuth().currentUser.uid
                    })})
            })
            .catch((error) => {
                setValue({
                    ...value,
                    error: error.message
                })
            }
            );

    }

    return (
        <View style={[styles.background,{justifyContent:"center"}]}>
            <View style={[styles.container,styles.midColour,{width:"100%"}]}>
            <Button title={"back"} onPress={()=>navigation.goBack()}/>
            <Text style={styles.header}> Email </Text>

            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.controls}>
                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Email'
                        value={value.email}
                        onChangeText={(text) => setValue({...value, email: text})}
                    />
                </View>
                <Text style={styles.header}> Password </Text>
                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Password'
                        value={value.password}
                        onChangeText={(text) => setValue({...value, password: text})}
                        secureTextEntry={true}
                    />
                </View>
                <Button title="create new account" onPress={signUp}/>
            </View>
            </View>
        </View>
    );
}

function NewProfileScreen({navigation, route}) {
    const emptyProfile = {
        avatar:0,
        about: "",
        name: "",
        resources: [],
        skills: [],
        title: ""
    }

    return (
        <View style={[styles.background,{justifyContent:"center"}]}>
            <Button title={"back"} onPress={()=>navigation.goBack()}/>
            <View style={[styles.midColour,{width:"100%"},styles.container]}>
                 <UserDataForm oldData={emptyProfile} submit={(r)=>navigation.navigate("sign up", {newProfile:r})}/>
             </View>
        </View>
    )
}


const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="sign in" component={SignInScreen}/>
                <Stack.Screen name="sign up" component={SignUpScreen}/>
                <Stack.Screen name="create profile" component={NewProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStack