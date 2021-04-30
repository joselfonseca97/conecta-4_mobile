import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import style from '../Styles/MenuPrincipal_styles'
import {
  crearSalaBD,
  obtenerIdSala,
  obtenerInfoUsuario
} from '../Utilities/Rooms_helpers'

class MenuPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.route.params.usuario,
      spinner: false
    };
  }

  crearSala = async () => {
    /* this.setState({ spinner: true }) */
    const usr = this.state.username;
    console.log('usuario: ' + usr)

    /* creación de la sala */
    var creada = await crearSalaBD(usr) /* 0:error, 1:exito */
    if (creada === 0) {
      /* this.setState({ spinner: false }) */
      Alert.alert('No se pudo crear la sala')
      return
    }

    var idSala = await obtenerIdSala(usr);
    if (idSala === -1) {
      /* this.setState({ spinner: false }) */
      Alert.alert('Ocurrió un error al tratar de obtener la sala')
      return
    }

    const json = await obtenerInfoUsuario(usr) /* nombre y id_avatar */

    if (json.hasOwnProperty('error')) {
      /* this.setState({ spinner: false }) */
      Alert.alert('No se obtuvieron los datos del jugador')
      return
    }

    /* redirecciona a la pantalla */
    const obj = {
      'idSala': idSala,
      'usuario': usr,
      'nombre': json.name,
      'avatar_id': json.avatar_id
    }
    this.setState({ spinner: false })
    this.props.navigation.navigate('Rooms', obj);
  }

  render() {
    return (
      <View style={style.mainContainer}>
        <Text> MenuPrincipal </Text>

        <Button
          onPress={async () => { this.crearSala() }}
          title={'Crear sala'}>
        </Button>
      </View>
    );
  }
}

export default MenuPrincipal;
