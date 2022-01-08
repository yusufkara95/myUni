import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading';
import Map from "../../components/Map"

import {firebaseApp} from "../../utils/firebase"
import firebase from 'firebase/app';
import "firebase/firestore"
import { Button, Icon, Rating } from 'react-native-elements';

import ListSubscriber from '../../components/Event/ListSubscriber';
import { map } from 'lodash';
import ListComments from '../../components/Refrectory/ListComments';

const db =  firebase.firestore(firebaseApp);

export default function EventDetail(props) {
    const { navigation, route } = props;
    const { id, name, idFood } = route.params;
    const [ food, setFood ] = useState(null);
    const [ rating, setRating ] = useState(0);

    navigation.setOptions({ title: name });

    useEffect(() => {
        db.collection("foods")
        .doc(id)
        .get()
        .then((response) => {
            const data = response.data();
            data.id = response.id;
            setFood(data);
            setRating(data.rating)
        })
    }, [])

    if(!food) return <Loading isVisible={true} text="Ladet..." />



    return (
        <ScrollView vertical style={{flex: 1, backgroundColor: "#FFF"}}>
            <InfoEvent
                name={food.name}
                description={food.description}
                rating={food.rating}
            />

            <ListComments                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                navigation={navigation}
                idFood={food.id}
                setRating={setRating}
            />
        </ScrollView>
    )
}

function InfoEvent(props) {
    const {name, description, rating} = props;

    return (
        <View>
            <View style={styles.imageView}>
            <Text>asdasdsad</Text>
            

            </View>
                <View style={styles.viewContent}>
                    <Text style={styles.nameFood}>{name}</Text>
                    <Rating style={styles.rating} imageSize={20} readonly  startingValue={rating} />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    viewContent: {
        flexDirection: "row",
        padding: 20
    },
    imageView: {
        height: 250,
        backgroundColor: "#00a2e5", 
        alignItems: "center",
        justifyContent: "center"
    },
    nameFood: {
        fontSize: 18,
        fontWeight: "600"
    }, 
    rating: {
        position: "absolute",
        right: 0,
        padding: 20
    }
})
