import 'react-native-gesture-handler';
import React from 'react'
import {View,StyleSheet,Text,Button} from 'react-native'
import style from '../Styles/Login_styles'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function Login({navigation}){
    return(
        <View style={style.mainContainer}>
            <Text>I'm a login screen</Text>
            <Button
            title= "Go to register"
            onPress={()=>navigation.navigate('Register')}
            />
        </View>
    )   
}
