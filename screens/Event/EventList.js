import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const EventList = ({navigation}) => {

    const [events, setEvents] = useState([])
    const [accepted, setAccepted] = useState(0)
    

    useEffect(() => {
        firebase.db.collection('events').onSnapshot(querySnapshot => {
            const events = [];

            querySnapshot.docs.forEach((doc) => {
                const {title, description, accepted, declined} =  doc.data()
                events.push({
                    id: doc.id,
                    title,
                    description,
                    accepted: null,
                    declined: 0
                })
            });
            //console.log(users)
            setEvents(events)
        })
    }, [])


    return (
        <ScrollView>
            <Button style={styles.button} title='Event hinzufügen' onPress={() => navigation.navigate('AddEvent')} />
            {
                events.map(event => {
                    return (
                        <ListItem key={event.id} bottomDivider onPress={() => {
                            navigation.navigate('EventDetail', {
                                eventId: event.id
                            })
                        }}>
                            <ListItem.Chevron />
                            <Avatar source={{uri: 'https://uifaces.co/our-content/donated/vIqzOHXj.jpg',}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title style={styles.titleBold}>{event.title}</ListItem.Title>
                                <ListItem.Subtitle>{event.description}</ListItem.Subtitle>
                                <ListItem.Subtitle>{event.accepted}-{event.declined}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default EventList

const styles = StyleSheet.create({
    titleBold: {
        fontFamily: 'raleway-bold',
        fontSize: 16
    }
})
