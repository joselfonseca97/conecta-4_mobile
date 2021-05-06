import React, { Component } from 'react'
import 'react-native';
import 'react-native-gesture-handler';
import { View, Text, Button, TextInput } from 'react-native'
import style from '../Styles/Login_styles'
import md5 from 'md5'
const users = require('../Utilities/Usuarios')
import fetch from 'node-fetch' //necesario para el backend

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
        //const url = 'http://localhost:4000/api/getUsuarios' //por el momento solo en web. Se puede cambiar a la direccion de Android
        try {
            let flag = false
            let data = await users.getUsers()   //response.json(); // arreglo con los usuarios
            console.log(data)
            for (var key in data) {
                if (this.state.username.trim() === data[key].username) { // if user exists
                    flag=true        
                    if (md5(this.state.password.trim()) === data[key].password) { // if correct password 
                        const obj = {'usuario': this.state.username}
                        this.props.navigation.navigate('MenuPrincipal', obj)
                    } else {
                        alert("¡Su contraseña es incorrecta!");
                    }
                }
            }if(!flag){
                alert("This user is not registered")
            }
            
        } catch (error) {
            alert("A ocurrido un error inesperado");
        }

    }

    render() {

        return (
            
            <View style={style.mainContainer}>
                <Text style={style.logo} >Conecta_4</Text>
                <Text></Text>
                <Text></Text>
                <View style={style.inputView}>
                    <TextInput placeholder=" Ingrese su usuario"
                        style={style.inputText}
                        onChangeText={text => this.setState({ username: text })} />
                </View>

                <Text></Text>
                <Text></Text>
                <View style={style.inputView}>
                    <TextInput placeholder=" Ingrese su contraseña"
                        style={style.inputText}
                        secureTextEntry={true}
                        password={true}
                        onChangeText={text => this.setState({ password: text })} />
                </View>

                <Text></Text>

                <Button
                    style={style.loginText}
                    title="Iniciar Sesion"
                    style={style.loginBtn}
                    onPress={this.checkTextInput}
                />
                <Text></Text>

                <Button
                    title="Registrarse"
                    onPress={() => this.props.navigation.navigate('RoomConfig', {usuario: 'Webb'})}
                />

                <Text>OR</Text>

            </View>

        )

    }

}