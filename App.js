import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Request from "./Screens/Request";
import Response from "./Screens/Response"
import Community from "./Screens/Community";
import Profile from "./Screens/Profile";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
      <NavigationContainer>
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
      </NavigationContainer>
  );
}
