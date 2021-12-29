import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from "react-native-elements"
import { firebaseApp } from "../../utils/firebase"
import firebase from 'firebase/app'

export default function Refrectory(props) {
    const {navigation} = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        });
    })

    return (
        <View style={styles.viewBody}>
            <Text>Event</Text>

            {user && (
                <Icon 
                reverse
                type="ionicon"
                name="add"
                color="#00a2e5"
                containerStyle={styles.buttonAddContainer}
                onPress={() => navigation.navigate("add-event")}
            />
            )}

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