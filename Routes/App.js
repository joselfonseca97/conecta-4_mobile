import React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import Login from '../src/Views/Login';
import Register from '../src/Views/Register';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

