import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-elements';
import Loading from '../../components/Loading';

import {firebaseApp} from "../../utils/firebase"
import firebase from 'firebase/app';
import "firebase/firestore"

const db =  firebase.firestore(firebaseApp);

export default function EventDetail(props) {
    const { navigation, route } = props;
    const { id, name } = route.params;
    const [ event, setEvent] = useState(null);
    const [ rating, setRating] = useState(0);

    navigation.setOptions({ title: name });

    useEffect(() => {
        db.collection("events")
        .doc(id)
        .get()
        .then((response) => {
            const data = response.data();
            data.id = response.id;
            setEvent(data);
            setRating(data.rating) 
        })
    }, [])

    if(!event) return <Loading isVisible={true} text="Ladet..." />

    return (
        <ScrollView vertical style={styles.viewBody}>
            <TitleEvent 
                name={event.name}
                description={event.description}
                rating={event.rating}
            />

        </ScrollView>
    )
}

function TitleEvent(props) {
    const {name, description, rating} = props;

    return (
        <View style={styles.eventTitle}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.nameEvent}>{name}</Text>
                <Rating 
                    style={styles.rating} 
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionEvent}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    titleEvent: {
        padding: 15,
    },
    nameEvent: {
        fontSize: 20,
        fontWeight: "bold"
    }, 
    descriptionEvent: {
        marginTop: 5,
        color: "grey"
    }, 
    rating: {
        position: "absolute",
        right: 0
    }
})
