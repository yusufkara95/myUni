import React from 'react'
import { Icon } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RefrectoryStack from './RefrectoryStack'
import FavoritesStack from './FavoritesStack'
import TopFoodsStack from './TopFoodsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='Refrectory'
                screenOptions={({route}) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    inactiveTintColor: "#646464",
                    activeTintColor: "#00a2e5"
                })}
            >
                <Tab.Screen 
                    name="Refrectory" 
                    component={RefrectoryStack}
                    options={{ title: "Mensa", headerShown: false }}
                />
                <Tab.Screen 
                    name="Favorites" 
                    component={FavoritesStack} 
                    options={{ title: "Favoriten", headerShown: false }}
                />
                <Tab.Screen 
                    name="Search" 
                    component={SearchStack}
                    options={{ title: "Suche", headerShown: false }}
                />
                <Tab.Screen 
                    name="Top-Foods" 
                    component={TopFoodsStack}
                    options={{ title: "TOP 5", headerShown: false }}
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
        case "Favorites": 
            iconName = "heart"
            break;
        case "Search": 
            iconName = "search"
            break;
        case "Top-Foods": 
            iconName = "star"
            break;
        case "Account": 
            iconName = "person-circle"
            break;
        default:
            break;
    }
    return (
        <Icon type="ionicon" name={iconName} size={28} color={color} />
    )
}