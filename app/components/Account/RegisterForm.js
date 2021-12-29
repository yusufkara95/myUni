import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Icon, Button } from "react-native-elements"
import { validateEmail } from "../../utils/validations"
import { size, isEmpty } from "lodash"
import { findFocusedRoute } from '@react-navigation/native'
import * as firebase from "firebase"
import { useNavigation } from "@react-navigation/native"
import Loading from "../Loading"

export default function RegisterForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)) {
            toastRef.current.show("Die Eingabefelder sind leer.");
            //console.log("Die Eingabefelder sind leer.")
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("E-Mail ist nicht korrekt!");
            //console.log("E-Mail ist nicht korrekt!")
        } else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show("Die Passwörter stimmen nicht überein!");
            //console.log("Die Passwörter stimmen nicht überein!")
        } else if (size(formData.password) < 6) {
            toastRef.current.show("Dein Passwort muss größer als 6 Zeichen sein!");
            //console.log("Dein Passwort muss größer als 6 Zeichen sein!")
        } else {
            setLoading(true);
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setLoading(false);
                navigation.navigate("account");
            })
            .catch((err) => {
                setLoading(false);
                toastRef.current.show("Diese E-Mail wird schon verwendet!");
            })

        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    return (
        <View>
            <Input
                placeholder="Hochschule-Email"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
                rightIcon={<Icon type="ionicon" name="at-outline" iconStyle={styles.iconRight} />}
            />
            <Input
                placeholder="Passwort"
                secureTextEntry={showPassword ? false : true }
                onChange={(e) => onChange(e, "password")}
                containerStyle={styles.inputForm}
                rightIcon={<Icon type="ionicon" name={showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.iconRight} onPress={() => setShowPassword(!showPassword)} />}
            />
            <Input
                placeholder="Passwort wiederholen"
                secureTextEntry={showRepeatPassword ? false : true }
                onChange={(e) => onChange(e, "repeatPassword")}
                containerStyle={styles.inputForm}
                rightIcon={<Icon type="ionicon" name={showRepeatPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.iconRight} onPress={() => setShowRepeatPassword(!showRepeatPassword)} />}
            />
            <Button 
                title="Registrieren"
                containerStyle={styles.buttonRegisterContainer}
                buttonStyle={styles.buttonRegister}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Account wird erstellt..." />
        </View>
    )
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
    }
}


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    }, 
    buttonRegisterContainer: {
        marginTop: 20,
        width: "95%",
    },
    buttonRegister: {
        backgroundColor: "#00a2e5"
    },
    iconRight: {
        color: "#C1C1C1",
    }
})