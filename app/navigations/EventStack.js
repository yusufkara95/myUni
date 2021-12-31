import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Event from '../screens/Event/Event'
import AddEvent from '../screens/Event/AddEvent';
import EventDetail from '../screens/Event/EventDetail';

const Stack = createStackNavigator();

export default function EventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='event'
                component={Event}
                options={{ title: "Events" }}
            />
            <Stack.Screen
                name='add-event'
                component={AddEvent}
                options={{ title: "Event hinzufügen" }}
            />
            <Stack.Screen
                name="event-detail"
                component={EventDetail}
            />
        </Stack.Navigator>
    )
}