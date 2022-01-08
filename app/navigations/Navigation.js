import React from 'react'
import { Icon } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RefrectoryStack from './RefrectoryStack'
import AccountStack from './AccountStack'
import EventStack from './EventStack'




const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='Events'
                screenOptions={({route}) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    inactiveTintColor: "#FFFFFF",
                    activeTintColor: "white",
                })}
            >
                <Tab.Screen 
                    name="Events" 
                    component={EventStack}
                    options={{ title: "Events", headerShown: false }}
                />
                <Tab.Screen 
                    name="Refrectory" 
                    component={RefrectoryStack}
                    options={{ title: "Mensa", headerShown: false }}
                />
                <Tab.Screen 
                    name="Account" 
                    component={AccountStack}
                    options={{ title: "Konto", headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "Refrectory": 
            iconName = "fast-food"
            break;
        case "Events": 
            iconName = "calendar"
            break;
        case "Account": 
            iconName = "person-circle"
            break;
        case "Search":
            iconName = "search"
            break;
        case "Impressum":
            iconName = "information-circle"
            break;
        default:
            break;
    }
    return (
        <Icon type="ionicon" name={iconName} size={28} color={color} />
    )
}