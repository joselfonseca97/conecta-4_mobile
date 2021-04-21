import React from 'react'
import { Text, TextInput, View, TouchableHighlight, ScrollView, Alert, Image } from 'react-native'
import styles from '../Styles/Rooms_styles'
import MiniChat from './MiniChat'
import { map } from 'lodash'
import { getAvatars } from '../Utilities/Avatar'

export default class Rooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idRoom: 1,
            usuario: 'ronaldhg', //this.props.route.params.usuario // obtiene el usuario desde props
            jugadores: [
                { nombre: 'Alicia', avatar_id: 2, playing: false },
                { nombre: 'Ronald', avatar_id: 8, playing: true },
                { nombre: 'Alyson', avatar_id: 5, playing: false },
                { nombre: 'Jose', avatar_id: 7, playing: false },
                { nombre: 'Oscar', avatar_id: 4, playing: false },
                { nombre: 'Pedro', avatar_id: 4, playing: true },
            ]
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

    render() {
        this.getAvatarImage(1);
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.userText}>Ronaldhg</Text>

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
                                <View key={index} onPress={() => console.log('sdf')}>
                                    <TouchableHighlight
                                        onPress={() => Alert.alert('jugador: ' + object.nombre)}
                                    >
                                        <Image
                                            style={styles.imageAvatar}
                                            source={this.getAvatarImage(object.avatar_id)}
                                        />
                                    </TouchableHighlight>
                                    <Text style={styles.textAvatar}>{object.nombre}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                }

                <MiniChat
                    idRoom={this.state.idRoom}
                    usuario={this.state.usuario}
                />
            </View>
        );
    }
}