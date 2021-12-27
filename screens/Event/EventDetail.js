import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Animated, SafeAreaView } from 'react-native'
import { FONTS, SIZES } from '../../constants/theme';
import firebase from '../../database/firebase'

const EventDetail = (props) => {

    const scrollY = useRef(new Animated.Value(0)).current;

    const [event, setEvent] = useState({
        title: '',
        description: ''
    })

    const getEventById = async (id) => {
        const dbRef = firebase.db.collection('events').doc(id)
        const doc = await dbRef.get();     
        const event = doc.data(); 
        setEvent({
            ...event,
            id: doc.id,
        });
    };

    useEffect(() => {
        getEventById(props.route.params.eventId);
    }, []);

    function renderEventImage() {
        return (
            <View style={{
                alignItems: 'center',
                overflow: 'hidden'
            }}>
            {/* Animated Image with default image */}
            <Animated.Image 
                source={{uri: 'https://images.pexels.com/photos/3249760/pexels-photo-3249760.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}
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

    function renderEventHeaderInformation() {
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
                    <Text style={{...FONTS.h2}}>{event.title}</Text>
                    <Text style={{
                        marginTop: 5,
                        color: '#BBBBBB',
                        ...FONTS.body4
                    }}>
                        {event.description}
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
            {renderEventImage()}
            {renderEventHeaderInformation()}
        </ScrollView>
    )
}

export default EventDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    }
})
