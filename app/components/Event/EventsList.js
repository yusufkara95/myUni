import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from "lodash"
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon, Image } from 'react-native-elements';

export default function EventsList(props) {
    const {events, loadMoreEvents, isLoading} = props;
    const navigation = useNavigation();


    {/* Events werden geladen */}
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
    const {id, name, day, month, year, timeHour, timeMinute, votingTotal} = event.item;


    const goEvent = () => {
        navigation.navigate("eventdetail", {
            id,
            name,
        });
    }

    return (
        <TouchableOpacity onPress={goEvent}>
            <ListItem bottomDivider >
                <View style={styles.totalMember}>
                    <Icon name='body' type='ionicon' color='#FFFFFF' size={26} />
                    <Text style={{marginTop: 5, color: "#FFF", textAlign: "center"}}>{votingTotal}</Text>
                </View>
                <ListItem.Content>
                <ListItem.Title style={styles.title}>{name}</ListItem.Title>
                <View style={{flexDirection: "row"}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Icon name='calendar' type='ionicon' color='#00a2e5' size={16} />
                        <Text style={styles.date}> {day}.{month}.{year} </Text>
                        <Icon name='time' type='ionicon' color='#00a2e5' size={16} />
                        <Text style={styles.date}> {timeHour}.{timeMinute} Uhr </Text>
                </View>
                
                </View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                </View>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
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
        backgroundColor: "#F4F4F4",
        flexDirection: "row",
        margin: 10,
        padding: 10,
        borderRadius: 10
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
    },
    title: {
        fontWeight: "600",
        paddingBottom: 5
    },
    time: {
        fontSize: 16,
        color: "#00a2e5",
        fontWeight: "600"
    }, 
    date: {
        fontSize: 16,
        color: "#00a2e5",
        fontWeight: "600",
        marginRight: 10
    },
    totalMember: {
        padding: 10,
        backgroundColor: "#00a2e5",
        width: 64,
        height: 64,
        borderRadius: 12
    }
})
