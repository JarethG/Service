import Request from "../Screens/Request";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import Messages from "../Screens/Messages";
import Profile from "../Screens/Profile";
import Community from "../Screens/Community";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import {getProfile, readMyPublicData} from "./Firebase";
import Splash from "../Screens/Splash";
import Updates from "../Components/Updates";
import ProfileContext from "./profileContext";
import {getAuth} from "firebase/auth";

const Tab = createBottomTabNavigator();


function UserStack(user) {
    const [loading, setLoading] = useState(true)
    const [updates, setUpdates] = useState(false)
    const [profile, setProfile] = useState()


    React.useEffect(() => {
        const getUserProfile = async () => {
            await getProfile(user.user.email, setProfile).then(readMyPublicData(getAuth().currentUser.uid,(r)=>setProfile((profile)=>({...profile,...r}))))

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