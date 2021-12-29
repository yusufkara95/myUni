import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import * as firebase from "firebase"
import { validateEmail } from "../../utils/validations"
import Loading from '../Loading';


export default function LoginForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState( defaultFormValue() );
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show("Beide Eingabefelder müssen ausgefüllt sein!")
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("Deine E-Mail ist nicht korrekt!")
        } else {
            setLoading(true)
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setLoading(false);
                navigation.navigate("account")
            })
            .catch(() => {
                setLoading(false)
                toastRef.current.show("E-Mail oder dein Passwort ist falsch!")
            })
        }
    }
    
    return (
        <View style={styles.formContainer}>
            <Input 
                placeholder="Hochschule-Email"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
                rightIcon={<Icon type="ionicon" name="at-outline" iconStyle={styles.iconRight} />}
            />
            <Input 
                placeholder="Passwort"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "password")}
                secureTextEntry={showPassword ? false : true}
                rightIcon={<Icon type="ionicon" name={showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.iconRight} onPress={() => setShowPassword(!showPassword)} />}
            />
            <Button 
                title="Anmelden"
                containerStyle={styles.buttonLoginContainer}
                buttonStyle={styles.buttonLogin}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Anmelden" />
        </View>
    )
}

function defaultFormValue() {
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    buttonLoginContainer: {
        marginTop: 20,
        width: "95%",
    },
    buttonLogin: {
        backgroundColor: "#00a2e5"
    }
})
