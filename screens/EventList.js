import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const EventList = ({navigation}) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];

            querySnapshot.docs.forEach((doc) => {
                const {title, description} =  doc.data()
                users.push({
                    id: doc.id,
                    title,
                    description
                })
            });
            //console.log(users)
            setUsers(users)
        })
    }, [])


    return (
        <ScrollView>
            <Button title='Event hinzufügen' onPress={() => navigation.navigate('AddEvent')} />
            {
                users.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => {
                            navigation.navigate('EventDetail', {
                                userId: user.id
                            })
                        }}>
                            <ListItem.Chevron />
                            <Avatar source={{uri: 'https://uifaces.co/our-content/donated/vIqzOHXj.jpg',}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title style={styles.titleBold}>{user.title}</ListItem.Title>
                                <ListItem.Subtitle>{user.description}</ListItem.Subtitle>
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
    },
})
