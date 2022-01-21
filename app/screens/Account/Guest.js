import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

export default function Guest() {
        const navigation = useNavigation();
    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image 
                source={require("../../../assets/images/login.png")}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={styles.title}>Willkommen, Gast.</Text>
            <Text style={styles.description}>
                Bist du Studierender der HRW oder zu Gast an der HRW und möchtest in der Mensa essen oder an den Veranstaltungen & Events teilnehmen, dann registriere dich auf der neuen App
            </Text>
            <View>
                <Button 
                    title="ZUM LOGIN"
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
        backgroundColor: "#00a2e5",
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
        padding: 20,
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: "#000",
    },
    buttonContainer: {
        width: "100%",
        color: "#00a2e5",
        padding: 20
    },
    buttonView: {
        flex: 1,
        alignItems: "center",
    },
})