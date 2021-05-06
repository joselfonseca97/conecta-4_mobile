import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/Views/Login';
import Register from '../src/Views/Register';
import MenuPrincipal from '../src/Views/MenuPrincipal';
import playerVSplayer from '../src/Views/playerVSplayer';
import Rooms from '../src/Views/Rooms';
import Session from '../src/Views/Session';
import RoomConfig from '../src/Views/RoomConfig'

// import login_borrar from '../src/Views/login_borrar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="Login"
          component={Login}
        //options={{title: 'Ventana login'}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        //options={{title:'Ventana registro'}}
        />
        <Stack.Screen
          name="MenuPrincipal"
          component={MenuPrincipal}
        //options={{title:'Ventana Principal'}}
        />
        <Stack.Screen
          name="PlayerVSplayer"
          component={playerVSplayer}
        />
        <Stack.Screen
          name="RoomConfig"
          component={RoomConfig}
        />
        <Stack.Screen
          name="Rooms"
          component={Rooms}
          options={{ title: 'Ventana Rooms' }}
        />
        <Stack.Screen
          name="Session"
          component={Session}
          options={{ title: 'Session' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

