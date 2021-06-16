import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, Alert, Button, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Text } from 'react-native-elements';
import  firebase from '../Database/firebase'
const GeoLocationScreen = (props) => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    
    const [user, setUser] = useState([]);

    const [errorMsg, setErrorMsg] = useState(null);
// inicio deel fetch
const getLocation = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
            'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    let ubicacion = await Location.getCurrentPositionAsync({});
    setLocation({
        latitude: ubicacion.coords.latitude,
        longitude: ubicacion.coords.longitude,
        

    });
    // alert(location.coords.latitude);
    // alert(location);
}
//fin del fetch
    useEffect(() => {
        getLocation();
       
    }, []);

    const saveLocationUser = async (id) => {
        try {
        
          const users = [];
          await firebase.conexion
          .collection('usersAdmin') 
          .doc(id)
          .update({
            latitud: location.latitude,
            longitud: location.longitude,
             
          })
          .then(() => {
                console.log('user updated!');
            });
            //setUsers(users);
          } catch (e) {
            console.log(e);
          }
          
      };
    const viewUser= () =>{
        console.log(location);
    }

    const refreshLocation = async ()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    let ubicacion = await Location.getCurrentPositionAsync({});
    setLocation({
        latitude: ubicacion.coords.latitude,
        longitude: ubicacion.coords.longitude,
        nameUser: 'Cliente',

    });
    alert('localizacion refrescada');
    }
    
    return (
        <ScrollView>
            <Text h1>user: {props.route.params.name}</Text>
            <View style={styles.container}>
                <Text h1>Latitud:</Text>
                <Text style={styles.paragraph}>{location.latitude}</Text>
                <Text h1>Longitud:</Text>
                <Text style={styles.paragraph}>{location.longitude}</Text>

            </View>
            <View style={styles.buttonStyle}>
                <View>
                    <Button title="Actualizar"
                   onPress={() => refreshLocation()}
                    />
                </View>
                <View>
                    <Button title="Guardar"
                        onPress={() => saveLocationUser(props.route.params.userId)}
                    />
                </View>
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GeoLocationScreen