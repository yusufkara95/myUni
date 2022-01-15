import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from "react-native-elements"

import {firebaseApp} from '../../utils/firebase'
import firebase from 'firebase/app'

const db = firebase.firestore(firebaseApp);

export default function ListSubscriber(props) {
    const {navigation, idEvent, setAcceptEvent} = props;
    const [userLogged, setUserLogged] = useState(false)

    {/* Abfrage ob der User eingeloggt ist um an Events teilzunehmen */}
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
        console.log(user)
    })


    return (
        <View>
            {userLogged ? (
                <Button
                    title="Jetzt teilnehmen"
                    buttonStyle={styles.buttonContainer}
                    onPress={() => 
                        navigation.navigate("add-voting-event", {
                        idEvent: idEvent, 
                        })
                }
                />
            ) : (
                <View>
                    <Text>Um teilzunehmen muss du angemeldet sein!</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#00a2e5",
        margin: 20
    }
})