import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Request from "./Screens/Request";
import Response from "./Screens/Response";

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
            }}>
          <Tab.Screen name="Response" component={Response} />
          <Tab.Screen name="Request" component={Request} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
