import React, { useState , useEffect} from "react";
import { Text, View, Button } from 'react-native';
import { FirebaseApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut  } from "firebase/auth";


export default function InicioSesion({navigation}){
    const [usuario, setusuario] = useState("");
    const [password, setpassword] = useState("");
    const auth = getAuth();

    
    

    //  Registrar
    function registrar (){
        createUserWithEmailAndPassword (auth, usuario, password)
        .then ((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
           alert("Registrado Exitosamente")
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Ingrese Datos")
        });
        }
        
        //SignIn   Inicio sesion
        function ingresar(){
      
            signInWithEmailAndPassword(auth, usuario, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  alert("Ingreso Correctamente :)")
                  navigation.navigate('Subir')
                  
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  alert("Datos incorrectos")
         });

        }

        
        

     //Botones
    return (
        <View style={{ flex: 1, padding:24, justifyContent: "center", alignItems: "center"}}>
            <h4>Email</h4>
            <input onChange={(e) => setusuario(e.nativeEvent.target.value)} type={Text}></input>
            <br></br>
            <h4>Contraseña</h4>
            <input onChange={(e) => setpassword(e.nativeEvent.target.value)} type={Text}></input>
            <br></br>
            <Button color = "#F79825" title="Registrar" onPress={() => registrar()}></Button>
            <br></br>
            <Button color = "#F79825" title="Iniciar Sesión" onPress={() => ingresar()}></Button>
            <br></br>
            
        </View>
        
    )

   }