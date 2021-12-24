import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from '../database/firebase'

const EventList = ({navigation}) => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        firebase.db.collection
    })

    return (
        <View>
            <Text>Event List Screen</Text>
            <Button
                title="Go to Event Detail"
                onPress={() => navigation.navigate('EventDetail')}
            />
            <Button
                title="Add Event"
                onPress={() => navigation.navigate('AddEvent')}
            />
        </View>
    )
}

export default EventList

const styles = StyleSheet.create({})
