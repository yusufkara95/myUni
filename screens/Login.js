import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, ImageBackground, StatusBar, Image } from 'react-native'
import { auth } from '../firebase'
import HomeStack from './Home'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation() 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate({HomeStack})
            }
        })
        return unsubscribe
    }, [])

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }


    return (
        <ScrollView 
            style={{
                flex: 1,
                backgroundColor: '#EEEEEE',
            }}
                showsVerticalScrollIndicator={false}>
                    <ImageBackground 
                        source={require('../images/background.png')}
                        style={{
                            height: 350, 
                            backgroundColor: 'rgba(0,0,0,.9)',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image source={require('../images/logo.png')} style={{
                            width: 250,
                            height: 250,
                        }}/>
                    </ImageBackground>
                    <StatusBar backgroundColor="white" barStyle="light-content"/>

            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder='Hochschul-Email' 
                        value={email} 
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput 
                        placeholder='Hochschul-Kennwort' 
                        value={password} 
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Anmelden
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 20,
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    }
})
