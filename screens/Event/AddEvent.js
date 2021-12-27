import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native'
import firebase from '../../database/firebase'

const AddEvent = ({navigation}) => {

    const [state, setState] = useState({
        title: '',
        description: ''
    })

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const saveNewEvent = async () => {
        if (state.name === '') {
            alert('Geben Sie ein Titel ein')
        } else {
            try {
                await firebase.db.collection('events ').add({
                    title: state.title,
                    description: state.description
                })
                navigation.navigate('EventList');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputField}>
                    <TextInput 
                        placeholder='Titel der Veranstaltung' 
                        onChangeText={(value) => handleChangeText('title', value)} />
            </View>
            <View style={styles.inputField}>
                    <TextInput 
                        placeholder='Beschreibung' 
                        onChangeText={(value) => handleChangeText('description', value)} />
            </View>
            <View>
                <Button 
                    title="Event hinzufügen"
                    onPress={() => saveNewEvent()}
                />
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
