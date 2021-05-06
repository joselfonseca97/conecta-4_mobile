import React from 'react'
import styles from '../Styles/Rooms_styles'
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { Input } from 'react-native-elements';
import { map, size } from 'lodash'
import {
    crearSalaBD,
    obtenerIdSala,
    obtenerInfoUsuarioBD,
    anadirJugadorSalaBD,
    eliminarInvitacionBD,
    obtenerInvitacionesBD
} from '../Utilities/Rooms_helpers'

export default class RoomConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: this.props.route.params.usuario,
            idSala: null,  /* guardar el id de la sala por invitación */
            spinner: false,
            showAlert: false,
            showAlert2: false,
            msj: '',
            invitaciones: []
        };
    }


    cambiarEstadoSpinner = (msj) => {
        this.setState({ msj: msj, spinner: !this.state.spinner });
    }


    cambiarEstadoAlerta = (msj) => {
        this.setState({ msj: msj, showAlert: !this.state.showAlert });
    }


    crearSala = async () => {
        /* Crea la sala en la base de datos */
        var creada = await crearSalaBD(this.state.usuario);
        return (creada === 0) ? false : true; // 0:error, 1:exito
    }


    anadirJugadorSala = async () => {
        /* Crea la sala en la base de datos */
        const anadido = await anadirJugadorSalaBD(this.state.idSala, this.state.usuario);
        return (anadido === 0) ? false : true; // 0:error, 1:exito
    }


    eliminarInvitacion = async () => {
        /* Crea la sala en la base de datos */
        const eliminado = await eliminarInvitacionBD(this.state.idSala, this.state.msj, this.state.usuario);
        return (eliminado === 0) ? false : true; // 0:error, 1:exito
    }


    obtenerInfoUsuario = async () => {
        const usr = this.state.usuario;
        const idSala = await obtenerIdSala(usr); /* Obtener el id de la sala creada */

        if (idSala === -1) {
            this.cambiarEstadoAlerta('Ocurrió un error al tratar de obtener la sala')
            return null
        }

        /* Obtiene los datos iniciales del usuario */
        const json = await obtenerInfoUsuarioBD(usr) /* nombre y id_avatar */
        if (json.hasOwnProperty('error')) {
            this.cambiarEstadoAlerta('No se obtuvieron los datos del jugador')
            return null
        }

        return {
            'idSala': idSala,
            'usuario': usr,
            'nombre': json.name,
            'avatar_id': json.avatar_id
        }
    }


    /* Redirige a la vista salas */
    irASala = async () => {

        this.cambiarEstadoSpinner('Creando sala, espere...')
        const creada = await this.crearSala();
        if (!creada) {
            this.cambiarEstadoSpinner('');
            this.cambiarEstadoAlerta('No se pudo crear la sala');
            return;
        }

        const obj = await this.obtenerInfoUsuario();
        if (obj === null) {
            this.cambiarEstadoSpinner('');
            return
        }
        this.cambiarEstadoSpinner('');
        //this.props.navigation.navigate('Rooms', obj);
    }


    unirseASala = async () => {
        this.cambiarEstadoSpinner('Ingresando a la sala...')

        const obj = await this.obtenerInfoUsuario();
        if (obj === null) {
            this.cambiarEstadoSpinner('');
            return
        }

        const anadido = await this.anadirJugadorSala();
        if (!anadido) {
            this.cambiarEstadoSpinner('');
            this.cambiarEstadoAlerta('Hubo un problema al unirse a la sala');
            return;
        }

        /* eliminar la invitación */
        await this.eliminarInvitacion();

        this.cambiarEstadoSpinner('');
        //this.props.navigation.navigate('Rooms', obj);
    }

    actualizarInvitaciones = async () => {
        this.cambiarEstadoSpinner('Actualizando invitaciones...')
        /* Obtiene invitaciones desde base de datos */
        const array = await obtenerInvitacionesBD(this.state.usuario);
        this.cambiarEstadoSpinner('')
        this.setState({ invitaciones: array })
    }


    render() {
        return (
            <>
                <View style={styles.mainContainer}>

                    <Text style={styles.texto}>Configuración de sala</Text>
                    {/* Boton crear sala */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => { this.irASala() }}
                    >
                        <Text style={styles.buttonText}>Crear una sala</Text>
                    </TouchableOpacity>

                    {/* Invitaciones */}
                    <Text style={styles.texto2}>Unirte a sala por invitación</Text>

                    {/* Boton actualizar invitaciones */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => { this.actualizarInvitaciones() }}
                    >
                        <Text style={styles.buttonText}>actualizar</Text>
                    </TouchableOpacity>

                    <ScrollView
                        vertical
                        style={styles.scrollViewStyle}
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
                                    onPress={async () => {
                                        this.setState({
                                            msj: object.invitador,
                                            idSala: parseInt(object.idSala)
                                        });
                                        this.setState({ showAlert2: true })
                                    }}
                                >
                                    <Input
                                        style={styles.inputStyle}
                                        placeholder={` ${object.nombreInv} te envió una invitación!`}
                                        placeholderTextColor={'black'}
                                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

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
                        onDismiss={() => { this.cambiarEstadoAlerta('') }}
                    />

                    <AwesomeAlert
                        show={this.state.showAlert2}
                        showProgress={false}
                        title="Invitación"
                        message={`¿Aceptar invitación de ${this.state.msj}?`}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={true}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No"
                        confirmText="Sí"
                        confirmButtonColor="mediumvioletred"
                        onCancelPressed={async () => {
                            this.setState({ showAlert2: false })
                            await this.eliminarInvitacion(); /* eliminar la invitación */
                        }}
                        onConfirmPressed={() => {
                            this.setState({ showAlert2: false });
                            this.unirseASala();
                        }}
                        onDismiss={() => { // click fuera de la alerta
                            this.setState({ showAlert2: false })
                        }}
                    />

                </View>
            </>
        );
    }
};