import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem } from 'react-native-elements'



const RefrectoryListScreen = ({navigation}) => {

    const [foods, setFoods] = useState([])

    useEffect(() => {
        firebase.db.collection('foods').onSnapshot(querySnapshot => {
            const foods = [];

            querySnapshot.docs.forEach((doc) => {
                const {name, description, category} =  doc.data()
                foods.push({
                    id: doc.id,
                    name,
                    description, 
                    category, 
                })
            });
            //console.log(users)
            setFoods(foods)
        })
    }, [])



    return (
        <ScrollView>
            {
                foods.map(food => {
                    return (
                        <ListItem key={food.id} bottomDivider onPress={() => {
                            navigation.navigate('RefrectoryDetail', {
                                foodId: food.id
                            })
                        }}>
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title style={styles.titleBold}>{food.name}</ListItem.Title>
                                <ListItem.Subtitle>{food.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default RefrectoryListScreen

const styles = StyleSheet.create({})
