import React from 'react';
import styles from '../Styles/Rooms_styles'
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import { map, size } from 'lodash'
import { Input } from 'react-native-elements'
import { getAvatars } from '../Utilities/Avatar'
import { Avatar } from 'react-native-elements'
import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import {
    enviarInvitacionBD,
    getUsuariosConectados
} from '../Utilities/Rooms_helpers'


export default class UsersOnline extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            idRoom: this.props.idRoom,
            usuario: this.props.usuario, // Invitador
            onlineUsers: [],
            spinner: false,
            showAlert: false,
            msj: ''
        };
    }


    cambiarEstadoSpinner = (msj) => {
        this.setState({ msj: msj, spinner: !this.state.spinner });
    }


    cambiarEstadoAlerta = (msj) => {
        this.setState({ msj: msj, showAlert: !this.state.showAlert });
    }


    getAvatarImage(avatar_id) {
        const avatars = getAvatars();
        for (var i in avatars) {
            if (avatar_id === avatars[i].avatar_id) {
                return avatars[i].avatar_url;
            }
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


    enviarInvitacionAux = async (invitado, nombre) => {
        this.cambiarEstadoSpinner('Enviando invitación...');

        const usr = this.state.usuario;
        const idSala = this.state.idRoom;

        var enviada = await enviarInvitacionBD(idSala, usr, invitado) /* 0:error, 1:exito */
        this.cambiarEstadoSpinner('')

        if (enviada === 0) {
            this.cambiarEstadoAlerta('No se pudo enviar la invitación');
        } else {
            this.cambiarEstadoAlerta('Se envió la invitación a ' + nombre);
        }
    }


    render() {
        return (
            <>
                <View style={styles.viewScrollOnline}>
                    <Text style={styles.texto2}>Jugadores en línea</Text>
                    {/* Boton ver jugadores conectados */}
                    <TouchableOpacity
                        style={styles.button2}
                        onPress={async () => { this.mostrarUsuarios() }}
                    >
                        <Text style={styles.buttonText2}>Mostrar/Actualizar</Text>
                    </TouchableOpacity>

                    <ScrollView
                        horizontal
                        style={styles.scrollViewUsuariosConectados}
                    >
                        {
                            size(this.state.onlineUsers) === 0 && (
                                <Input
                                    style={styles.inputStyle}
                                    placeholder={" No tienes amigos conectados"}
                                    placeholderTextColor={'black'}
                                    leftIcon={{ type: 'font-awesome', name: 'users' }}
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
                </View>

                {/* spinner y alertas */}
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.msj}
                    textStyle={{ color: '#FFF' }}
                />
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Aviso"
                    message={this.state.msj}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={true}
                    confirmText="Ok"
                    confirmButtonColor="deepskyblue"
                    onConfirmPressed={() => { this.cambiarEstadoAlerta('') }}
                />
            </>
        );
    }
};