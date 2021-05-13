import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/Views/Login';
import Register from '../src/Views/Register';
import MenuPrincipal from '../src/Views/MenuPrincipal';
import playerVSplayer from '../src/Views/playerVSplayer';
import RoomConfig from '../src/Views/RoomConfig'
import RoomNavigator from '../src/Views/RoomNavigator';
import Session from '../src/Views/Session';
import PlayerVSpc from '../src/Views/PlayerVSpc'
import onlineGame from '../src/Views/OnlineGame'
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
          name="RoomNavigator"
          component={RoomNavigator}
        />
        <Stack.Screen
          name="Session"
          component={Session}
          options={{ title: 'Session' }}
        />
        <Stack.Screen
          name='PlayerVSpc'
          component={PlayerVSpc}
        />
        <Stack.Screen
        name='OnlineGame'
        component={onlineGame}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

