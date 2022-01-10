import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import Loading from '../../components/Loading';
import Map from "../../components/Map"

import {firebaseApp} from "../../utils/firebase"
import firebase from 'firebase/app';
import "firebase/firestore"
import { Icon, Rating} from 'react-native-elements';

import ListComments from '../../components/Refrectory/ListComments';

const db =  firebase.firestore(firebaseApp);

export default function EventDetail(props) {
    const { navigation, route } = props;
    const { id, name, idFood } = route.params;
    const [ food, setFood ] = useState(null);
    const [ rating, setRating ] = useState(0);
    const [ color, setColor ] = useState(null);
    const [ iconName, setIconName ] = useState("")

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
            <InfoFood
                name={food.name}
                description={food.description}
                rating={food.rating}
                color={food.color}
                iconName={food.iconName}
            />

            <ListComments                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                navigation={navigation}
                idFood={food.id}
            />
        </ScrollView>
    )
}

function InfoFood(props) {
    const {name, description, rating, iconName, iconColor, color} = props;

    return (
        <View>
            <View style={{height: 250, backgroundColor: color, alignItems: "center", justifyContent: "center"}}>
            <Icon name={iconName} type='font-awesome-5' color={iconColor} size={96} />

            </View>
                <View style={styles.viewContent}>
                    <Text style={styles.nameFood}>{name}</Text>
                    <Rating style={styles.rating} imageSize={20} readonly  startingValue={rating} />
                </View>
                <View>
                    <Text style={styles.descriptionFood}>{description}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    viewContent: {
        flexDirection: "row",
        padding: 20
    },
    nameFood: {
        fontSize: 18,
        fontWeight: "600"
    }, 
    descriptionFood: {
        flexDirection: "row",
        color: "grey",
        paddingLeft: 20,
        paddingRight: 20,
    },
    rating: {
        position: "absolute",
        right: 0,
        padding: 20
    }
})
