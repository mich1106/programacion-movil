import React, { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { ListItem, Avatar, Icon } from "@rneui/themed";
import {firebaseApp} from './firebase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default function Users({ navigation: { navigate } }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const auth = getAuth();

  function login(){
    onAuthStateChanged(auth, user => {
      (user != null) ? console.log('Autenticado') : console.log('No hay nadie loggeado');;
    })
  }


  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
    login();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        // <FlatList
        //   data={data}
        //   keyExtractor={({ id }, index) => id}
        //   renderItem={({ item }) => (
        //       <Fragment>
        //           <Text>#: {item.id} {item.username}</Text>
        //           <Button onPress={() => console.log({item})}>{item.name}</Button>
        //       </Fragment>

        //   )}
        // />
        data.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => navigate("User", { usuario: l })}
          >
            {l.avatar_url ? (
              <Avatar source={{ uri: l.avatar_url }} />
            ) : (
              <Icon reverse name="accesibility" color='#ffbd59'/>
            )}
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      )}
    </View>
  );
}
