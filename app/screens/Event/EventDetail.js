import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading';
import Map from "../../components/Map"

import {firebaseApp} from "../../utils/firebase"
import firebase from 'firebase/app';
import "firebase/firestore"
import { Icon } from 'react-native-elements';

import ListSubscriber from '../../components/Event/ListSubscriber';

const db =  firebase.firestore(firebaseApp);

export default function EventDetail(props) {
    const { navigation, route } = props;
    const { id, name, idEvent, acceptCount } = route.params;
    const [ event, setEvent] = useState(null);
    const [ votingTotal, setVotingTotal] = useState(0);

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
        })
    }, [])

    if(!event) return <Loading isVisible={true} text="Ladet..." />

    {/* Variablen werden für die Eventinformationen gesetzt */}
    return (
        <ScrollView vertical style={{flex: 1, backgroundColor: "#FFF"}}>
            <InfoEvent
                name={event.name}
                description={event.description}
                location={event.location}
                address={event.address}
                votingTotal={event.votingTotal}
                timeHour={event.timeHour}
                timeMinute={event.timeMinute}
                eventDay={event.day}
                eventMonth={event.month}
                eventYear={event.year}
            />
            <ListSubscriber                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                navigation={navigation}
                idEvent={event.id}
                setVotingTotal={setVotingTotal}
            />
        </ScrollView>
    )
}


{/* Vorlage für die Event-Detail-View */}
function InfoEvent(props) {
    const {name, description, location, address, votingTotal, timeHour, timeMinute, eventDay, eventMonth, eventYear} = props;

    return (
        <View>
            <View style={styles.imageView}>
            <Icon name='ios-people' type='ionicon' color='#FFF' size={64} />
            <Text style={{fontSize: 18, color: "#FFF"}}>{votingTotal} Personen nehmen teil</Text>

            </View>
        <View style={styles.eventBody}>
            <Text style={styles.nameEvent}>{name}</Text>
            <Text style={styles.descriptionEvent}>{description}</Text>

            <Map location={location} name={name} height={100} />

        <View style={{flexDirection: "row", alignItems: "center", paddingTop: 20}}>
            <Icon reverse name='calendar' type='ionicon' color='#00a2e5' size={18} />
            <Text style={styles.date}>{eventDay}.{eventMonth}.{eventYear}</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Icon reverse name='time' type='ionicon' color='#00a2e5' size={18} />
            <Text style={styles.time}>{timeHour}:{timeMinute} Uhr</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", paddingBottom: 5}}>
            <Icon reverse name='map' type='ionicon' color='#00a2e5' size={18} />
            <Text style={styles.time}>{address}</Text>
        </View>
        </View>
    
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
        backgroundColor: "#00a2e5", 
        alignItems: "center",
        justifyContent: "center"
    },
    eventBody: {
        paddingHorizontal: 20,
        paddingTop: 20
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
    },
    date: {
        fontSize: 18, 
        color: "grey"
    },
    time: {
        fontSize: 18,
        color: "grey"
    }
})
