import React from 'react';
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from './app/utils/firebase';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
      return <Navigation />
}