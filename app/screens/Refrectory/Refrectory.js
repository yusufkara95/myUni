import React, {useState, useEffect, useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from "react-native-elements"
import { firebaseApp } from "../../utils/firebase"
import firebase from 'firebase/app'
import "firebase/firestore"

import RefrectoryList from '../../components/Refrectory/RefrectoryList'
import ListComments from '../../components/Refrectory/ListComments'

const db = firebase.firestore(firebaseApp)

export default function Refrectory(props) {
    
    const {navigation} = props;
    const [user, setUser] = useState(null);
    const [foods, setFoods] = useState([]);
    const [totalFoods, setTotalFoods] = useState(0);
    const [startFoods, setStartFoods] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const limitFoods = 10;

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        });
    })
    
    useFocusEffect(
        useCallback(() => {
            db.collection("foods")
                .get()
                .then((snap) => {
                    setTotalFoods(snap.size);
            });
    
            const resultFoods = [];
    
            db.collection("foods")
                .orderBy("createAt")
                .get()
                .then((response) => {
                    setStartFoods(response.docs[response.docs.length - 1]);
    
                response.forEach((doc) => {
                    const food = doc.data();
                    food.id = doc.id;
                    resultFoods.push(food);
                });
                    setFoods(resultFoods);
                });
            }, [])
        );

    

const loadMoreFoods = () => {
    const resultFoods = [];
    foods.length < totalFoods && setIsLoading(true);

    db.collection("foods")
    .orderBy("createAt")
    .startAfter(startFoods.data().createAt)
    .get()
    .then(response => {        
        if(response.docs.length > 0) {
            setStartFoods(response.docs[response.docs.length - 1]);
        } else {
            setIsLoading(false);
        }
        
        response.forEach((doc) => {
            const food = doc.data();
            food.id = doc.id;
            resultFoods.push( food );
        });

        setFoods([...foods, ...resultFoods])
    })
}

return (
    <View style={styles.viewBody}>
        <RefrectoryList foods={foods} loadMoreFoods={loadMoreFoods} isLoading={isLoading} />
    </View>
)
        }

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#FFF"
    }, 
    buttonAddContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.1
    }
})