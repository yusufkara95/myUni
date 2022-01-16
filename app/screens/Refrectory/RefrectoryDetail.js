import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, StyleSheet, Text, View} from 'react-native'
import Loading from '../../components/Loading';

import {firebaseApp} from "../../utils/firebase"
import firebase from 'firebase/app';
import "firebase/firestore"
import { Icon, Rating } from 'react-native-elements';
import { useFocusEffect } from "@react-navigation/native";

import ListComments from '../../components/Refrectory/ListComments';

const db =  firebase.firestore(firebaseApp);

export default function RefrectoryDetail(props) {
    const { navigation, route } = props;
    const { id, name} = route.params;
    const [ food, setFood ] = useState(null);
    const [ rating, setRating ] = useState(0);
    const [ commentsTotal, setCommentsTotal ] = useState(0);
    const [ isFavorite, setIsFavorite] = useState(false);
    const [ userLogged, setUserLogged] = useState(false);

    {/* Header Tab bekommt den Titel der Speiße von der Datenbank */}
    navigation.setOptions({ title: name });


    {/* Abfrage, ob der User eingeloggt ist */}
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    useFocusEffect(
        useCallback(() => {
        db.collection("foods")
            .doc(id)
            .get()
            .then((response) => {
                const data = response.data();
                data.id = response.id;
                setFood(data);
                setRating(data.rating);
            }); 
        }, [])
    );

    {/* Abfragen, ob der Nutzer die Speise favorisiert hat und setze den Icon TRUE und in der Farbe ROT */}
    useEffect(() => {
        if(userLogged && food) {
            db.collection("favorites")
            .where("idFood", "==", food.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                if(response.docs.length === 1) {
                    setIsFavorite(true)
                }
            })
        }
    }, [userLogged, food])

    {/* Speise in  die Favoriten hinzufügen */}
    const addFavorite = () => {
        if(!userLogged) {
            alert("Um eine Speise zu favorisieren musst du eingeloggt sein!");
        } else {
            const payload = {
                idUser: firebase.auth().currentUser.uid,
                idFood: food.id,
            }
            db.collection("favorites")
            .add(payload)
            .then(() => {
                setIsFavorite(true);
                alert("Speise wurde in die Favoriten gespeichert!")
            })
            .catch(() => {
                alert("Ein Fehler beim Favorisieren einer Speise ist aufgetreten!")
            })
        }
    }

    {/* Speise aus den Favoriten entfernen */}
    const removeFavorite = () => {
        db.collection("favorites")
            .where("idFood", "==", food.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                response.forEach((doc) => {
                    const idFavorite = doc.id;
                    db.collection("favorites")
                    .doc(idFavorite)
                    .delete()
                    .then(() => {
                        setIsFavorite(false)
                        alert("Speise wurde aus den Favoriten entfernt")
                    })
                    .catch(() => {
                        alert("Ein Fehler beim Entfernen des Favoriten ist aufgetreten!")
                    })
                })
            })
    }

    if(!food) return <Loading isVisible={true} text="Ladet..." />

    return (
        <ScrollView vertical style={{flex: 1, backgroundColor: "#FFF"}}>
            <View style={styles.viewFavorites}>
                <Icon 
                    type="ionicon" 
                    name={isFavorite ? "heart" : "heart-outline"} 
                    color={isFavorite ? "#FF0000" : "#FFF"}
                    size={32} 
                    underlayColor="transparent" 
                    onPress={isFavorite ? removeFavorite : addFavorite} 
                />
            </View>

            {/* Die Datenbank-Werte werden abgeholt und in neuen Variablen zugewiesen  */}
            <InfoRefrectory
                name={food.name}
                description={food.description}
                rating={food.rating}
                color={food.color}
                iconName={food.iconName}
                price={food.price}
            />

            <ListComments                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                navigation={navigation}
                idFood={food.id}
                setRating={setRating}
                commentsTotal={commentsTotal}
            />
        </ScrollView>
    )
}

{/* Mensa-Speisen-Vorlage */}
function InfoRefrectory(props) {
    const {name, description, rating, iconName, color, price} = props;

    return (
        <View>
            <View style={{height: 250, backgroundColor: color, alignItems: "center", justifyContent: "center"}}>
            <Icon name={iconName} type='font-awesome-5' color="#FFFFFF" size={96} />
            </View>
                <View style={styles.viewContent}>
                    <Text style={styles.nameFood}>{name}</Text>
                    <Rating style={styles.rating} imageSize={20} readonly  startingValue={rating} />
                </View>
                <View style={{flexDirection: "row", paddingTop: 15, paddingLeft: 20, paddingBottom: 0}}>
                    <Icon name='logo-euro' type='ionicon' color={color} size={18} />
                    <Text style={{fontSize: 16, color: color, fontWeight: "600"}}> {price}0 </Text>
                </View>
                <Text style={{padding: 20, color: "#AAA" }}>{description}</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    viewContent: {
        flexDirection: "row",
        paddingTop: 20,
        paddingLeft: 20
    },
    viewFavorites:{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#00a2e5",
        padding: 10,
        margin: 20,
        borderRadius: 10
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
