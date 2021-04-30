import React, { Component } from 'react'
import { TextInput, Text, Button, View, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

import {
    crearSalaBD,
    obtenerIdSala,
    obtenerInfoUsuario
} from '../Utilities/Rooms_helpers'

export default class login_borrar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usuario: null,
            spinner: false
        }
    }

    onChangeNameInput = event => this.setState({ usuario: event })

    crearSala = async () => {
        this.setState({ spinner: true })
        const usr = this.state.usuario;
        console.log('usuario: ' + usr)

        /* creación de la sala */
        var creada = await crearSalaBD(usr) /* 0:error, 1:exito */
        if (creada === 0) {
            this.setState({ spinner: false })
            Alert.alert('No se pudo crear la sala')
            return
        }

        var idSala = await obtenerIdSala(usr);
        if (idSala === -1) {
            this.setState({ spinner: false })
            Alert.alert('Ocurrió un error al tratar de obtener la sala')
            return
        }

        const json = await obtenerInfoUsuario(usr) /* nombre y id_avatar */

        if (json.hasOwnProperty('error')) {
            this.setState({ spinner: false })
            Alert.alert('No se obtuvieron los datos del jugador')
            return
        }
        console.log('-----------------------');
        console.log('idSala: ' + idSala)
        console.log('creada: ' + creada)
        console.log(json)
        console.log('-----------------------');

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
            <View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Cargando...'}
                    textStyle={{ color: '#FFF' }}
                />
                <Text>Your username</Text>
                <TextInput
                    name="username"
                    placeholder="usuario"
                    onChangeText={this.onChangeNameInput}
                />
                <Button
                    title="Go"
                    onPress={async () => { this.crearSala() }}
                />
            </View>
        )
    }
}
