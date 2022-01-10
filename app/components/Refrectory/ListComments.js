import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { create, map } from "lodash";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { withRepeat } from "react-native-reanimated";

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
    }, [])

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
            <Text style={styles.commentAndrating}>Kommentare & Bewertungen</Text>
                {map(comments, (review, index) => (
                    <Comment key={index} review={review} />
                ))}
        </View>
    )
}

function Comment(props) {
    const { title, review, rating, createAt } = props.review;
    const createComment = new Date(createAt.seconds * 1000);

    return (
        <View style={styles.viewComment}>
            <View style={styles.viewAvatar}>
                <Avatar 
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={{uri: "../../../assets/images/avatar-default.jpg"}}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.commentTitle}>{title}</Text>
                <Text style={styles.commentText}>{review}</Text>
                <Rating imageSize={15} startingValue={rating} readonly />
                <Text style={styles.commentDate}>am {createComment.getDate()}.{createComment.getMonth()+1}.{createComment.getFullYear()} um {createComment.getHours()}:{createComment.getMinutes() < 10 ? "0" : "" }{createComment.getMinutes()} Uhr</Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    viewInfo: {
        flex: 1,
        alignItems: "flex-start",
    },
    viewComment: {
        flexDirection: "row",
        padding: 20,
        paddingBottom: 20,
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1
    }, 
    viewAvatar: {
        marginRight: 15,
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    commentText: {
        paddingTop: 2,
        marginBottom: 5
    },
    commentDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    buttonAddComment: {
        margin: 20, 
        backgroundColor: "#00a2e5"
    },
    commentAndrating: {
        backgroundColor: "#00a2e5",
        color: "#FFFFFF",
        padding: 10
    }
});