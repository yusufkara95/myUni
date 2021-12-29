import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from "react-native-elements"


export default function InfoUser(props) {
    const {userInfo: {photoURL, displayName, email}} = props;

    console.log(photoURL)
    console.log(displayName)
    console.log(email)

    return (
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                showAccessory
                containerStyle={styles.userInfoAvatar}
                source={photoURL ? { uri: photoURL } : require("../../../assets/images/avatar-default.jpg")}
            />
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : "Anonym"}</Text>
                <Text>yusufkara@hrw.de</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center", 
        flexDirection: "row",
        backgroundColor: "#F2F2F2",
        paddingTop: 30,
        paddingBottom: 30,  
    },
    userInfoAvatar: {
        marginRight: 20,
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5,
    }
})
