import React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import Login from '../src/Views/Login';
import Register from '../src/Views/Register';
import MenuPrincipal from '../src/Views/MenuPrincipal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

