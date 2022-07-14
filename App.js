import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Platform  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserStack from "./UserStack";
import InicioSesion from "./IniciarSesion";
import Subir from "./Subir";
import Login from "./Login";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Localizacion from './Localizacion';
import Mapa from './Mapa';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    } else {
      console.log (finalStatus);
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    alert(token);
    this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  };

export default function App() {
  const auth = getAuth();
  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Users"component={UserStack} options={{ headerShown: false }}/>
          <Tab.Screen name="Aplicación" component={UserStack} />
          <Tab.Screen name="Localizacion" component={Localizacion} />
          <Tab.Screen name="mapa" component={Mapa} />
          
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Subir" component={Subir} />
           <Tab.Screen name="Subir Imagen" component={Subir} />
          
          
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
/*
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Subir" component={Subir} />
           <Tab.Screen name="Subir Imagen" component={Subir} />
          <Tab.Screen
            name="Users"
            component={UserStack}
            options={{ headerShown: false }}
          />
           */