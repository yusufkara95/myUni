import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from "lodash"
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon, Image } from 'react-native-elements';



export default function RefrectoryList(props) {
    const {foods, loadMoreFoods, isLoading} = props;
    const navigation = useNavigation();


    return (
        <View>
            {size(foods) > 0 ? (
                <FlatList 
                    data={foods}
                    renderItem={(food) => <Refrectory food={food} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMoreFoods}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                />
            ) : (
                <View style={styles.loaderFoods}>
                    <ActivityIndicator size="large" />
                    <Text>Speisen werden geladen</Text>
                </View>
            )}
        </View>
    )
}

function Refrectory(props) {
    const {food, navigation} = props;
    const {id, name, rating, commentsTotal} = food.item;

    const goEvent = () => {
        navigation.navigate("refrectorydetail", {
            id,
            name,
            rating,
            commentsTotal
        });
    }

    return (
        <TouchableOpacity onPress={goEvent}>
            <ListItem bottomDivider >
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{name}</ListItem.Title>
                <View style={{flexDirection: "row"}}>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Icon name='star' type='ionicon' color='#00a2e5' size={16} />
                        <Text style={styles.rating}>{rating} </Text>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Icon name='chatbox-ellipses' type='ionicon' color='#00a2e5' size={16} />
                        <Text style={styles.time}>{commentsTotal}</Text>
                </View>
                </View>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
        </TouchableOpacity>
    )
}

function FooterList(props) {
    const {isLoading} = props;

    if(isLoading) {
        return (
        <View style={styles.loaderFoods}>
            <ActivityIndicator size="large" /> 
        </View>
        )
    } else {
        return (
            <View style={styles.notFoundFoods}>
                <Text>Es wurden keine anderen Events gefunden!</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    loaderFoods: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    viewFood: {
        backgroundColor: "#F4F4F4",
        flexDirection: "row",
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    viewEventIcon: {
        marginRight: 15,
    },
    eventName: {
        fontWeight: "bold",
    }, 
    eventAdress: {
        paddingTop: 2,
        color: "grey",
    }, 
    eventDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    },
    notFoundFoods: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    },
    title: {
        fontWeight: "600",
        paddingBottom: 5
    },
    rating: {
        fontSize: 16,
        color: "#00a2e5",
        fontWeight: "600",
        paddingRight: 10
    }, 
    date: {
        fontSize: 16,
        color: "#00a2e5",
        fontWeight: "600"
    },
    totalMember: {
        fontSize: 16,
        color: "#00a2e5",
        fontWeight: "600"
    }
})
