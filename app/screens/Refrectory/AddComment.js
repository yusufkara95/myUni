import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import Loading from "../../components/Loading";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function AddComment(props) {
    const { navigation, route } = props;
    const { idFood } = route.params;
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    {/* Hinzüfgen des Kommentares */}
    const addComment = () => {
        if (!rating) {
            alert("Keine Eingabe gefunden!");
        } else if (!title) {
            alert("Kein Titel gefunden");
        } else if (!review) {
            alert("Kein Kommentar abgegben");
        } else {
            setIsLoading(true);
            const user = firebase.auth().currentUser;
            const paylod = {
            idUser: user.uid,
            idFood: idFood,
            title: title,
            review: review,
            rating: rating,
            createAt: new Date(),
        };

        db.collection("comments")
        .add(paylod)
        .then(() => {
            updateFood()
        })
        .catch(() => {
            alert("Ein Fehler bei der Bewertung");
            setIsLoading(false);
        });
        }
    };

    const updateFood = () => {
        const foodRef = db.collection("foods").doc(idFood);

        {/* Vorbereitung der Änderung/Operation für und in der Datenbank */}
        foodRef.get().then((response) => {
            const foodData = response.data();
            const ratingTotal = foodData.ratingTotal + rating;
            const commentsTotal = foodData.commentsTotal + 1;
            const quantityRating= foodData.quantityRating + 1;
            const ratingResult = ratingTotal / quantityRating;

        foodRef
            .update({
                rating: ratingResult,
                ratingTotal,
                quantityRating,
                commentsTotal
            })
            .then(() => {
                setIsLoading(false);
                navigation.goBack();
            });
        });
    };

    return (
    <View style={styles.viewBody}>
        <View style={styles.viewRating}>
            <AirbnbRating
                count={5}
                reviews={["Miserabel", "Schlecht", "Normal", "Sehr gut", "Exzellent"]}
                defaultRating={0}
                size={35}
                onFinishRating={(value) => {
                    setRating(value);
                }}
            />
        </View>
        <View style={styles.formReview}>
            <Input
                placeholder="Titel"
                containerStyle={styles.input}
                onChange={(e) => setTitle(e.nativeEvent.text)}
            />
            <Input
                placeholder="Kommentar"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => setReview(e.nativeEvent.text)}
            />
            <Button
                title="Bewertung abschicken"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.button}
                onPress={addComment}
            />
        </View>
        <Loading isVisible={isLoading} text="Bewertung wird abgeschickt!" />
    </View>
    );
    }

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        padding:20,
    }, 
    viewRating: {
        height: 110,
        backgroundColor: "#F2F2F2",
    },
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: "#00a2e5"
    },
    textArea: {

    }
})
