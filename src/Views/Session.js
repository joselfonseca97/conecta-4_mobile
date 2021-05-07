import React, {Component, useState} from 'react'
import { View, StyleSheet, Text, Button, FlatList,Image } from 'react-native'
import style from '../Styles/Session_styles'

const historial = [
    {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
    {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'},
    {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
    {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'},
    {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
    {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'}
];

export default class Session extends Component{

    render (){
        return(

        <View style={style.container}>

            <View >
                <Text style={style.lblTittle}> {'\n'}Sesion de: {'\t\t\t\t\t\t\t\t\t'}
                { <Button
                    color="#ff0000"
                    title={'Abandonar'}
                    onPress={() => { this.props.navigation.navigate('Login'); }}>
                </Button>}</Text>
            </View>

            <View >
                <Text style={style.lblJugadores}>
                    {<Image
                        style={style.iconUser}
                        source={require('../Assets/avatar_tadpole.png')}
                    />}
                    {'\t\t\t'}Ronald {'\t\t\t\t\t\t\t\t\t\t\t\t'} {<Text style={style.lblOnline}> Online </Text>}
                    {'\n\t\t\t\t\t\t'} &
                    {'\n'}
                    {<Image
                    style={style.iconUser}
                    source={require('../Assets/avatar_bee.png')}/>}
                    {'\t\t\t'} Alicia {'\t\t\t\t\t\t\t\t\t\t\t\t'} {<Text style={style.lblOffline}> Offline </Text>}</Text>
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
                <Button
                    title="Juego Nuevo"
                    onPress={() => this.props.navigation.navigate('Login')}
                    color="#1ab012"
                />
                <Button
                    title={'Salir'}
                    color="#000000"
                    onPress={() => { this.props.navigation.navigate('Rooms'); }}>
                </Button>
            </View>
        </View>
        );
    }
}
