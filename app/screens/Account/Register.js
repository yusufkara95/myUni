import React, { useRef } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import RegisterForm from '../../components/Account/RegisterForm'


export default function Register() {
    const toastRef = useRef();

    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/images/logo.png")}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <RegisterForm toastRef={toastRef}/>
            </View>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 250,
        marginTop: 20,
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40,
    },
})
