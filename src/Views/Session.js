import React, {Component, useState} from 'react'
import {View, StyleSheet, Text, Button, FlatList, Image, Picker} from 'react-native'
import style from '../Styles/Session_styles'
import Constants from "expo-constants";
const gameUtil = require('../Utilities/Game')

const { manifest } = Constants;
const uri=`http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC


const historial = [
   /*  {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
    {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'},
    {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
    {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'},
    {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
    {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'} */
];

export default class Session extends Component{

    constructor(props) {
        super(props);
        this.state = {
            PickerSelectedVal: ''
        };
    }

    componentDidMount() {
        this.startUserAccept();
        this.loadInvitaciones();
    }

    addInvitation = async () => {
        const respuesta =  await fetch(`${uri}/api/addInvitation`, {
            method: 'post',
            body: JSON.stringify({
                fromplayer: this.props.route.params.username1,
                toplayer: this.props.route.params.username2,
                fromplayeruser: this.props.route.params.username1
            }),
            headers: { 'Content-type': 'application/json' }
        })
        const data = await respuesta.json()
        console.log("mensaje front: "+data.msg)
        if (data.msg === 1) { //succefully sent invitation
            alert("¡Se ha enviado una invitacion a " + this.props.route.params.username2 + "!")
        } else if (data.msg === 2) {
            alert("Ya has enviado una invitacion a " + this.props.route.params.username2 + "")
        }
        else {
            alert("Ha ocurrido un error...")
        }
    }

    startUserAccept () {
        var myUserName = this.props.route.params.username1;
        // Cada segundos verifica si el otro jugador aceptó la solicitud
        setInterval(async () => {
            // REturns -1 if there is no online game created
            var idGame = await gameUtil.getLastIdGame(myUserName);
            if (idGame !== -1) {
                // Leads to the game page
                this.props.navigation.navigate('OnlineGame',{ username: this.props.route.params.username2, tamano: this.state.PickerSelectedVal})
            }
        }, 400);
    }

    loadInvitaciones = async () => {
        const respuesta =  await fetch(`${uri}/api/getInvitation`, {
            method: "post",
            body: JSON.stringify({
                toplayer: this.props.route.params.username1
            }),
            headers: { 'Content-type': 'application/json' }
        })
        const data = await respuesta.json()           //getting data from backend
        if (data.msg !== 0){
            alert(
                "¿Vamos a jugar?",
                [
                    {text: "NO", style: "cancel"},
                    {text: "OK", onPress: () => this.props.navigation.navigate('OnlineGame',{ username: this.props.route.params.username2, tamano: this.state.PickerSelectedVal})
                    }
                ],
                { cancelable: false }
            )
        }

    }

    render (){
        return(

        <View style={style.container}>

            <View >
                <Text style={style.lblTittle}> {'\n'}Sesion de: {'\t\t\t\t\t\t\t\t\t'}
                { <Button
                    color="#ff0000"
                    title={'Abandonar'}
                    onPress={() => { this.props.navigation.navigate('Room'); }}>
                </Button>}</Text>
            </View>

            <View >
                <Text style={style.lblJugadores}>
                    {<Image
                        style={style.iconUser}
                        source={require('../Assets/avatar_tadpole.png')}
                    />}
                    {'\t\t\t'}{this.props.route.params.username1} {<Text style={style.lblOnline}> Online </Text>}
                    {'\n\t\t\t\t\t\t'} &
                    {'\n'}
                    {<Image
                    style={style.iconUser}
                    source={require('../Assets/avatar_bee.png')}/>}
                    {'\t\t\t'} {this.props.route.params.username2} {<Text style={style.lblOffline}> Offline </Text>}</Text>
            </View>
            <View >
                <Text style={style.lblHistorial}> Historial </Text>
            </View>
            <FlatList
                keyExtract = {(item) => item.fecha}
                data = {historial}
                renderItem={({item}) => (
                    <Text style={style.lstHistorial}>
                        {item.fecha}
                        {<Image
                        style={style.iconHistorial}
                        source={require('../Assets/calendario.png')}/>}
                        {'\n'}
                        {item.ganador}
                        {<Image
                        style={style.iconHistorial}
                        source={require('../Assets/ganador.png')}/>}
                        {'\n'}
                        {item.duracion}
                        {<Image
                        style={style.iconHistorial}
                        source={require('../Assets/tiempo.png')}/>}
                    </Text>
                )}
            />
            <View style={style.btnPlay}>
                <View style={style.sizePicker}><Picker
                    selectedValue={this.state.PickerSelectedVal}
                    onValueChange={(itemValue, itemIndex) => this.setState({ PickerSelectedVal: itemValue })} style={style.combo}>
                    <Picker.Item label="Seleccionar Tamaño de Tablero" value="select" key={"1"}/>
                    <Picker.Item label="7x7" value="7x7" key={"13"}/>
                    <Picker.Item label="8x8" value="8x8" key={"14"}/>
                    <Picker.Item label="9x9" value="9x9" key={"11"}/>
                    <Picker.Item label="10x10" value="10x10" key={"12"}/>
                </Picker></View>
                <Button
                    title="Juego Nuevo"
                    onPress={() => this.addInvitation()}
                    color="#1ab012"
                />
                <Button
                    title={'Salir'}
                    color="#000000"
                    onPress={() => this.props.navigation.goBack()} >
                </Button>
            </View>
        </View>
        );
    }
}
