import React from 'react'
import { View, Text, Trans, Touchable, ScrollView, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../Styles/MiniChat_Style'
import { map } from 'lodash'
/* 
export default class MiniChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idRoom: props.idRoom, // obtiene el usuario desde props
            usuario: props.usuario, // obtiene el usuario desde props
            msjs: [
                {
                    msj: ,
                    remitente: 'Ronald',
                    hora: '07:25'
                }, {
                    msj: 'listo',
                    remitente: 'Jose',
                    hora: '07:29'
                }, {
                    msj: 'no aguantan',
                    remitente: 'Alicia',
                    hora: '07:30'
                }, {
                    msj: 'jaja',
                    remitente: 'Alyson',
                    hora: '07:40'
                }
            ],
            mensaje: ''
        };
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Chat de la sala</Text>

                <ScrollView
                    vertical
                >
                    {
                        map(this.state.msjs, (object, index) => (
                            <TextInput
                                key={index}
                                multiline
                                editable={false}
                                value={object.hora + ' ' + object.remitente + ': ' + object.msj}

                            />
                        ))
                    }
                </ScrollView>

                <TextInput
                    multiline
                    placeholder={'mensaje'}
                    value={this.state.mensaje}
                />

                <TouchableOpacity
                    title="Enviar"
                    style={styles.sendButton}
                    onPress={() => console.log("Enviando..." + this.state.usuario)}
                >
                    <Text>Enviar</Text>
                </TouchableOpacity>

            </View>
        )
    }
} */

import { GiftedChat } from 'react-native-gifted-chat';

export default class MiniChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: 'Ronald: ¿jugamos?',
                    //createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                    },
                },
                {
                    _id: 2,
                    text: 'Jose: Claro que sí',
                    //createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                    },
                },
            ]
        };
        this.onSend = this.onSend.bind(this);
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }
    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 1,
                }}
            />
        );
    }
}