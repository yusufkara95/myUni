import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Account from "../screens/Account/Account"
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import Impressum from "../screens/Impressum"

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='account'
                component={Account}
                options={{ title: "Dein Konto", headerStyle: {backgroundColor: "#00a2e5"}}}
            />
            <Stack.Screen 
                name='login'
                component={Login}
                options={{ title: "Einloggen", headerStyle: {backgroundColor: "#00a2e5"} }}
            />
            <Stack.Screen 
                name='register'
                component={Register}
                options={{ title: "Registrieren", headerStyle: {backgroundColor: "#00a2e5"} }}
            />
            <Stack.Screen
                name='impressum'
                component={Impressum}
                options={{ title: "Impressum", headerStyle: {backgroundColor: "#00a2e5"}}} 
            />
        </Stack.Navigator>
    )
}