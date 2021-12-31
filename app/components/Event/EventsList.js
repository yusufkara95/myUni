import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from "lodash"
import { useNavigation } from "@react-navigation/native";

export default function EventsList(props) {
    const {events, loadMoreEvents, isLoading} = props;
    const navigation = useNavigation();

    return (
        <View>
            {size(events) > 0 ? (
                <FlatList 
                    data={events}
                    renderItem={(event) => <Event event={event} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMoreEvents}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
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
    const {event, navigation} = props;
    const {id, name, address, description} = event.item;


    const goEvent = () => {
        navigation.navigate("eventdetail", {
            id,
            name,
        });
    }

    return (
        <TouchableOpacity onPress={goEvent}>
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

function FooterList(props) {
    const {isLoading} = props;

    if(isLoading) {
        return (
        <View style={styles.loaderEvents}>
            <ActivityIndicator size="large" /> 
        </View>
        )
    } else {
        return (
            <View style={styles.notFoundEvents}>
                <Text>Es wurden keine anderen Events gefunden!</Text>
            </View>
        )
    }
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
    },
    notFoundEvents: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    }
})
