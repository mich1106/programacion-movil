import { createStackNavigator } from "@react-navigation/stack";
import InicioSesion from "./IniciarSesion";
import Subir from "./Subir";
import Login from "./Login";
import Users from "./Users";
import User from "./User";
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Subir" component={Subir} />
      <Stack.Screen name="User" component={User} />

    </Stack.Navigator>
  );
}
