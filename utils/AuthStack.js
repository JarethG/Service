import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {newProfile} from "./Firebase";
import {Text, TextInput, View, Touchable, Pressable, Modal} from "react-native";
import {styles} from "../Styles";
import {NoticeboardFilters} from "../Components/NoticeboardFilters";
import Requests from "../JSONS/Requests.json";
import ResourcePicker from "../Components/ResourcePicker";
import Button from '../Components/Button'

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
                <Button title="Sign in" onPress={() => signIn()}/>
                <Button title="Sign up" onPress={() => navigation.navigate("sign up")}/>
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

    function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }
        navigation.navigate("create profile",{value})
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

function NewProfileScreen({navigation,route}) {
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
    const [visible,setVisible] = useState(false)

    const auth = getAuth()

    async function createNewAccount() {
        try {
            await createUserWithEmailAndPassword(auth, route.params.value.email, route.params.value.password);
            newProfile(route.params.value.email,profile).then(r => console.log("new profile created"))
            navigation.navigate('sign in');
        } catch (error) {
            console.log("Massive errors",error)
            }
        }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.header}>Welcome!</Text>
                <Text style={styles.cardText}>let continue the creation of your account.</Text>
                <Text style={styles.cardText}>All of this information can be changed later, dont worry too much about the
                    specifics!</Text>
                <Text style={styles.header}>Tell us about yourself</Text>
                <View style={styles.transparentContainer}>
                    <TextInput
                        profile={profile.about}
                        placeholder='text...'
                        onChangeText={(text) => setProfile({...profile, about: text})}
                    />
                </View>
                <Text style={styles.header}> Name </Text>
                <View style={styles.transparentContainer}>
                    <TextInput
                        profile={profile.name}
                        placeholder='text...'
                        onChangeText={(text) => setProfile({...profile, name: text})}
                    />
                </View>
                <Text style={styles.header}> Your personal title</Text>
                <View style={styles.transparentContainer}>
                    <TextInput
                        profile={profile.title}
                        placeholder='i.e Teacher, student, doctor'
                        onChangeText={(text) => setProfile({...profile, title: text})}
                    />
                </View>
                <Text style={styles.header}>what can you provide?</Text>
                {visible? <Modal
                    onRequestClose={() => {
                        setVisible(false);
                    }}>
                        <ResourcePicker setVisible={setVisible} apply={(r) => setProfile({...profile, resources: r})}/>
                    </Modal> :
                    <Button title={"select resources"} onPress={()=>setVisible(true)}></Button>}
                <View style={styles.transparentContainer}>
                {profile.resources?.map((resource,index)=>{
                    return <Text key={index}>{resource}</Text>
                })}
                </View>
                <Button title={"Start"} onPress={()=> {
                    createNewAccount().then(r => console.log("finsihed"))
                    navigation.navigate("sign in")
                }
                }/>
            </View>
        </View>
    )
}


const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen name="Welcome" component={WelcomeScreen} />*/}
                <Stack.Screen name="sign in" component={SignInScreen}/>
                <Stack.Screen name="sign up" component={SignUpScreen}/>
                <Stack.Screen name="create profile" component={NewProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStack