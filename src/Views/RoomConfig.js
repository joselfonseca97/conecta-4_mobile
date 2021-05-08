import React from 'react'
import styles from '../Styles/Rooms_styles'
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { Input } from 'react-native-elements';
import { map, size } from 'lodash'
import {
    crearSalaBD,
    obtenerIdSalaBD,
    obtenerInfoUsuarioBD,
    anadirJugadorSalaBD,
    eliminarInvitacionBD,
    obtenerInvitacionesBD
} from '../Utilities/Rooms_helpers'
import ThemedListItem from 'react-native-elements/dist/list/ListItem';

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
            invitaciones: [],
            index: null /* borrar invitacion al indice selecccionado */
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
        return (creada === 1) ? true : false;
    }


    anadirJugadorSala = async () => {
        /* Crea la sala en la base de datos */
        const anadido = await anadirJugadorSalaBD(this.state.idSala, this.state.usuario);
        return (anadido === 0) ? false : true; // 0:error, 1:exito
    }


    eliminarInvitacion = async () => {
        /* Crea la sala en la base de datos */
        const eliminado = await eliminarInvitacionBD(this.state.idSala, this.state.msj, this.state.usuario);
        /* elimina invitacion local */
        if (eliminado === 1) { 
            this.eliminarInvitacionLocal();
            return true;
        }
        return false;
    }


    eliminarInvitacionLocal = () => {
        /* elimina invitacion local */
        const invTemp = this.state.invitaciones;
        if (this.state.index !== null) {
            invTemp.splice(this.state.index, 1);
            this.setState({ invitaciones: invTemp });
        }
    }

    
    obtenerIdSala = async () => {
        /* Obtener el id de la sala creada */
        const idSala = await obtenerIdSalaBD(this.state.usuario);
        return idSala;
    }


    obtenerInfoUsuario = async () => {
        const usr = this.state.usuario;
        
        /* Obtiene los datos iniciales del usuario */
        const json = await obtenerInfoUsuarioBD(usr) /* nombre y id_avatar */
        if (json === null) {
            return null
        }

        return {
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

        const idSala = await this.obtenerIdSala();
        if (idSala === -1) {
            this.cambiarEstadoSpinner('');
            this.cambiarEstadoAlerta('No se pudo conectar a la sala, intente de nuevo');
            return;
        }

        const obj = await this.obtenerInfoUsuario();
        if (obj === null) {
            this.cambiarEstadoSpinner('');
            this.cambiarEstadoAlerta('No se obtuvieron los datos del jugador')
            return
        }

        obj['idSala'] = idSala;
        this.cambiarEstadoSpinner('');
        this.props.navigation.navigate('RoomNavigator', obj);
    }


    unirseASala = async (idSala) => {
        this.cambiarEstadoSpinner('Ingresando a la sala...')

        const obj = await this.obtenerInfoUsuario();
        if (obj === null) {
            this.cambiarEstadoSpinner('');
            return
        }

        obj['idSala'] = this.state.idSala;
        const anadido = await this.anadirJugadorSala();
        if (!anadido) {
            this.cambiarEstadoSpinner('');
            this.cambiarEstadoAlerta('Hubo un problema al unirse a la sala');
            return;
        }

        /* eliminar la invitación */
        const eliminado = await this.eliminarInvitacion();
        this.cambiarEstadoSpinner('');
        if (eliminado) {
            this.props.navigation.navigate('RoomNavigator', obj);
        }
    }


    actualizarInvitaciones = async () => {
        this.cambiarEstadoSpinner('Actualizando invitaciones...')
        /* Obtiene invitaciones desde base de datos */
        const array = await obtenerInvitacionesBD(this.state.usuario);
        if (array !== null) {
            this.setState({ invitaciones: array })
        } else {
            this.cambiarEstadoAlerta('Intente de nuevo');
        }
        this.cambiarEstadoSpinner('')

    }


    render() {
        return (
            <>
                <View style={styles.container}>

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
                                            msj: object.nombreInv,
                                            idSala: parseInt(object.idSala)
                                        });
                                        this.setState({ index: index, showAlert2: true })
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
            </>
        );
    }
};