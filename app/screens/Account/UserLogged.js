import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from "react-native-elements"
import * as firebase from "firebase"
import Loading from "../../components/Loading"
import InfoUser from '../../components/Account/InfoUser'
import { useNavigation } from '@react-navigation/native';



export default function UserLogged() {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })();
    }, [])

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo} />}
            
            <Button 
                title='Abmelden'
                buttonStyle={styles.buttonSignOut}
                titleStyle={styles.buttonSignOutText}
                onPress={() => firebase.auth().signOut()}
            />
            <Button 
                title='Impressum'
                buttonStyle={styles.buttonSignOut}
                titleStyle={styles.buttonSignOutText}
                onPress={() => navigation.navigate("impressum")}
            />
            <View style={styles.meme}>
                    <Icon
                        name='bug'
                        type='ionicon'
                        color='#FFF'
                    />
                <Text style={{color: "#FFF"}}>It's not a bug, it's a feature</Text>
            </View>
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
        marginTop: 10,
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
    },
    meme: {
        backgroundColor: "#00a2e5",
        padding: 20,
        marginTop: 20,
        alignItems: "center",
    }
})
