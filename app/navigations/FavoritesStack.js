import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Favorites from '../screens/Favorites'

const Stack = createStackNavigator();

export default function RefrectoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='favorites'
                component={Favorites}
                options={{ 
                    title: "Favoriten", 
                    headerStyle: {backgroundColor: "#00a2e5"},
                }}
            />
        </Stack.Navigator>
    )
}