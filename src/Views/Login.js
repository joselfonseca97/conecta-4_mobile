import React, { Component } from 'react'
import 'react-native';
import 'react-native-gesture-handler';
import { View, Text, Button, TextInput } from 'react-native'
import style from '../Styles/Login_styles'
import md5 from 'md5'
const users = require('../Utilities/Usuarios')
import {
    crearSalaBD,
    obtenerIdSala,
    obtenerInfoUsuario
} from '../Utilities/Rooms_helpers'

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
                        //this.props.navigation.navigate('MenuPrincipal')
                        this.crearSala()
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

    crearSala = async () => {
        /* this.setState({ spinner: true }) */
        const usr = this.state.usuario;
        console.log('usuario: ' + usr)

        /* creación de la sala */
        var creada = await crearSalaBD(usr) /* 0:error, 1:exito */
        if (creada === 0) {
            /* this.setState({ spinner: false }) */
            Alert.alert('No se pudo crear la sala')
            return
        }

        var idSala = await obtenerIdSala(usr);
        if (idSala === -1) {
            /* this.setState({ spinner: false }) */
            Alert.alert('Ocurrió un error al tratar de obtener la sala')
            return
        }

        const json = await obtenerInfoUsuario(usr) /* nombre y id_avatar */

        if (json.hasOwnProperty('error')) {
            /* this.setState({ spinner: false }) */
            Alert.alert('No se obtuvieron los datos del jugador')
            return
        }

        /* redirecciona a la pantalla */
        const obj = {
            'idSala': idSala,
            'usuario': usr,
            'nombre': json.name,
            'avatar_id': json.avatar_id
        }
        this.setState({ spinner: false })
        this.props.navigation.navigate('Rooms', obj);
    }

    render() {

        return (
            
            <View style={style.mainContainer}>
                <Text style={style.logo}>Conecta_4</Text>
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
                    onPress={() => this.props.navigation.navigate('Register')}
                />

                <Text>OR</Text>

            </View>

        )

    }

}