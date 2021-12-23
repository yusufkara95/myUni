import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/SignOutScreen';
import EventScreen from './screens/EventScreen';
import RefrectoryScreen from './screens/RefrectoryScreen';
import SignOutScreen from './screens/SignOutScreen'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

 
    if(isSignedIn == false) {
      return (
        <NavigationContainer>
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-home'
                    : 'ios-home-outline';
                } else if (route.name === 'Events') {
                  iconName = focused ? 'ios-calendar' : 'ios-calendar-outline'
                } else if (route.name === 'Refrectory') {
                  iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
                } else if (route.name === 'SignOut') {
                  iconName = focused ? 'ios-log-out' : 'ios-log-out-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Events" component={EventScreen} />
            <Tab.Screen name="Refrectory" component={RefrectoryScreen} />
            <Tab.Screen name="SignOut" component={SignOutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )
    } else {
        return (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }}name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }
};
