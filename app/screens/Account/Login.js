import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image} from "react-native"
import { Divider } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-easy-toast"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import LoginForm from "../../components/Account/LoginForm";

export default  function Login() {
    const toastRef = useRef();
    return (
        <KeyboardAwareScrollView>
            <Image 
                source={require("../../../assets/images/logo.png")}
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} />
                <CreateAccount>Account erstellen</CreateAccount>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    )
}

function CreateAccount() {
        const navigation = useNavigation();
    return (
        <Text style={styles.textRegister}>
            Hast du noch kein Account?
            <Text 
                style={styles.buttonRegister}
                onPress={() => navigation.navigate("register")}
            >
                Registrieren
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 350,
        marginTop: 20,
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonRegister: {
        color: "#00a2e5",
        fontWeight: "bold",
    },
})