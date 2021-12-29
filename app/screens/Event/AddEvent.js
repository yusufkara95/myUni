import React, {useState} from 'react'
import { Text, View } from 'react-native'
import Loading from "../../components/Loading"
import AddEventForm from '../../components/Event/AddEventForm';

export default function AddEvent(props) {
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false);
    console.log(props)

    return (
        <View>
            <AddEventForm setIsLoading={setIsLoading} navigation={navigation} />
            <Loading isVisible={isLoading}  text="Event erstellen" />
        </View>
    )
}

