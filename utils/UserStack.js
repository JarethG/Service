import Request from "../Screens/Request";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import Messages from "../Screens/Messages";
import Community from "../Screens/Community";
import Profile from "../Screens/Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import {getProfile} from "./Firebase";
import {View, Text, Pressable} from "react-native";
import {styles} from "../Styles";
import Splash from "../Screens/Splash";

const Tab = createBottomTabNavigator();


function UserStack(user) {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState()


    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const getUserProfile = async () => {
            //check if profile exists in storage, if not check online
            const profileDoc = await getProfile(user.user.email)
            // console.log("profile at effect", profileDoc)
            //need to persist profile
            return profileDoc

            //let them into page
        };
        getUserProfile().then(r => {
            setProfile(r)
            setLoading(true)
        })
    }, []);


    return (
        loading ?
            Splash()
            :
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerStyle: {backgroundColor: '#2e5d37'},
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {fontWeight: 'bold'},
                        tabBarIcon: () => {

                        }
                    }}>
                    <Tab.Screen name="Profile" component={Profile} initialParams={profile}
                                options={{
                                    tabBarIcon: () => <Ionicons name="person-circle" size={24} color="gray"/>
                                }}/>
                    <Tab.Screen name="Notice Board" component={Request}
                                options={{tabBarIcon: () => <FontAwesome5 name="sign" size={24} color="gray"/>}}/>
                    <Tab.Screen name="Messages" component={Messages}
                                options={{
                                    tabBarIcon: () => <Ionicons name="chatbubbles" size={24} color="gray"/>
                                }}/>
                    <Tab.Screen name="Community" component={Community}
                                options={{tabBarIcon: () => <FontAwesome5 name="medal" size={24} color="gray"/>}}/>
                </Tab.Navigator>
            </NavigationContainer>
    )
}

export default UserStack