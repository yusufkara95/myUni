import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

export default function Guest() {
        const navigation = useNavigation();
    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image 
                source={require("../../../assets/images/guest.png")}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={styles.title}>Willkommen, Gast.</Text>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            </Text>
            <View style={styles.buttonView}>
                <Button 
                    title="Mein Konto"
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    onPress={() => navigation.navigate("login")}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19, 
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        textAlign: "center",
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: "#00a2e5",
    },
    buttonContainer: {
        width: "70%"
    },
    buttonView: {
        flex: 1,
        alignItems: "center",
    },
})