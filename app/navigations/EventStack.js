import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Event from '../screens/Event/Event'
import AddEvent from '../screens/Event/AddEvent';

const Stack = createStackNavigator();

export default function EventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='event'
                component={Event}
                options={{ title: "Mensa" }}
            />
            <Stack.Screen
                name='add-event'
                component={AddEvent}
                options={{ title: "Event hinzufügen" }}
            />
        </Stack.Navigator>
    )
}