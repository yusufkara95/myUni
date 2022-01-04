import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading';

import {firebaseApp} from "../../utils/firebase"
import firebase from 'firebase/app';
import "firebase/firestore"
import { Button } from 'react-native-elements';

import ListSubscriber from '../../components/Event/ListSubscriber';

const db =  firebase.firestore(firebaseApp);

export default function EventDetail(props) {
    const { navigation, route } = props;
    const { id, name, idEvent, acceptCount } = route.params;
    const [ event, setEvent] = useState(null);
    const [ votingTotal, setVotingTotal] = useState(0);
    const [ votingAccept, setVotingAccept] = useState(0);

    navigation.setOptions({ title: name });

    useEffect(() => {
        db.collection("events")
        .doc(id)
        .get()
        .then((response) => {
            const data = response.data();
            data.id = response.id;
            setEvent(data);
            setVotingTotal(data.votingTotal);
            setVotingAccept(data.votingAccept);
        })
    }, [])

    if(!event) return <Loading isVisible={true} text="Ladet..." />



    return (
        <ScrollView vertical>
            <TitleEvent 
                name={event.name}
                description={event.description}
                votingTotal={event.votingTotal}
                votingAccept={event.votingAccept}
            />
            <ListSubscriber                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                navigation={navigation}
                idEvent={event.id}
                setVotingAccept={setVotingAccept}
            />
        </ScrollView>
    )
}

function TitleEvent(props) {
    const {name, description, votingTotal, votingAccept, declineEvent} = props;

    return (
        <View>
            <View style={styles.imageView}></View>
        <View style={styles.eventBody}>
            <View style={{flexDirection: "row", paddingTop: 20, paddingBottom: 20}}>
                <Text style={styles.nameEvent}>{name}</Text>
            </View>
            <Text style={styles.descriptionEvent}>{description}</Text>
        </View>
            <Text>{votingAccept} Personen nehmen teil</Text>
            <Text>Abgestimmte Personen: {votingTotal} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    eventView: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    imageView: {
        height: 250,
        //borderBottomRightRadius: 40,
        //borderBottomLeftRadius: 40,
        backgroundColor: "#00a2e5"
    },
    eventBody: {
        paddingHorizontal: 20
    },
    nameEvent: {
        fontSize: 20,
        fontWeight: "bold"
    }, 
    descriptionEvent: {
        marginTop: 5,
        color: "grey",
        paddingBottom: 20,
    }, 
    rating: {
        position: "absolute",
        right: 0
    }, 
    buttonView: {
        flexDirection: "row",
        padding: 10
    }
})
