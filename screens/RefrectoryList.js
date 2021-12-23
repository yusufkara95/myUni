import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const RefrectoryListScreen = ({navigation}) => {
    return (
        <View>
            <Text>Refrectory List Screen</Text>
            <Button
                title="Go to RefrectoryList"
                onPress={() => navigation.navigate('RefrectoryDetail')}
            />
        </View>
    )
}

export default RefrectoryListScreen

const styles = StyleSheet.create({})
