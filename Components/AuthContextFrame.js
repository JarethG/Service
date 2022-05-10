import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import {styles} from "../Styles";
import * as users from '../JSONS/users.json'
import {useContext, useState} from "react";
import Splash from "../Screens/Splash";
import logins from "../JSONS/logins.json"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';



import {sendMessage} from "../utils/Firebase";

const UserContext = React.createContext({
    user: null,
    setUser: () => {
    }
});
const auth = getAuth();

export default UserContext

function SignInScreen({navigation}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = useState('')
    const {user, setUser} = useContext(UserContext)

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
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

    function invalid(data) {
        let token
        logins.map((x) => {
            if (data.username == x.username) {
                token = x["user token"]
            }
        })

        if (!token) return

        let retrieved = users[token]
        setUser(retrieved)
        SecureStore.setItemAsync('userToken', token).then()
    }

    return (
        <View style={styles.background}>

                {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Email'
                        value={value.email}
                        onChangeText={(text) => setValue({ ...value, email: text })}
                    />
                </View>
                <View style={styles.transparentContainer}>
                    <TextInput
                        placeholder='Password'
                        containerStyle={styles.control}
                        value={value.password}
                        onChangeText={(text) => setValue({ ...value, password: text })}
                        secureTextEntry={true}
                    />
            </View>
            <Button title="Sign in" onPress={()=>signIn}/>
            <View style={styles.transparentContainer}>
                <TextInput
                    placeholder="message"
                    value={message}
                    onChangeText={setMessage}
                />
            </View>
            <Button title={"send"} onPress={() => {
                sendMessage("test1", message).then(r => console.log("message sent |>" + r))
            }}/>
            <Button title={"sign up"} onPress={() => {navigation.navigate("SignUp")}}/>
        </View>
    );
}

function SignUpScreen({navigation}) {

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

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
            navigation.navigate('SignIn');
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

                <Button title="Sign up" onPress={signUp}/>
            </View>
        </View>
    );
}

const Stack = createNativeStackNavigator();

export function AuthContextFrame({children}) {


    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState()
    const value = {user, setUser}


    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                userToken = await SecureStore.getItemAsync('userToken');

            } catch (e) {
                // Restoring token failed
                console.log(e)
            }

            userToken ? (console.log("token was found and is" + userToken)) : console.log("token does not exist")
            setUser(users[userToken])

            setInterval(() => {
                setIsLoading(false)
            }, 500)


            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
        };
        // bootstrapAsync();
    }, []);


    return (
        <UserContext.Provider value={value}>
            <NavigationContainer>
                {isLoading ? (
                    // We haven't finished checking for the token yet
                    <Splash/>
                ) : user == null ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{
                                title: 'Sign in',
                                // When logging out, a pop animation feels intuitive
                                // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />
                        <Stack.Screen
                            name={"SignUp"}
                            component={SignUpScreen}/>
                    </Stack.Navigator>
                ) : (
                    // User is signed in
                    // <Stack.Screen name="Home" component={HomeScreen} />
                    children
                )}
            </NavigationContainer>
        </UserContext.Provider>
    );
}
