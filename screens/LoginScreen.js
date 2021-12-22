import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import HomeScreen from './HomeScreen'

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View>
                <TextInput 
                    placeholder='Hochschul-Email' 
                    //value={} 
                    //onChangeText={text => }
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Hochschul-Kennwort' 
                    //value={} 
                    //onChangeText={text => }
                    style={styles.input}
                    secureTextEntry
                />

                
            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
