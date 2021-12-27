import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native'
import { FONTS, SIZES } from '../../constants/theme';

import RefrectoryFoodReviews from './RefrectoryFoodReviews';

import firebase from '../../database/firebase'

const RefrectoryDetailScreen = (props) => {

    const scrollY = useRef(new Animated.Value(0)).current;

    const [food, setFood] = useState({
        name: '',
        description: ''
    })

    const getFoodbyId = async (id) => {
        const dbRef = firebase.db.collection('foods').doc(id)
        const doc = await dbRef.get();     
        const food = doc.data(); 
        setFood({
            ...food,
            id: doc.id,
        });
    };

    useEffect(() => {
        getFoodbyId(props.route.params.foodId);
    }, []);


    function renderFoodImage() {
        return (
            <View style={{
                alignItems: 'center',
                overflow: 'hidden'
            }}>
            {/* Animated Image with default image */}
            <Animated.Image 
                source={{uri: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}
                resizeMode="contain"
                style={{
                    height: 300,
                    width: "300%",
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [-300, 0, 300],
                                outputRange: [-300 / 2, 0, 300 * 0.75]
                            })
                        },
                        {
                            scale: scrollY.interpolate({
                                inputRange: [-300, 0, 300],
                                outputRange: [2, 1, 0.75]
                            })
                        }
                    ]
                }}
            />

            </View>
        )
    }


    function renderFoodHeaderInformation() {
        return (
            <View style={{
                flexDirection: 'row',
                height: 130, 
                width: SIZES.width,
                paddingHorizontal: 30,
                paddingVertical: 20,
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 1.5,
                    justifyContent: 'center'
                }}>
                    <Text style={{...FONTS.h2}}>{food.name}</Text>                    
                    <Text style={{
                        marginTop: 5,
                        color: '#BBBBBB',
                        ...FONTS.body4
                    }}>
                        {food.description}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={{
            backgroundColor: '#FFFFFF',
            flex: 1
        }}>
            {renderFoodImage()}
            {renderFoodHeaderInformation()}
        </ScrollView>
    )
}

export default RefrectoryDetailScreen

const styles = StyleSheet.create({})
