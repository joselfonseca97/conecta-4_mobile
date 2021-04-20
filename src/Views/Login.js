import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import style from '../Styles/Login_styles'


export default class Login extends Component {

    render() {
        return (
            <View style={style.mainContainer}>
                <Text>I'm a login screen</Text>
                <Button
                    title="Go to register"
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </View>
        )
    }
}
