import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, Alert, Button, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import firebase from '../Database/firebase'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text } from 'react-native-elements';

function SelectUser(props) {

    const [dataUser, setDataUser] = useState({
        email: '',
        password: '',
    });
    const [getData, setGetData] = useState([])
    const [users, setUsers] = useState([]);

    const [status, setStatus] = useState(false);

    const handleChangeText = (name, value) =>{
        setDataUser({...dataUser, [name]: value});
        
    }
    
    const show = ()=>{
        getData.forEach(item =>{
            if(dataUser.email === item.mail && dataUser.password === item.phone){        
                setStatus(true);
                props.navigation.navigate('GeoLocationScreen', {
                    userId: item.id,
                    name: item.name,
                  } ) 
              } 
        })
       
        if(status == false){
            alert('datos incorrectos');
        }
    }

    const aver = ()=>{
        console.log(getData[0].name)
        console.log(getData[1].name)
    }

    
    const getUser = async () => {
        try {
          const usersData = [];
    
          await firebase.conexion
          .collection('usersAdmin') 
          .get()
          .then((querySnapshot) => {
          
          //.onSnapshop((querySnapshot) => {
            //const users =[];
                querySnapshot.forEach((doc) => {
                const {
                  name,
                  mail,
                  phone,
                } = doc.data();             
                    usersData.push({
                        id: doc.id,
                        name,
                        mail,
                        phone,
                      });
                      setGetData(usersData); 
              });
            });
            //console.log(users)  
          } catch (e) {
            alert(e);
          }   
      };
      // --- fin del login ---
      useEffect(()=>{
        getUser();
      }, [])
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text} h2>Login de usuarios</Text>
                <Input
                    placeholder='Correo'
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(value) => handleChangeText('email', value)}
                />
                <Input
                    placeholder='Contraseña'
                    leftIcon={
                        <Icon
                          name='lock'
                          size={35}
                          color='black'
                        />
                    }
                    onChangeText={(value) => handleChangeText('password', value)}
                />
                 <View>
                    <Button title="ver datos"
                    // onPress={() => login(dataUser.email)}
                    onPress={() => show()}
                    />
                </View>
                <View>
                    <Button title="login"
                    onPress={() => aver()}
                    // onPress={() => show()}
                    />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       
        
    },
    form: {
        width: 300,
        top: 50,
        height: 'auto',
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    }
});
export default SelectUser;