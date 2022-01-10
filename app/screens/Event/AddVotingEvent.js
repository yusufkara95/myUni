import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Image } from "react-native-elements"
import Loading from '../../components/Loading';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

export default function AddVotingEvent(props) { 
    const { navigation, route } = props;
    const { idEvent } = route.params;
    const [ acceptEvent, setAcceptEvent] = useState(0)
    const [ isLoading, setIsLoading] = useState(false)

    function handleButton() {
        addVoting();
    }

    const addVoting = () => {
        setIsLoading(true);
        const user = firebase.auth().currentUser;
        const paylod = {
            idUser: user.uid,
            idEvent: idEvent,
            acceptEvent: acceptEvent,
        }
        db.collection("voting")
            .add(paylod)
            .then(() => {
                updateEvent();
            })
            .catch(() => {
                console.log("Ein Fehler beim Abstimmen ist aufgetreten")
                setIsLoading(false)
            })
    }

    const updateEvent = () => {
        const eventRef = db.collection("events").doc(idEvent);

        eventRef.get().then((response) => {
            const eventData = response.data();
            const votingTotal = eventData.votingTotal + 1;
            const votingAccept = eventData.votingAccept + 1;

            eventRef.update({
                votingAccept: votingAccept,
                votingTotal: votingTotal
            }).then(() => {
                setIsLoading(false);
                navigation.goBack(); 
            })
        })
    }

    return (
        <View style={styles.viewBody}>
            <View style={{alignItems: "center"}}>
                <Image
                    source={{uri: 'https://image.freepik.com/free-vector/event-calendar-notification-freelancer-project-deadline-date-appointment-reminder-calendar-megaphone-isolated-design-element-time-management-concept-illustration_335657-1693.jpg'}}
                    containerStyle={styles.item}
                />
                <Text style={{padding: 20}}>Sind Sie sicher an diesem Event teilzunehmen?</Text>
            </View>
            <View style={{width: "75%", marginTop: 10}}>
            <Button 
                title="TEILNEHMEN"
                onPress={handleButton}
            />
            </View>
            <Loading isVisible={isLoading} text="Abschicken" />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex:1,
        backgroundColor: "#FFF"
    },
    item: {
        width: 200,
        height: 200,
    }
})
