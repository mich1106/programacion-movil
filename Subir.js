import React, { useState } from 'react';
import {View, Button, Image  } from "react-native";
import {getStorage, ref, uploadString, listAll, getDownloadURL  } from 'firebase/storage'
import {firebaseApp} from './firebase';
import {signOut, getAuth } from "firebase/auth";

import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import { ScrollView } from 'react-native-gesture-handler';

export default function Subir({navigation}){
    const [imagen, setImagen] = useState('');
    
    const auth = getAuth();
    const storage = getStorage();
    const listRef = ref(storage, 'imagenes/');

    const Ver = () => {
        // Find all the prefixes and items.
        listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                getDownloadURL(ref(itemRef))
                .then((url) => {
                    setImagen(url);
                    console.log(imagen);
                 })
    
            });
            
        }).catch((error) => {
            console.log(error);
        });
        }




    const subirImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response;
        console.log(blob)

        const storage = getStorage();
        
        const rand = Math.random() * 5;
        const storageRef = ref(storage, `imagenes/imagen_${rand}.png`);
        uploadString(storageRef, blob.url, 'data_url').then((snapshot) => {
            console.log(snapshot)
            alert('La imagen se subio correctamente');

        });
            
    }

    const seleccionarImagen = async () =>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
        console.log(resultPermissions)
        const resultPermissionsCamera = resultPermissions.permissions.status;
        if (resultPermissionsCamera === "denied")
        {
            alert("No tienes los permisos necesarios");

        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            console.log(result);
            subirImage(result.uri);
        }
    }

 


    const cerrarSesion = () => {
        signOut(auth)
        .then(() => {
            alert('Sesión finalizada con exito');
            navigation.popToTop();
            navigation.navigate('Login');
        })
        .catch((error) => console.log(error));

        
    }

    return (
        <View style={{ flex: 1, padding:24, justifyContent: "center", alignItems: "center" }}>
             <br></br>
             <ScrollView>
            <Button color='#F79825' title="Subir Imagen" onPress={seleccionarImagen}></Button>
            <br></br>
            <Button color='#F79825' title="Ver Imagenes" onPress={() => Ver()}></Button>
            <br></br>
           
            <Image style={{width:"100%", height:100}}resizeMode="contain" source={{uri:imagen}}></Image>
            <br></br>
            <Button color='#F75B25' title="Cerrar sesion" onPress={() => cerrarSesion()}></Button>
            </ScrollView>
        </View>
    )
    
}