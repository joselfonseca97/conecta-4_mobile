import React from 'react'
import { Text, TextInput, View, Button, TouchableHighlight, ScrollView, Alert, Image } from 'react-native'
import styles from '../Styles/Rooms_styles'
import MiniChat from './MiniChat'
import { map } from 'lodash'
import { getAvatars } from '../Utilities/Avatar'
import { Avatar } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import {
    enviarInvitacion
} from '../Utilities/Rooms_helpers'

export default class Rooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idRoom: this.props.route.params.idSala,
            usuario: this.props.route.params.usuario, // obtiene el usuario desde props
            nombre: this.props.route.params.nombre,
            avatar_id: this.props.route.params.avatar_id,
            jugadores: [
                { nombre: 'webb', avatar_id: 2, playing: false },
                { nombre: 'Ronald', avatar_id: 8, playing: true },
                { nombre: 'Alyson', avatar_id: 5, playing: false },
                { nombre: 'Jose', avatar_id: 7, playing: false },
                { nombre: 'Oscar', avatar_id: 4, playing: false },
                { nombre: 'Pedro', avatar_id: 4, playing: true },
            ],
            spinner: false,
            msj: ''
        };
    }

    getAvatarImage(avatar_id) {
        const avatars = getAvatars();
        for (var i in avatars) {
            if (avatar_id === avatars[i].avatar_id) {
                return avatars[i].avatar_url;
            }
        }
    }

    enviarInvitacionAux = async (invitado) => {
        this.setState({ msj: 'Enviando invitación', spinner: true })

        const usr = this.state.usuario;
        const idSala = this.state.idRoom;

        var enviada = await enviarInvitacion(idSala, usr, invitado) /* 0:error, 1:exito */
        this.setState({ msj: '', spinner: false })
        if (enviada === 0) {
            Alert.alert('No se pudo enviar la invitación')
            return
        } else {
            Alert.alert('Se envió la invitación a ' + invitado)
        }
    }

    

    render() {
        return (
            <View style={styles.mainContainer}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.msj}
                    textStyle={{ color: '#FFF' }}
                />
                <Text style={styles.userText}>Room #{this.state.idRoom}</Text>

                <View>
                    <Avatar
                        style={styles.imageAvatarPrincipal}
                        source={this.getAvatarImage(this.state.avatar_id)}
                    />
                    <Text style={styles.textAvatarPrincipal}>{this.state.nombre}</Text>
                </View>

                <Text style={styles.mainText}>Sala de Juegos!</Text>
                <Image
                    style={styles.imageTable}
                    source={require('../Assets/table.png')}
                />

                {
                    <ScrollView
                        horizontal
                        style={{ alignSelf: 'center' }}
                    >
                        {
                            map(this.state.jugadores, (object, index) => (
                                <View key={index}>
                                    <Avatar
                                        style={styles.imageAvatar}
                                        source={this.getAvatarImage(object.avatar_id)}
                                        onPress={async () => { this.enviarInvitacionAux(object.nombre) }}
                                    />
                                    <Text style={styles.textAvatar}>{object.nombre}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                }

                <Button
                    onPress={
                        async () => {console.log(this.state.usuario)}
                    }
                    title={'pruebas'}>
                </Button>

                {/* <MiniChat
                    idRoom={this.state.idRoom}
                    usuario={this.state.usuario}
                /> */}
            </View>
        );
    }
}