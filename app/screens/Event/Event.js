import React, {useState, useEffect, useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from "react-native-elements"
import { firebaseApp } from "../../utils/firebase"
import firebase from 'firebase/app'
import "firebase/firestore"

import EventsList from '../../components/Event/EventsList'

const db = firebase.firestore(firebaseApp)

export default function Refrectory(props) {
    
    const {navigation} = props;
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [totalEvents, setTotalEvents] = useState(0);
    const [startEvents, setStartEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const limitEvents = 10;

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        });
    })
    
    useFocusEffect(
        useCallback(() => {
            db.collection("events")
                .get()
                .then((snap) => {
                    setTotalEvents(snap.size);
            });
    
            const resultEvents = [];
    
            db.collection("events")
                .orderBy("createAt")
                .limit(limitEvents)
                .get()
                .then((response) => {
                    setStartEvents(response.docs[response.docs.length - 1]);
    
                response.forEach((doc) => {
                    const event = doc.data();
                    event.id = doc.id;
                    resultEvents.push(event);
                });
                    setEvents(resultEvents);
                });
            }, [])
        );

    
{/* Wenn mehr als 10 Events gibt, werden weitere Events beim Erreichen des Endes der Liste */}
const loadMoreEvents = () => {
    const resultEvents = [];
    events.length < totalEvents && setIsLoading(true);

    db.collection("events")
    .orderBy("createAt")
    .startAfter(startEvents.data().createAt)
    .limit(limitEvents)
    .get()
    .then(response => {        
        if(response.docs.length > 0) {
            setStartEvents(response.docs[response.docs.length - 1]);
        } else {
            setIsLoading(false);
        }
        
        response.forEach((doc) => {
            const event = doc.data();
            event.id = doc.id;
            resultEvents.push( event );
        });

        setEvents([...events, ...resultEvents])
    })
}

return (
    <View style={styles.viewBody}>
        <EventsList events={events} loadMoreEvents={loadMoreEvents} isLoading={isLoading} />

        {user && (
            <Icon 
            reverse
            type="ionicon"
            name="add"
            color="#00a2e5"
            containerStyle={styles.buttonAddContainer}
            onPress={() => navigation.navigate("add-event")}
        />
        )}

    </View>
)
        }

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#FFF"
    }, 
    buttonAddContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.1
    }
})