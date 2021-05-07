import React from 'react'
import { Text, TextInput, View, Button, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import { Input } from 'react-native-elements'
import styles from '../Styles/Rooms_styles'
import MiniChat from './MiniChat'
import { map, size } from 'lodash'
import { getAvatars } from '../Utilities/Avatar'
import { Avatar } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';

import {
    enviarInvitacion,
    getUsuariosConectados,
    getUsuariosEnSalaBD,
    cerrarSalaBD
} from '../Utilities/Rooms_helpers'

export default class Rooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idRoom: this.props.route.params.idSala,
            usuario: this.props.route.params.usuario, // obtiene el usuario desde props
            nombre: this.props.route.params.nombre,
            avatar_id: this.props.route.params.avatar_id,
            jugadoresEnSala: [],
            onlineUsers: [],
            spinner: false,
            msj: ''
        };
    }


    cambiarEstadoSpinner = (msj) => {
        this.setState({ msj: msj, spinner: !this.state.spinner });
    }


    getAvatarImage(avatar_id) {
        const avatars = getAvatars();
        for (var i in avatars) {
            if (avatar_id === avatars[i].avatar_id) {
                return avatars[i].avatar_url;
            }
        }
    }

    enviarInvitacionAux = async (invitado, nombre) => {
        console.log('Enviando invitación')
        this.setState({ msj: 'Enviando invitación', spinner: true })

        const usr = this.state.usuario;
        const idSala = this.state.idRoom;

        var enviada = await enviarInvitacion(idSala, usr, invitado) /* 0:error, 1:exito */
        this.setState({ msj: '', spinner: false })
        if (enviada === 0) {
            Alert.alert('No se pudo enviar la invitación')
            return
        } else {
            Alert.alert('Se envió la invitación a ' + nombre)
        }
    }

    mostrarUsuarios = async () => {
        this.cambiarEstadoSpinner('Actualizando...')
        const jugadores = await getUsuariosConectados(this.state.usuario)
        if (jugadores !== null) {
            this.setState({ onlineUsers: jugadores })
        }
        this.cambiarEstadoSpinner('')
    }

    actualizarJugadoresEnSala = async () => {
        this.cambiarEstadoSpinner('Actualizando jugadores en sala...')
        const jugadores = await getUsuariosEnSalaBD(this.state.idRoom, this.state.usuario);
        if (jugadores !== null) {
            this.setState({ jugadoresEnSala: jugadores })
        }
        this.cambiarEstadoSpinner('')
    }

    cerrarSala = async () => {
        //const deleted = await cerrarSalaBD(this.state.idRoom)
        //console.log('deleted '+ deleted)
        /* if (deleted === 1) {
            this.props.navigation.navigate('MenuPrincipal');
        } else {
            console.log('No se pudo cerrar la sala')
        } */
        this.props.navigation.navigate('RoomConfig');
    }

    render() {
        return (
            <>
                <View style={styles.mainContainer}>

                    <Avatar
                        style={styles.imageAvatarPrincipal}
                        source={this.getAvatarImage(this.state.avatar_id)}
                    />
                    <Text style={styles.textAvatarPrincipal}>{this.state.nombre}</Text>

                    <Image
                        style={styles.image}
                        source={require('../Assets/text.gif')}
                    />

                    <Text style={styles.codigoSala}>Código de sala: {this.state.idRoom}</Text>

                    {/* <Text>Jugadores en línea</Text> */}
                    <ScrollView
                        horizontal
                        style={styles.scrollViewUsuariosConectados}
                    >
                        {
                            size(this.state.onlineUsers) === 0 && (
                                <Input
                                    style={styles.inputStyle}
                                    placeholder={" Actualiza la lista para buscar usuarios"}
                                    placeholderTextColor={'black'}
                                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                                    editable={false}
                                />
                            )
                        }
                        {
                            map(this.state.onlineUsers, (object, index) => (
                                <View key={index}>
                                    <Avatar
                                        style={styles.imageAvatar}
                                        source={this.getAvatarImage(object.avatar_id)}
                                        onPress={async () => { this.enviarInvitacionAux(object.username, object.name) }}
                                    />
                                    <Text style={styles.textAvatar}>{object.name}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>

                    {/* Boton ver jugadores conectados */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => { this.mostrarUsuarios() }}
                    >
                        <Text style={styles.buttonText}>Ver amigos conectados</Text>
                    </TouchableOpacity>

                    {/* Salir de sala */}
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={async () => { this.cerrarSala() }} // check
                    >
                        <Text style={styles.buttonText}>Salir de sala</Text>
                    </TouchableOpacity> */}

                    {/* Actualizar jugadores en sala */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            this.actualizarJugadoresEnSala()
                            console.log(this.state.jugadoresEnSala)
                        }}
                    >
                        <Text style={styles.buttonText}>Actualizar jugadores</Text>
                    </TouchableOpacity>

                    {/* <Button
                        onPress={() => { this.props.navigation.navigate('Session'); }}
                        title={'Config Session'}>
                    </Button> */}

                    {/* <MiniChat
                    idRoom={this.state.idRoom}
                    usuario={this.state.usuario}
                /> */}

                    {/* spinner y alertas */}
                    <Spinner
                        visible={this.state.spinner}
                        textContent={this.state.msj}
                        textStyle={{ color: '#FFF' }}
                    />
                </View>
            </>
        );
    }
}