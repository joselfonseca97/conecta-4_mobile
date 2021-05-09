import React, { Component } from 'react'
import 'react-native';
import 'react-native-gesture-handler';
import { View, Text, Button, TextInput } from 'react-native'
import style from '../Styles/Login_styles'
import md5 from 'md5'
import { TouchableHighlight } from 'react-native-gesture-handler';
const users = require('../Utilities/Usuarios')

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    checkTextInput = () => {
        //Check the TextInput
        if (!this.state.username.trim()) {
            alert('Porfavor Ingresar Usuario');
            return;
        }
        //Check the TextInput
        if (!this.state.password.trim()) {
            alert('Porfavor Ingresar Contraseña');
            return;
        }
        //Checked Successfully
        //Do whatever you want
        this.logIn();
    }

    logIn = async () => {
        try {
            let flag = false
            let data = await users.getUsers()   //response.json(); // arreglo con los usuarios
            for (var key in data) {
                if (this.state.username.trim() === data[key].username) { // if user exists
                    flag = true
                    if (md5(this.state.password.trim()) === data[key].password) { // if correct password 
                        const obj = { 'usuario': this.state.username }
                        if (users.setOnlinePlayer(this.state.username)) {
                            this.props.navigation.navigate('MenuPrincipal', obj)
                        }
                    } else {
                        alert("¡Su contraseña es incorrecta!");
                    }
                }
            } if (!flag) {
                alert("This user is not registered")
            }

        } catch (error) {
            alert("A ocurrido un error inesperado");
        }

    }

    render() {

        return (

            <View style={style.mainContainer}>
                <Text style={style.logo} >Conecta 4!</Text>
                <View style={style.secondaryContainer}>
                    <View>
                        <View style={style.inputView}>
                            <TextInput placeholder=" Ingrese su usuario"
                                style={style.inputText}
                                onChangeText={text => this.setState({ username: text })} />
                        </View>
                        <View style={style.inputView}>
                            <TextInput placeholder=" Ingrese su contraseña"
                                style={style.inputText}
                                secureTextEntry={true}
                                password={true}
                                onChangeText={text => this.setState({ password: text })} />
                        </View>
                    </View>
                    <View>
                        <View style={style.loginBtn}>
                            <Button
                                title="Iniciar Sesion"
                                onPress={this.checkTextInput}
                            />
                        </View>

                        <View style={style.loginBtn}>
                            <Button
                                title="Registrarse"
                                onPress={() => this.props.navigation.navigate('Register')}
                            />
                        </View>
                    </View>
                </View>
            </View>

        )

    }

}