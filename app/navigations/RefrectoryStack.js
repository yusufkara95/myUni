import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Refrectory from '../screens/Refrectory'

const Stack = createStackNavigator();

export default function RefrectoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='refrectory'
                component={Refrectory}
                options={{ title: "Mensa" }}
            />
        </Stack.Navigator>
    )
}