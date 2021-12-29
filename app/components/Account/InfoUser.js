import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from "react-native-elements"
import * as firebase from "firebase"


export default function InfoUser(props) {
    const {userInfo: {uid, photoURL, displayName, email}} = props;

    return (
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                containerStyle={styles.userInfoAvatar}
                source={photoURL ? { uri: photoURL } : require("../../../assets/images/avatar-default.jpg")}
            >
            </Avatar>
            <View>
                <Text style={styles.displayName}>Hallo,</Text>
                <Text>{email}</Text>
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
