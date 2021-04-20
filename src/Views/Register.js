import React, { Component, Fragment } from 'react'
import { Modal, View, Text, Button, Image, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import style from '../Styles/Register_styles'
import avatarStyle from '../Styles/Avatars_styles'
import MoveToBottom from '../Utilities/MoveToBottom'
import { TouchableHighlight } from 'react-native'
import Avatars_styles from '../Styles/Avatars_styles'

const avatar = require('../Utilities/Avatar')

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            userName: null,
            password: null,
            avatar: null,
            modalVisible: false,
            avatars: [],
            selectedAvatar: require('../Assets/avatar_default.png'),
            selectedAvatarId: 1
        }
    }
    onChangeNameInput = event => this.setState({ name: event })
    onChangePasswordInput = event => this.setState({ password: event })
    onModalStatusChange = () => this.setState({ modalVisible: !this.state.modalVisible })
    onAvatarSelectionChange = (source, id) => (evt) => {
        this.setState({ selectedAvatar: source })
        this.onModalStatusChange()
    }
    componentDidMount() {
        let getAvatar = avatar.getAvatars()
        this.setState({ avatars: getAvatar })
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <Modal
                    style={style.Modal}
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={this.onModalStatusChange}>
                    <ScrollView style={style.modalScrollView}>
                        {this.state.avatars.map((av) => {
                            return (
                                <TouchableHighlight onPress={this.onAvatarSelectionChange(av.avatar_url, av.avatar_id)} style={Avatars_styles.modalAvatarContainer}>
                                    <Image
                                        style={Avatars_styles.modalAvatar}
                                        source={av.avatar_url}
                                        id={av.avatar_id}
                                    />
                                </TouchableHighlight>
                            )
                        })}
                        {/* ,
                            MoveToBottom(
                                <Button
                                    title="Back"
                                    onPress={this.onModalStatusChange}
                                />
                            )

                        } */}
                    </ScrollView>
                </Modal>
                <View style={style.secondaryContainer}>
                    <Text style={style.registroText}>Registro</Text>
                    <TextInput
                        style={style.inputStyle}
                        name="name"
                        placeholder="Username"
                        onChangeText={this.onChangeNameInput}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={style.inputStyle}
                        name="password"
                        placeholder="password"
                        onChangeText={this.onChangePasswordInput}
                    />
                    <View style={avatarStyle.container}>
                        <TouchableHighlight onPress={this.onModalStatusChange} >
                            <Image
                                style={avatarStyle.avatarStyle}
                                source={this.state.selectedAvatar}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={style.loginButton}>
                        <Button
                            title="Go to login"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
                    </View>
                    <Button
                        title="login Google"
                        onPress={() => console.log("tamaño avatar: " + this.state.avatars.length)}
                    />
                </View>
            </View >
        )
    }
}