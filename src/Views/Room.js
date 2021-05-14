import React from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Input } from 'react-native-elements'
import styles from '../Styles/Rooms_styles'
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
    getInvSesionesBD,
    getSesionActivaBD,
    salirDeSalaBD,
    borrarSalaBD,
    activarSesionBD
} from '../Utilities/Rooms_helpers'

export default class Rooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // datos generales recibidos desde props
            idRoom: this.props.idRoom,
            usuario: this.props.usuario,
            nombre: this.props.nombre,
            avatar_id: this.props.avatar_id,

            spinner: false,
            msj: '',
            showAlert: false,
            jugadoresEnSala: [],
            showAlert2: false,

            /* invitaciones a session */
            invitaciones: []
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
        for (var i in avatars)
            if (avatar_id === avatars[i].avatar_id)
                return avatars[i].avatar_url;
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


    actualizarInvitacionesSessiones = async () => {
        this.cambiarEstadoSpinner('Actualizando invitaciones...')
        // Obtiene invitaciones desde base de datos
        const array = await getInvSesionesBD(this.state.idRoom, this.state.usuario)
        this.cambiarEstadoSpinner('')
        if (array !== null) {
            this.setState({ invitaciones: array })
        } else {
            this.cambiarEstadoAlerta('Intente de nuevo');
        }
    }

    /**/
    crearSession = async (invitado) => {
        this.cambiarEstadoSpinner('Enviando invitación...')
        const creada = await crearSessionBD(this.state.idRoom, this.state.usuario, invitado);
        this.cambiarEstadoSpinner('')
        if (creada === 0) {
            this.cambiarEstadoAlerta('Intente nuevamente')
            return;
        }
        // Guarda el nombre para eliminar sesion si le da en cancelar
        this.setState({ msj: invitado, showAlert2: true })
        this.esperarAceptacion(invitado);
    }


    /**/
    esperarAceptacion = async (invitador) => {
        var counter = setInterval(async () => {
            const activa = await getSesionActivaBD(this.state.idRoom, this.state.usuario, invitador);
            console.log("jug1: " + this.state.usuario + " jug2: " + invitador + " activa: " + activa);
            if (activa === true) {
                clearInterval(counter);
                this.enviarASesion();
            } else if (!this.state.showAlert2) { // si se quita la alerta es porque cancela
                clearInterval(counter);
            }

        }, 1000);

    }


    aceptarUnirseASesion = async (invitador, estado) => {
        console.log(invitador + estado + this.state.usuario);
        /* */
        this.cambiarEstadoSpinner('Uniéndose a la sesión...');
        var estado = await activarSesionBD(estado, this.state.idRoom, invitador, this.state.usuario);
        this.cambiarEstadoSpinner('');
        console.log(estado);
        if (estado === 1) {
            this.enviarASesion();
        } else {
            this.cambiarEstadoAlerta('Intente unirse de nuevo a la sesión.');
        }
    }

    eliminarSession = async () => {
        const eliminada = await eliminarSessionBD(this.state.idRoom, this.state.usuario, this.state.msj);
        if (eliminada === 0) {
            this.cambiarEstadoAlerta('Intente de nuevo')
            return;
        }
        this.setState({ showAlert2: false })
    }


    enviarASesion = () => {
        console.log("enviar a pantalla");
        this.props.navigation.navigate('Session')
    }


    salirDeSala = async () => {
        this.cambiarEstadoSpinner("Saliendo....");
        const deleted = await salirDeSalaBD(this.state.idRoom, this.state.usuario);
        const deleted2 = await borrarSalaBD(this.state.idRoom);
        this.cambiarEstadoSpinner("");
        if (deleted === 1 && deleted2 === 1) {
            this.props.navigation.navigate('RoomConfig');
        } else {
            this.cambiarEstadoAlerta("Algo salió mal...");
        }
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
                    {/* Código de sala */}
                    <Text style={styles.codigoSala}>Código de sala: {this.state.idRoom}</Text>

                    {/* Nombre del jugador */}
                    <Text style={styles.textAvatarPrincipal}>{this.state.nombre}</Text>

                    {/* Imagen Avatar de Jugador */}
                    <Image
                        style={styles.image}
                        source={require('../Assets/text.gif')}
                    />

                    {/* Usuarios en sala */}
                    <View style={styles.viewScrollOnRoom}>
                        <Text style={styles.texto2}>Jugadores en sala</Text>

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
                                            onPress={async () => { this.crearSession(object.usuario) }}
                                        />
                                        <Text style={styles.textAvatar}>{object.nombre}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView>

                        {/* Boton actualizar jugadores en sala */}
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={this.actualizarJugadoresEnSala}
                        >
                            <Text style={styles.buttonText2}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Invitaciones sesiones */}
                    <View style={styles.viewScrollOnSession}>

                        <Text style={styles.texto2}>Sesiones</Text>

                        <ScrollView
                            vertical
                            style={styles.scrollViewStyle2}
                        >
                            {
                                size(this.state.invitaciones) == 0 && (
                                    <Input
                                        style={styles.inputStyle}
                                        placeholder={" No tienes invitaciones"}
                                        placeholderTextColor={'black'}
                                        leftIcon={{ type: 'font-awesome', name: 'minus' }}
                                        editable={false}
                                    />
                                )
                            }
                            {
                                map(this.state.invitaciones, (object, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => { this.aceptarUnirseASesion(object.usuario, 1) }}
                                    >
                                        <Input
                                            style={styles.inputStyle}
                                            placeholder={` ${object.nombre} quiere crear una sesión!`}
                                            placeholderTextColor={'black'}
                                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                                            editable={false}
                                        />
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>

                        {/* Botones */}
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => this.actualizarInvitacionesSessiones()}
                        >
                            <Text style={styles.buttonText2}>Actualizar Sesiones</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={async () => { this.salirDeSala() }} // check
                    >
                        <Text style={styles.buttonText2}>Salir de sala</Text>
                    </TouchableOpacity>

                    {/* Alerta para aceptar invitaciones a sesiones */}

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