import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, Button } from 'react-native'
import style from '../Styles/Register_styles'

export default function Register({ navigation }) {
    return (
        <View style={style.mainContainer}>
            <Text>I'm register screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}