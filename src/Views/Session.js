import React, { useState } from 'react'
import { View, StyleSheet, Text, Button, FlatList } from 'react-native'
import style from '../Styles/Session_styles'



export default function Session()  {

    const [historial,setHistorial] = useState ([
        {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
        {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'},
        {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
        {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'},
        {fecha:'29/04/2021', ganador: 'Ronald', duracion: '4:30'},
        {fecha:'28/04/2021', ganador: 'Alicia', duracion: '14:36'},
    ]);

    return (
        <View style={style.container}>

            <View >
                <Text style={style.lblTittle}> {'\n'}Sesion de: </Text>
            </View>

            <View >
                <Text style={style.lblJugadores}> {'\t\t\t\t\t\t\t\t\t\t\t\t'}Ronald
                    {'\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t'} & {'\n\t\t\t\t\t\t\t\t\t\t\t\t'} Alicia </Text>
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
                        {'\n'}
                        {item.ganador}
                        {'\n'}
                        {item.duracion}
                    </Text>
                )}
            />
            <View style={style.btnPlay}>
                <Button
                    title="Juego Nuevo"
                    onPress={() => this.props.navigation.navigate('Login')}
                    color="#1ab012"
                />
            </View>
        </View>
    );

}
