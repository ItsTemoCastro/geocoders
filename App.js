import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, StyleSheet } from 'react-native'
import {NavigationContainer,StackActions} from '@react-navigation/native'//npm install @react-navigation/native
import {createStackNavigator} from '@react-navigation/stack';//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
import {firebaseApp} from "./Database/firebase"

const Stack = createStackNavigator();

import GeoLocationScreen from './views/GeoLocationScreen'
import SelectUser from './views/SelectUser'

function MyStack() {
  return(
    <Stack.Navigator>
        <Stack.Screen name="SelectUser" component={SelectUser} options={{title: 'Seleccion de usuario'}} />
        <Stack.Screen name="GeoLocationScreen" component={GeoLocationScreen} options={{title: 'Geolocalización de usuario'}} />
    </Stack.Navigator>
  )
}

function App(){
  return (
    <NavigationContainer>
         <MyStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
   
})

export default App;

