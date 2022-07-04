import React from "react";
import { Text, View } from "react-native";
import { Card, Image } from "@rneui/themed";

export default function User(props) {
  console.log(props);

  const usuario = props.route.params.usuario;

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Card>
        <Image
          style={{ width: "100%", height: 100 }}
          resizeMode="contain"
          source={{
            uri: "https://es.seaicons.com/wp-content/uploads/2016/03/User-yellow-icon.png",
          }}
        />
        <Text h2>Nombre: {usuario.name}</Text>
        <Text h5>User Name: {usuario.username}</Text>
        <Text h5>E-mail: {usuario.email}</Text>
        <Card.Divider />
        <Text h5>
          Dirección: {usuario.address.street} {usuario.address.suite}{" "}
          {usuario.address.city}
        </Text>
        <Text h5>Código Postal: {usuario.address.zipcode}</Text>
        <Text h5>Celular: {usuario.phone}</Text>
        <Text h5>Sitio Web: {usuario.website}</Text>
        <Card.Divider />
        <Text h5>Company</Text>
        <Text h4>{usuario.company.name}</Text>
        <Text h5>{usuario.company.catchPhrase}</Text>
        <Text h5>{usuario.company.bs}</Text>
      </Card>
    </View>
  );
}
