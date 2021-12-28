import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import TopFoods from "../screens/TopFoods"

const Stack = createStackNavigator();

export default function TopFoodsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='refrectory'
                component={TopFoods}
                options={{ title: "Die besten Speisen" }}
            />
        </Stack.Navigator>
    )
}