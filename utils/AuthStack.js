import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {newProfile} from "./Firebase";
import {Text, TextInput, View, Touchable, Pressable, Modal, Image} from "react-native";
import {styles} from "../Styles";
import Requests from "../JSONS/Requests.json";
import Button from '../Components/Button'
import {Skills, Resources} from '../JSONS/Tags.json'
import Picker from "../Components/Picker";

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
                <Button title="Sign up" onPress={() => navigation.navigate("sign up")}/>
                {/*<Button title="Sign in as Jareth" onPress={() =>*/}
                {/*    signInWithEmailAndPassword(auth, "jarethgaskin@gmail.com", "123456").then()}/>*/}
                {/*<Button title="Sign in as Wane" onPress={() =>*/}
                {/*    signInWithEmailAndPassword(auth, "waneking@gmail.com", "123456").then()}/>*/}

        </View>
    );
}

function SignUpScreen({navigation}) {

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
        navigation.navigate("create profile", {value})
    }

    return (
        <View style={styles.background}>
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

                <Button title="Next" onPress={signUp}/>
            </View>
        </View>
    );
}

function NewProfileScreen({navigation, route}) {
    // console.log(route.params)
    const [profile, setProfile] = React.useState({
        about: "",
        name: "",
        resources: [],
        skills: [],
        title: ""
    })
    const [filteredResults, setFilteredResults] = useState(Requests)
    const [filtering, setFiltering] = useState(false)
    const [stage,setStage] = useState(0)


    const auth = getAuth()

    async function createNewAccount() {
        try {
            await createUserWithEmailAndPassword(auth, route.params.value.email, route.params.value.password);
            newProfile(route.params.value.email, profile).then(r => console.log("new profile created"))
            navigation.navigate('sign in');
        } catch (error) {
            console.log("Massive errors", error)
        }
    }

    return (
        <View style={styles.background}>
            {stage == 0 ?
                <View style={styles.container}>
                    <Text style={styles.header}>Welcome!</Text>
                    <Text style={styles.cardText}>let continue the creation of your account.</Text>
                    <Text style={styles.cardText}>All of this information can be changed later, dont worry too much
                        about
                        the
                        specifics!</Text>
                    <Text style={styles.header}>Tell us about yourself</Text>
                    <View style={styles.transparentContainer}>
                        <TextInput
                            value={profile.about}
                            placeholder='text...'
                            onChangeText={(text) => setProfile({...profile, about: text})}
                        />
                    </View>
                    <Text style={styles.header}> Name </Text>
                    <View style={styles.transparentContainer}>
                        <TextInput
                            value={profile.name}
                            placeholder='text...'
                            onChangeText={(text) => setProfile({...profile, name: text})}
                        />
                    </View>
                    <Text style={styles.header}> Your personal title</Text>
                    <View style={styles.transparentContainer}>
                        <TextInput
                            value={profile.title}
                            placeholder='i.e Teacher, student, doctor'
                            onChangeText={(text) => setProfile({...profile, title: text})}
                        />
                    </View>
                    <Button title={"next"} onPress={() => {
                       setStage(1)}}/>
                </View>
                :
                <View style={styles.container}>
                    <Button title={"back"} onPress={() => {
                        setStage(0)
                    }}/>
                    <Text style={styles.header}>what can you provide?</Text>
                    <Picker data={Resources}
                            buttonTitle={"Select Resource"}
                            apply={(r) => setProfile({...profile, resources: r})
                            }/>
                    <View style={styles.transparentContainer}>
                        {profile.resources?.map((resource, index) => {
                            return <Text key={index}>{resource}</Text>
                        })}
                    </View>
                    <Picker data={Skills}
                            buttonTitle={"Select Skills"}
                            apply={(r) => setProfile({...profile, skills: r})
                            }/>
                    <View style={styles.transparentContainer}>
                        {profile.skills?.map((resource, index) => {
                            return <Text key={index}>{resource}</Text>
                        })}


                    </View>
                    <Button title={"Create Account"} onPress={() => {
                        createNewAccount().then(r => console.log("finished"))
                        navigation.navigate("sign in")
                    }
                    }/>
                </View>
            }
        </View>
    )
}


const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {/*<Stack.Screen name="Welcome" component={WelcomeScreen} />*/}
                <Stack.Screen name="sign in" component={SignInScreen}/>
                <Stack.Screen name="sign up" component={SignUpScreen}/>
                <Stack.Screen name="create profile" component={NewProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStack