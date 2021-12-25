import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'

import { FONTS, SIZES} from '../constants/theme'

const Home = () => {

    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: SIZES.padding,
                alignItems: 'center',
                height: 80
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        color: 'rgb(0, 160, 225)',
                        ...FONTS.h2
                    }}>
                        Hallo, Yusuf Kara
                    </Text>
                    <Text style={{
                        marginTop: 3,
                        color: '#AAAAAA',
                        ...FONTS.body3
                    }}>
                        Wie geht's dir?
                    </Text>
                </View>
                <TouchableOpacity>
                    <Avatar size={48} source={{uri: 'https://uifaces.co/our-content/donated/vIqzOHXj.jpg',}} rounded medium/>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            {renderHeader()}
        </SafeAreaView>
    ) 
}

export default Home

const styles = StyleSheet.create({

})
