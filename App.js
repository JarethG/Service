import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Request from "./Screens/Request";
import Response from "./Screens/Response"
import Community from "./Screens/Community";
import Profile from "./Screens/Profile";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {AuthContextFrame} from "./Components/AuthContextFrame";

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {

    return (
        <AuthContextFrame>
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
        </AuthContextFrame>

    );
}