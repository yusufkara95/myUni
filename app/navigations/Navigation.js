import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RefrectoryStack from './RefrectoryStack'
import FavoritesStack from './FavoritesStack'

import Search from '../screens/Search'
import TopFoodsStack from './TopFoodsStack'


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Refrectory" 
                    component={RefrectoryStack}
                    options={{ title: "Mensa", headerShown: false }}
                />
                <Tab.Screen 
                    name="favorites" 
                    component={FavoritesStack} 
                    options={{ title: "Favoriten", headerShown: false }}
                />
                <Tab.Screen 
                    name="search" 
                    component={Search}
                    options={{ title: "Suche", headerShown: false }}
                />
                <Tab.Screen 
                    name="top-foods" 
                    component={TopFoodsStack}
                    options={{ title: "TOP 5", headerShown: false }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}