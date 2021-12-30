import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import {size} from "lodash"

export default function EventsList(props) {
    const {events} = props;

    return (
        <View>
            {size(events) > 0 ? (
                <FlatList 
                    data={events}
                    renderItem={(event) => <Event event={event} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <View style={styles.loaderEvents}>
                    <ActivityIndicator size="large" />
                    <Text>Events werden geladen</Text>
                </View>
            )}
        </View>
    )
}

function Event(props) {
    const {event} = props;
    const {id, images, name, address, description} = event.item;
    const goEvent = () => {
        console.log("OK")
    }

    return (
        <TouchableOpacity onPress={() => goEvent()}>
            <View style={styles.viewEvent}>
                <View style={styles.viewEventIcon}>
                    {/* Hier kommen Icons je nach Kategorie der Veranstaltung */}
                    {/* Party -> Partyhut */}
                    {/* Hochschuleveranstaltung -> Gebäude oder Info */}
                </View>
                <View>
                    <Text style={styles.eventName}>{name}</Text>
                    <Text style={styles.eventAdress}>{address}</Text>
                    {/* Gedanke generell die Beschreibung rauszunehmen, um es im EventDetail vollständig anzuzeigen */}
                    <Text style={styles.eventDescription}>{description.substr(0, 40)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loaderEvents: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    viewEvent: {
        flexDirection: "row",
        margin: 10
    },
    viewEventIcon: {
        marginRight: 15,
    },
    eventName: {
        fontWeight: "bold",
    }, 
    eventAdress: {
        paddingTop: 2,
        color: "grey",
    }, 
    eventDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    }
})
