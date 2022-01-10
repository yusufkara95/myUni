import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { map } from "lodash";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListComments(props) {
    const { navigation, idFood } = props;
    const [userLogged, setUserLogged] = useState(false);
    const [reviews, setReviews] = useState([]);
    

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    return (
        <View>
            {userLogged ? (
                <Button 
                    title="Bewertung hinzufügen"
                    buttonStyle={styles.buttonAddComment}
                    icon={{
                        type: "ionicon",
                        name: "create",
                        color: "#FFF"
                    }}
                    onPress={() =>
                        navigation.navigate("add-comment", {
                            idFood: idFood,
                        })
                    }
                />
            ) : (
                <View>
                    <Text>Um eine Bewertung zu schreiben, musst du angemeldet sein!</Text>
                    <Button title="Anmelden" onPress={() => navigation.navigate("login")} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",
    },
    btnTitleAddReview: {
        color: "#00a680",
    },
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1,
    },
    viewImageAvatar: {
        marginRight: 15,
    },
    imageAvatarUser: {
        width: 50,
        height: 50,
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start",
    },
    reviewTitle: {
        fontWeight: "bold",
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5,
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0,
    },
});