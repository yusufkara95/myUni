import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from "react-native-elements"

import {firebaseApp} from '../../utils/firebase'
import firebase from 'firebase/app'

const db = firebase.firestore(firebaseApp);

export default function ListSubscriber(props) {
    const {navigation, idEvent, setAcceptEvent} = props;
    const [userLogged, setUserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
        console.log(user)
    })


    return (
        <View>
            {userLogged ? (
                <Button
                    title="Entscheide dich jetzt!"
                    onPress={() => 
                        navigation.navigate("add-voting-event", {
                        idEvent: idEvent, 
                        })
                }
                />
            ) : (
                <View>
                    <Text>Um teilzunehmen muss du angemeldet sein!</Text>
                    <Button title="Anmelden" onPress={() => navigation.navigate("login")} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

})