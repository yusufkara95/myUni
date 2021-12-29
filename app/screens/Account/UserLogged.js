import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from "react-native-elements"
import Toast from "react-native-easy-toast"
import * as firebase from "firebase"
import Loading from "../../components/Loading"
import InfoUser from '../../components/Account/InfoUser'

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })();
    }, [])

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo} />}
        
            <Text>Account-Einstellungen</Text>
            <Button 
                title='Abmelden'
                buttonStyle={styles.buttonSignOut}
                titleStyle={styles.buttonSignOutText}
                onPress={() => firebase.auth().signOut()}
            />
            <Toast ref={toastRef} position='center' opacity={0.9} />
            <Loading text={loadingText} isVisible={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
    }, 
    buttonSignOut: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E3E3E3",
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3",
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonSignOutText: {
        color: "#00a2e5"
    }
})
