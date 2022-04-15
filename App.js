import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Request from "./Screens/Request";
import Response from "./Screens/Response"
import Community from "./Screens/Community";
import Profile from "./Screens/Profile";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthContext = React.createContext();



function SplashScreen() {
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Text>Signed in!</Text>
            <Button title="Sign out" onPress={signOut} />
        </View>
    );
}

function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
        </View>
    );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.userToken == null ? (
                <Stack.Navigator>
                    {state.isLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : (
                        // No token found, user isn't signed in
                        <Stack.Screen
                            name="SignIn"
                            component={SignInScreen}
                            options={{
                                title: 'Sign in',
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                            }}
                        />
                    ) }
                </Stack.Navigator>
                ) : (
                <Tab.Navigator
                            screenOptions={{
                                headerStyle: {backgroundColor: '#2e5d37'},
                                headerTintColor: '#fff',
                                headerTitleAlign: 'center',
                                headerTitleStyle: {fontWeight: 'bold'},
                                tabBarIcon: ()=> {

                                }
                            }}>
                          <Tab.Screen name="Request" component={Request} options={{ tabBarIcon:()=><FontAwesome5 name="sign" size={24} color="black"/>}}/>
                          <Tab.Screen name="Response" component={Response} options={{ tabBarIcon:()=><Ionicons name="chatbubbles" size={24} color="black" />}}/>
                          <Tab.Screen name="Community" component={Community} options={{ tabBarIcon:()=><Ionicons name="people" size={24} color="black" />}}/>
                          <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon:()=><Ionicons name="person-circle" size={24} color="black" />}}/>
                        </Tab.Navigator>
                    )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
export {AuthContext}