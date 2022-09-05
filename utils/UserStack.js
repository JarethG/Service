import Request from "../Screens/Request";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import Messages from "../Screens/Messages";
import Profile from "../Screens/Profile";
import Community from "../Screens/Community";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import {getProfile} from "./Firebase";
import Splash from "../Screens/Splash";
import Updates from "../Components/Updates";
import ProfileContext from "./profileContext";
import {MyStatusBar} from "../Components/IOSProblemSolver";

const Tab = createBottomTabNavigator();


function UserStack(user) {
    const [loading, setLoading] = useState(true)
    const [updates, setUpdates] = useState(false)
    const [profile, setProfile] = useState()


    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const getUserProfile = async () => {
            //check if profile exists in storage, if not check online
            let profileDoc = await getProfile(user.user.email, setProfile)
            // console.log("profile at effect", profileDoc)
            //need to persist profile
            // profileDoc["email"] = user.user.email
            // return profileDoc

            //let them into page
        };
        getUserProfile().then(() => {
            // setProfile(r)
            setLoading(false)
        })
    }, []);


    return (
        updates ?
            Updates(() => setUpdates(false))
            :
            loading ?
                Splash("fetching profile")
                :
                <ProfileContext.Provider value={profile}>
                    <NavigationContainer>
                        <Tab.Navigator
                            screenOptions={{
                                headerShown: false,
                                tabBarActiveTintColor: "orange",
                                tabBarInactiveTintColor: "grey"
                            }}>
                            <Tab.Screen name="Notice Board" component={Request} initialParams={profile}
                                        options={{
                                            tabBarIcon: ({color}) => <FontAwesome5 name="sign" size={24} color={color}/>
                                        }}/>
                            <Tab.Screen name="Messages" component={Messages} initialParams={profile}
                                        options={{
                                            tabBarIcon: ({color}) => <Ionicons name="chatbubbles" size={24}
                                                                               color={color}/>
                                        }}/>
                            <Tab.Screen name="Community" component={Community}
                                        options={{
                                            tabBarIcon: ({color}) => <FontAwesome5 name="medal" size={24}
                                                                                   color={color}/>
                                        }}/>
                            <Tab.Screen name="Profile" component={Profile} initialParams={profile}
                                        options={{
                                            tabBarIcon: ({color}) => <Ionicons name="person-circle" size={24}
                                                                               color={color}/>
                                        }}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </ProfileContext.Provider>
    )
}

export default UserStack