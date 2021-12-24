import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/Home';
import EventList from './screens/EventList';
import EventDetail from './screens/EventDetail';
import AddEvent from './screens/AddEvent';
import RefrectoryList from './screens/RefrectoryList';
import RefrectoryDetail from './screens/RefrectoryDetail';


const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName={HomeScreen} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

function EventStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="EventList" component={EventList} options={{title: 'Events'}}/>
            <Stack.Screen name="AddEvent" component={AddEvent} />
            <Stack.Screen name="EventDetail" component={EventDetail} />
        </Stack.Navigator>
    );
}

function RefrectoryStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="RefrectoryList" component={RefrectoryList} />
            <Stack.Screen name="RefrectoryDetail" component={RefrectoryDetail} title="Event hinzufügen" />
        </Stack.Navigator>
    );
}


const Tab = createBottomTabNavigator();

export default function App() {

      return (
        <NavigationContainer>
          <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-home'
                    : 'ios-home-outline';
                } else if (route.name === 'Events') {
                  iconName = focused ? 'ios-calendar' : 'ios-calendar-outline'
                } else if (route.name === 'Events') {
                  iconName = focused ? 'ios-add-circle' : 'ios-plus-outline'
                } else if (route.name === 'Refrectory') {
                  iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
                }     
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'rgb(0, 160, 225)',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Events" component={EventStack} />
            <Tab.Screen name="Refrectory" component={RefrectoryStack} />
          </Tab.Navigator>
        </NavigationContainer>
      )
};
