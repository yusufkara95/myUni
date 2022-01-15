import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Event from '../screens/Event/Event'
import AddEvent from '../screens/Event/AddEvent';
import EventDetail from '../screens/Event/EventDetail';
import AddVotingEvent from '../screens/Event/AddVotingEvent';

const Stack = createStackNavigator();

export default function EventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='event'
                component={Event}
                options={{ title: "Events", headerStyle: {backgroundColor: "#00a2e5"} }}
            />
            <Stack.Screen
                name='add-event'
                component={AddEvent}
                options={{ title: "Event hinzufügen", headerStyle: {backgroundColor: "#00a2e5"} }}
            />
            <Stack.Screen name="eventdetail" component={EventDetail} options={{ title: "Event hinzufügen", headerStyle: {backgroundColor: "#00a2e5"} }} />
            <Stack.Screen 
                name="add-voting-event" 
                component={AddVotingEvent}
                options={{ title: "Event abstimmen", headerStyle: {backgroundColor: "#00a2e5"}  }}
            />
        </Stack.Navigator>
    )
}