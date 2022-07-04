import React, { useState } from "react";
import { Text, View, Button } from 'react-native';
import { FirebaseApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default function InicioSesion(){
    const [usuario, setusuario] = useState("");
    const [password, setpassword] = useState("");
    const auth = getAuth();
    function registrar (){
        createUserWithEmailAndPassword (auth, usuario, password)
        .then ((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
        })
        .cath((error)=>{
            console.log(error)
        });
        }

    
    return (
        <View style={{ flex: 1, padding:24 }}>
            <input onChange={(e) => setusuario(e.nativeEvent.target.value)} type={Text}></input>
            <input onChange={(e) => setpassword(e.nativeEvent.target.value)} type={Text}></input>
            <Button title="Presioname" onPress={() => registrar()}></Button>
        </View>
    )

   }