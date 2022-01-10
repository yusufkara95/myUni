import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from "lodash"
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon } from 'react-native-elements';



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

{/* Beim  */}
function Refrectory(props) {
    const {food, navigation} = props;
    const {id, name, rating, commentsTotal, category, color, iconName, price} = food.item;

    const goFood = () => {
        navigation.navigate("refrectorydetail", {
            id,
            name,
            rating,
            commentsTotal,
            category, 
            color,
            iconName,
            price
        });
    }

    return (
        <TouchableOpacity onPress={goFood}>
            <ListItem bottomDivider >
            <Icon reverse name={iconName} type='font-awesome-5' color={color} size={24} />
            <ListItem.Content style={{padding: 10}}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{ backgroundColor: color , padding: 6, marginRight: 10, marginTop: 2, marginBottom: 5, fontSize: 12, color: "white"}}>{category}</Text><ListItem.Title style={styles.title}>{name}</ListItem.Title>
                </View>
                <View style={{flexDirection: "row", paddingTop: 10}}>
                <View style={{flexDirection: "row", alignItems: "center", marginRight: 20}}>
                        <Icon name='star' type='ionicon' color={color} size={20} />
                        <Text style={{fontSize: 18, color: color, fontWeight: "600"}}> {rating}</Text>
                </View>

                <View style={{flexDirection: "row", alignItems: "center", marginRight: 20}}>
                        <Icon name='chatbox-ellipses' type='ionicon' color={color} size={18} />
                        <Text style={{fontSize: 18, color: color, fontWeight: "600"}}> {commentsTotal}</Text>
                </View>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Icon name='logo-euro' type='ionicon' color={color} size={18} />
                        <Text style={{fontSize: 18, color: color, fontWeight: "600"}}> {price}0 €</Text>
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
