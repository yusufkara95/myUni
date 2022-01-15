import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image} from "react-native"
import { Divider } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import LoginForm from "../../components/Account/LoginForm";

export default  function Login() {
    return (
        <KeyboardAwareScrollView>
            <View style={styles.viewContainer}>
                <Image 
                    source={require("../../../assets/images/logo.png")}
                    style={styles.logo}
                />
            
                <LoginForm />
                <CreateAccount>Account erstellen</CreateAccount>
            </View>
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
            > Registrieren
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 275,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40,
        justifyContent: "center",
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