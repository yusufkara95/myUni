import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Rating } from "react-native-elements";
import { create, map } from "lodash";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListComments(props) {
    const { navigation, idFood } = props;
    const [userLogged, setUserLogged] = useState(false);
    const [comments, setComments] = useState([]);
    

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    useEffect(() => {
        db.collection("comments")
            .where("idFood", "==", idFood)
            .get()
            .then((response) => {
                const resultComments = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    resultComments.push(data)
                })
                setComments(resultComments);
            })
    }, [idFood])

 
    return (
        <View>
            {/* Abfrage, ob Nutzer angemeldet ist */}
            {userLogged ? (
                <Button 
                    title="Bewertung hinzufügen"
                    buttonStyle={{padding: 10, margin: 20, backgroundColor: "#00a2e5"}}
                    icon={{
                        type: "ionicon",
                        name: "create",
                        color: "#FFF",
                    }}
                    onPress={() =>
                        navigation.navigate("add-comment", {
                            idFood: idFood,
                        })
                    }
                />
            ) : (
                <View style={{padding: 20}}>
                    <Text>Um eine Bewertung zu schreiben, musst du angemeldet sein!</Text>
                    <Button buttonStyle={{backgroundColor: "#00a2e5"}} title="Anmelden" onPress={() => navigation.navigate("login")} />
                </View>
            )}
            {/* Kommentare der ausgewählten Speisen werden angezeigt */}
            <Text style={styles.commentAndrating}>Kommentare & Bewertungen</Text>
                {map(comments, (review, index) => (
                    <Comment key={index} review={review} />
                ))}
        </View>
    )
}

{/* Kommentarvorlage */}
function Comment(props) {
    const { title, review, rating, createAt} = props.review;
    const createComment = new Date(createAt.seconds * 1000);

    return (
            <View style={styles.viewReview}>
        <View style={styles.viewImageAvatar}>
                <Icon
                    reverse
                    name='person'
                    type='ionicon'
                    color="#00a2e5"
                />
        </View>
        <View style={styles.viewInfo}>
            <Text style={styles.reviewTitle}>{title}</Text>
            <Text style={styles.reviewText}>{review}</Text>
            <Rating imageSize={15} startingValue={rating} readonly />
            <Text style={styles.reviewDate}> am {createComment.getDate()}.{createComment.getMonth() + 1}.{createComment.getFullYear()} um {createComment.getHours()}:{createComment.getMinutes()}
            </Text>
        </View>
        </View> 
        
    )
}

const styles = StyleSheet.create({
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
    commentAndrating: {
        padding: 10,
        backgroundColor: "#00a2e5",
        color: "#FFF",
        marginBottom: 5,
        marginTop: 5
    }
});