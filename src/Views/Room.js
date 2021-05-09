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
    getUsuariosEnSalaBD,
    eliminarInvitacionBD,
    crearSessionBD,
    eliminarSessionBD,
    cerrarSalaBD,
} from '../Utilities/Rooms_helpers'

export default class Rooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idRoom: this.props.idRoom,
            usuario: this.props.usuario, // obtiene el usuario desde props
            nombre: this.props.nombre,
            avatar_id: this.props.avatar_id,
            jugadoresEnSala: [],
            spinner: false,
            showAlert: false,
            showAlert2: false,
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

    actualizarJugadoresEnSala = async () => {
        this.cambiarEstadoSpinner('Actualizando jugadores en sala...')
        const jugadores = await getUsuariosEnSalaBD(this.state.idRoom, this.state.usuario);
        if (jugadores !== null) {
            this.setState({ jugadoresEnSala: jugadores })
        }
        console.log(this.state.jugadoresEnSala)
        this.cambiarEstadoSpinner('')
    }


    eliminarInvitacion = async () => {
        /* Crea la sala en la base de datos */
        const eliminado = await eliminarInvitacionBD(this.state.idRoom, this.state.usuario, this.state.msj);
        /* elimina invitacion local */
        if (eliminado === 1) {
            this.eliminarInvitacionLocal();
            return true;
        }
        return false;
    }


    crearSession = async (invitado) => {
        this.cambiarEstadoSpinner('Enviando invitación...')
        const creada = await crearSessionBD(this.state.idRoom, this.state.usuario, invitado);
        this.cambiarEstadoSpinner('')
        if (creada === 0) {
            this.cambiarEstadoAlerta('Intente nuevamente')
            return;
        }
        this.setState({ msj: invitado }) /* Guarda el nombre para eliminar sesion si le da en cancelar */
        this.setState({ showAlert2: true })
    }

    eliminarSession = async () => {
        const eliminada = await eliminarSessionBD(this.state.idRoom, this.state.usuario, this.state.msj);
        if (eliminada === 0) {
            this.cambiarEstadoAlerta('Intente de nuevo')
            return;
        }
        this.setState({ showAlert2: false })
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
                    {/* Imagen de Avatar */}
                    <Avatar
                        style={styles.imageAvatarPrincipal}
                        source={this.getAvatarImage(this.state.avatar_id)}
                    />
                    {/* Nombre del jugador */}
                    <Text style={styles.textAvatarPrincipal}>{this.state.nombre}</Text>

                    {/* Imagen Avatar de Jugador */}
                    <Image
                        style={styles.image}
                        source={require('../Assets/text.gif')}
                    />
                    {/* Código de sala */}
                    <Text style={styles.codigoSala}>Código de sala: {this.state.idRoom}</Text>

                    {/* Usuarios en sala */}
                    <View style={styles.viewScrollOnRoom}>
                        {/* <Text style={styles.texto2}>Jugadores en sala</Text> */}


                        <ScrollView
                            horizontal
                            style={styles.scrollViewUsuariosConectados}
                        >
                            {
                                size(this.state.jugadoresEnSala) === 0 && (
                                    <Input
                                        style={styles.inputStyle}
                                        placeholder={"\t\t\tInvita a tus amigos a unirse\t\t\t\t\t\t\t\t\t\t\t"}
                                        placeholderTextColor={'black'}
                                        leftIcon={{ type: 'font-awesome', name: 'users' }}
                                        editable={false}
                                    />
                                )
                            }
                            {
                                map(this.state.jugadoresEnSala, (object, index) => (
                                    <View key={index}>
                                        <Avatar
                                            style={styles.imageAvatar}
                                            source={this.getAvatarImage(object.avatar_id)}
                                            onPress={async () => { await this.crearSession(object.usuario) }}
                                        />
                                        <Text style={styles.textAvatar}>{object.nombre}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView>

                        {/* Boton actualizar jugadores en sala */}
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={async () => { this.actualizarJugadoresEnSala() }}
                        >
                            <Text style={styles.buttonText2}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botones */}
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => { this.props.navigation.navigate('Session'); }}
                    >
                        <Text style={styles.buttonText}>Crear Sesión</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => { this.cerrarSala() }} // check
                    >
                        <Text style={styles.buttonText}>Salir de sala</Text>
                    </TouchableOpacity>

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
                    onConfirmPressed={() => {
                        this.setState({ showAlert: false });
                    }}
                    onDismiss={() => { // click fuera de la alerta
                        this.setState({ showAlert: false });
                    }}
                />

                <AwesomeAlert
                    show={this.state.showAlert2}
                    showProgress={false}
                    title="Invitación enviada"
                    message="Esperando a que el jugador acepte la invitación..."
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText="Cancelar invitación"
                    cancelButtonColorButtonColor="deepskyblue"
                    onCancelPressed={async () => {
                        await this.eliminarSession(); /* elimina la sessión */
                    }}
                />
            </>
        );
    }
}