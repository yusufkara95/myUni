import React, { useState, useEffect } from 'react'
import * as firebase from "firebase"
import Loading from '../../components/Loading'

import Guest from "./Guest"
import UserLogged from './UserLogged'

export default function Account() {
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            !user ? setLogin(false) : setLogin(true);
        });
    }, [])

    if(login === null) return <Loading isVisible={true} text="Bitte warten..." />;

    

    return login ? <UserLogged /> : <Guest />;



}