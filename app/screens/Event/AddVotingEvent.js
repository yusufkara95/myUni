import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from "react-native-elements"
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

    {/* Teilnahme für das Event wird hochgezählt */}
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

    {/* Aktualisierung der teilnehmenden Personen an einem Event */}
    const updateEvent = () => {
        const eventRef = db.collection("events").doc(idEvent);

        eventRef.get().then((response) => {
            const eventData = response.data();
            const votingTotal = eventData.votingTotal + 1;

            eventRef.update({
                votingTotal: votingTotal
            }).then(() => {
                setIsLoading(false);
                navigation.goBack(); 
            })
        })
    }

    return (
        <View style={styles.viewBody}>
            <Text>Bist du sicher, dass du am Event teilnehmen möchtest?</Text>
            <Button 
                title="TEILNEHMEN"
                onPress={handleButton}
                buttonStyle={styles.button}
            />
            <Loading isVisible={isLoading} text="Abschicken" />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#00a2e5"
    }
})
