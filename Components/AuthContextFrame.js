import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import {LinearGradient} from 'expo-linear-gradient';
import {styles} from "../Styles";
import * as users from '../JSONS/users.json'
import {useContext, useState} from "react";
import Splash from "../Screens/Splash";
import logins from "../JSONS/logins.json"


import {sendMessage} from "../Firebase";

const UserContext = React.createContext({
    user : null,
    setUser: () =>{}
});

export default UserContext

function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message,setMessage] = useState('')
    const {user,setUser} = useContext(UserContext)

    function signIn(data) {
        let token
        logins.map((x)=>{
        if(data.username == x.username ){
            token=x["user token"]
        }})

        if(!token)return

        let retrieved = users[token]
        setUser(retrieved)
        SecureStore.setItemAsync('userToken', token).then()
    }

    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={[styles.container, {height:"100%",alignItems:"center",justifyContent:"center"}]}
        >
            <View style={styles.transparentContainer}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            </View>
            <View style={styles.transparentContainer}>
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            </View>
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
            <View style={styles.transparentContainer}>
            <TextInput
                placeholder="message"
                value={message}
                onChangeText={setMessage}
            />
            </View>
            <Button title={"send"} onPress={()=>{sendMessage("test1", message).then(r => console.log("message sent |>" + r))}}/>
        </LinearGradient>
    );
}

const Stack = createStackNavigator();

 export function AuthContextFrame({ children }) {


     const [isLoading,setIsLoading] = useState(true)
     const [user,setUser] = useState()
     const value = {user,setUser}


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

            userToken?(console.log("token was found and is" + userToken)) : console.log("token does not exist")
            setUser(users[userToken])

            setInterval(()=>{
                setIsLoading(false)
            },500)


            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
        };
        bootstrapAsync();
    }, []);



    return (
        <UserContext.Provider value={value}>
            <NavigationContainer>
                    {isLoading ? (
                        // We haven't finished checking for the token yet
                        <Splash/>
                    ) : user==null ? (
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
