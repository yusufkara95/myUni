import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Refrectory from '../screens/Refrectory/Refrectory'
import RefrectoryDetail from '../screens/Refrectory/RefrectoryDetail';
import AddComment from '../screens/Refrectory/AddComment';

const Stack = createStackNavigator();

export default function RefrectoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='refrectory'
                component={Refrectory}
                options={{ title: "Mensa" }}
            />
            <Stack.Screen 
                name="refrectorydetail" 
                component={RefrectoryDetail} 
            />
            <Stack.Screen 
                name="add-comment" 
                component={AddComment} 
                options={{ title: "Bewertung hinzufügen" }}
            />
            
            </Stack.Navigator>
    )
}