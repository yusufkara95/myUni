import React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native'

const AddEvent = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputField}>
                    <TextInput placeholder='Titel der Veranstaltung'/>
            </View>
            <View style={styles.inputField}>
                    <TextInput placeholder='Beschreibung'/>
            </View>
            <View>
                <Button title="Event hinzufügen" />
            </View>
        </ScrollView>
    )
}

export default AddEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputField: {
        flex: 1,
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC'
    }
})
