import React, { Component, Fragment } from 'react'
import { TouchableHighlight, ImageBackground, Modal, View, Text, Button, Image, ScrollView, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import style from '../Styles/Register_styles'
import avatarStyle from '../Styles/Avatars_styles'
import md5 from 'md5'

const avatar = require('../Utilities/Avatar')
const users = require('../Utilities/Usuarios')
const backGroundImagen = require('../Assets/backGround.png')

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            userName: null,
            password: null,
            passwordConfirm: null,
            avatar: null, //check if this is used
            modalVisible: false,
            avatars: [],
            selectedAvatar: require('../Assets/avatar_default.png'),
            selectedAvatarId: 0,
            spinner: false
        }
    }
    onChangeNameInput = event => this.setState({ name: event, userName: event })
    onChangePasswordInput = event => this.setState({ password: event })
    onChangePasswordConfirmInput = event => this.setState({ passwordConfirm: event })
    onModalStatusChange = () => this.setState({ modalVisible: !this.state.modalVisible })
    onAvatarSelectionChange = (source, id) => (evt) => {
        this.setState({ selectedAvatar: source, selectedAvatarId: id })
        this.onModalStatusChange()
    }
    componentDidMount() {
        let getAvatar = avatar.getAvatars()
        this.setState({ avatars: getAvatar })
    }

    getUsers = async () => {
        let usuario = await users.getUsers()
        return usuario
    }


    registerProcess = async () => {
        this.setState({ spinner: true })
        let flag = true
        if (this.state.name && this.state.password && this.state.passwordConfirm) {
            if (this.state.password === this.state.passwordConfirm) {
                let use = await this.getUsers()
                use.map((user) => {
                    if (user.username === this.state.userName) {
                        this.setState({ spinner: false })
                        alert("User already exists")
                        flag = false
                    }
                })
                if (flag) {
                    let data = {
                        name: this.state.name,
                        username: this.state.userName,
                        password: md5(this.state.password),
                        avatar_id: this.state.selectedAvatarId
                    }
                    if (await users.addUser(data)) {
                        this.setState({ spinner: false })
                        alert("Welcome " + this.state.name + "!!")
                        this.props.navigation.navigate('Login')
                    } else {
                        this.setState({ spinner: false })
                        alert("Error, try again")
                    }
                }

            } else {
                this.setState({ spinner: false })
                alert("Passwords does'nt match")
            }
        } else {
            this.setState({ spinner: false })
            alert("Information missing")
        }
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <ImageBackground source={backGroundImagen} style={style.backGroundImage}>
                    <Modal
                        style={style.Modal}
                        animationType='slide'
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={this.onModalStatusChange}>
                        <ScrollView style={style.modalScrollView}>
                            {this.state.avatars.map((av) => {
                                if (av.avatar_id === this.state.selectedAvatarId) {
                                    return (
                                        <TouchableHighlight key={av.avatar_id} onPress={this.onAvatarSelectionChange(av.avatar_url, av.avatar_id)} style={avatarStyle.modalAvatarContainer}>
                                            <Image
                                                style={avatarStyle.modalAvatar_Selected}
                                                source={av.avatar_url}
                                                id={av.avatar_id}
                                            />
                                        </TouchableHighlight>
                                    )
                                } else {
                                    return (
                                        <TouchableHighlight key={av.avatar_id} onPress={this.onAvatarSelectionChange(av.avatar_url, av.avatar_id)} style={avatarStyle.modalAvatarContainer}>
                                            <Image
                                                style={avatarStyle.modalAvatar}
                                                source={av.avatar_url}
                                                id={av.avatar_id}
                                            />
                                        </TouchableHighlight>
                                    )
                                }
                            })}
                        </ScrollView>
                    </Modal>

                    <Button title='' />
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
                            placeholder="Password"
                            onChangeText={this.onChangePasswordInput}
                        />
                        <TextInput
                            secureTextEntry={true}
                            style={style.inputStyle}
                            name="passwordConfirm"
                            placeholder="Password confirmation"
                            onChangeText={this.onChangePasswordConfirmInput}
                        />
                        <View style={avatarStyle.container}>
                            <TouchableHighlight onPress={this.onModalStatusChange} >
                                <Image
                                    style={avatarStyle.avatarStyle}
                                    source={this.state.selectedAvatar}
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={style.buttonContainers}>
                            <Button
                                title="Registrarse"
                                onPress={this.registerProcess}
                            />
                        </View>

                        <View style={style.backButtonContainer}>
                            <Button
                                title='Regresar'
                                color='#bd0212'
                                onPress={() => this.props.navigation.goBack()} />
                        </View>
                    </View>
                    {this.state.spinner &&
                        <View style={style.loading}>
                            <ActivityIndicator animating={true} size="large" color='red' />
                            <Text style={{ color: 'white' }}>Loading...</Text>
                        </View>
                    }
                </ImageBackground>
            </View >
        )
    }
}