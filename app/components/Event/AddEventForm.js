import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
//import * as Location from "expo-location";
//import MapView  from "react-native-maps";
//import Modal from "../Modal";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddEventForm(props) {
    const { setIsLoading, navigation } = props;
    const [eventName, setEventName] = useState("");
    const [eventAdress, setEventAdress] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTimeHour, setEventTimeHour] = useState("");
    const [eventTimeMinute, setEventTimeMinute] = useState("");
    const [eventDay, setEventDay] = useState("");
    const [eventMonth, setEventMonth] = useState("");
    const [eventYear, setEventYear] = useState("");

    //const [isVisibleMap, setIsVisibleMap] = useState(false);
    //const [eventLocation, setEventLocation] = useState(null);

    const addEvent = () => {
        if (!eventName || !eventAdress || !eventDescription) {
            alert("Sie müssen alle Felder ausfüllen!");
            console.log("Sie müssen alle Felder ausfüllen!");
        } else {
            setIsLoading(true);
            db.collection("events")
                .add({
                    name: eventName,
                    address: eventAdress,
                    description: eventDescription,
                    votingTotal: 0,
                    timeHour: eventTimeHour,
                    timeMinute: eventTimeMinute,
                    day: eventDay,
                    month: eventMonth,
                    year: eventYear,
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid,
            })
            .then(() => {
                setIsLoading(false);
                navigation.navigate("event");
            })
            .catch(() => {
                setIsLoading(false);
                alert("Es ist ein Fehler beim Erstellen eines Events aufgetreten!");
                console.log("Es ist ein Fehler beim Erstellen eines Events aufgetreten!");
            });
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd
                setEventName={setEventName}
                setEventAdress={setEventAdress}
                setEventDescription={setEventDescription}
                setEventTimeHour={setEventTimeHour}
                setEventTimeMinute={setEventTimeMinute}
                setEventDay={setEventDay}
                setEventMonth={setEventMonth}
                setEventYear={setEventYear}
                //setIsVisibleMap={setIsVisibleMap}
                //locationEvent={locationEvent}
            />
            <Button
                title="Event erstellen"
                onPress={addEvent}
                buttonStyle={styles.buttonAddEvent}
            />
            {/*
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationEvent={setLocationEvent}
            />
            */}
        </ScrollView>
    );
    }

    function FormAdd(props) {
        const {
            setEventName,
            setEventAdress,
            setEventDescription,
            setEventTimeHour,
            setEventTimeMinute,
            setEventDay,
            setEventMonth,
            setEventYear
            //setIsVisibleMap,
            //locationEvent,
        } = props;
    
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Titel"
                containerStyle={styles.input}
                onChange={e => setEventName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Beschreibung"
                multiline={true}
                inputContainerStyle={styles.textarea}
                onChange={e => setEventDescription(e.nativeEvent.text)}
            />
            <Input
                placeholder="Adresse"
                containerStyle={styles.input}
                onChange={e => setEventAdress(e.nativeEvent.text)}
                rightIcon={{ 
                    type: "ionicon",
                    name: "map",
                    color: "#C2C2C2",
                    //onPress: () => setIsVisibleMap(true)
                }}
            />

            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                height:100
            }}>
                <View style={styles.inputWrap}>
                    <Input
                        placeholder="Stunden"
                        keyboardType = 'numeric'
                        maxLength={2}
                        onChange={(e) => setEventTimeHour(e.nativeEvent.text)}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Input
                        placeholder="Minuten"
                        keyboardType = 'numeric'
                        maxLength={2}
                        onChange={e => setEventTimeMinute(e.nativeEvent.text)}
                    />
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                height:100
            }}>

            <View style={styles.inputWrap}>
                <Input
                                placeholder="Tag"
                                keyboardType = 'numeric'
                                maxLength={2}
                                onChange={e => setEventDay(e.nativeEvent.text)}
                            />
                </View>

                <View style={styles.inputWrap}>
                <Input
                                placeholder="Monat"
                                keyboardType = 'numeric'
                                maxLength={2}
                                onChange={e => setEventMonth(e.nativeEvent.text)}
                            />
                </View>
                <View style={styles.inputWrap}>
                <Input
                                placeholder="Jahr"
                                keyboardType = 'numeric'
                                maxLength={4}
                                onChange={e => setEventYear(e.nativeEvent.text)}
                            />
                </View>
            </View>
            </View>
    )
} 


{/*
function Map(props) {
    const {isVisibleMap, setIsVisibleMap, setLocationEvent} = props;
    const [location, setLocation] = useState(null);
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                console.log("Wir brauchen die Berichtigung für dein GPS, um einen Event zu erstellen.")
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                });
            }
        })();
    }, []);

    const confirmLocation = () => {
        setLocationEvent(location);
        console.log("Standort wurde gesetzt");
        setIsVisibleMap(false);
    };

    return (
        <Modal isVisible={isVisibleMap} setIsVisibleMap={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.map}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker 
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewButtonMap}>
                    <Button 
                        title="Adresse setzen" 
                        containerStyle={styles.viewMapButtonContainerSave}
                        buttonStyle={styles.viewMapButtonSave}
                        onPress={confirmLocation}
                    />
                    <Button 
                        title="Abbrechen" 
                        containerStyle={styles.viewMapButtonContainerCancel}
                        buttonStyle={styles.viewMapButtonCancel} 
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}
*/}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%"
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10
    }, 
    textarea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    buttonAddEvent: {
        backgroundColor: "#00a2e5",
        margin: 20,
    },
    map: {
        width: "100%",
        height: 550,
    }, 
    viewButtonMap: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 10,
    }, 
    viewMapButtonContainerCancel: {
        paddingLeft: 5,
    }, 
    viewMapButtonCancel: {
        backgroundColor: "#A60D0D",
    }, 
    viewMapButtonContainerSave: {
        paddingRight: 5,
    },
    viewMapButtonSave: {
        backgroundColor: "#00a680",
    },
    inputWrap: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    
})
