import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Impressum() {
    return (
        <View style={styles.viewBody}>
            <Text style={styles.title}>Blabla</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    title: {
        fontSize: 2
    }
})


