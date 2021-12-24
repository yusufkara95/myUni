import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'

const EventDetail = (props) => {

    const [user, setUser] = useState({
        title: '',
        description: ''
    })

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get();     
        const user = doc.data(); 
        setUser({
            ...user,
            id: doc.id,
        });
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Titel: {user.title}</Text>
                <Text>Beschreibung: {user.description}</Text>
            </View>
        </ScrollView>
    )
}

export default EventDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    }
})
