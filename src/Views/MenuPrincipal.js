import React, { Component } from 'react';
import { View, Text, Button,Picker } from 'react-native';
import style from '../Styles/MenuPrincipal_styles'
import RadioForm from 'react-native-simple-radio-button';
import {crearSalaBD,obtenerIdSala,obtenerInfoUsuario} from '../Utilities/Rooms_helpers'

var radio_props = [
  {label: 'Jugador vs Computadora', value: 0 },
  {label: 'Jugador vs Jugador', value: 1 }
];


class MenuPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.route.params.usuario,
      spinner: false,
      value:0,
      PickerSelectedVal :''
    };
  }
  //---------------------------------------------------------------------------------------------------
  //-------------                         FUNCION DE CREAR SALA                            ------------
  //---------------------------------------------------------------------------------------------------

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
  //---------------------------------------------FIN----------------------------------------------------

  render() {

    return (
      <View style={style.mainContainer}>
        <Text style={style.logo} >BIENVENIDO</Text>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />

        <Text> </Text>

        <Picker
           selectedValue={this.state.PickerSelectedVal}
           onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})} style={style.combo}>
          <Picker.Item label="Seleccionar Tamaño de Tablero" value="select"/>
           <Picker.Item label="7x7" value="7x7" />
           <Picker.Item label="8x8" value="8x8" />
           <Picker.Item label="9x9" value="9x9" />
           <Picker.Item label="10x10" value="10x10" />
         </Picker>

        <Text></Text>

        <Button
          onPress={async () => {  }}
          title={"Iniciar Juego"}>
        </Button>

        <Text></Text>
        
        <Button
          onPress={async () => { this.crearSala() }}
          title={'Crear sala'}>
        </Button>

        <View>
           <Button title='Go back' onPress={() => this.props.navigation.navigate('Login')} />
           </View>

      </View>


  
      
    );
  }
}

export default MenuPrincipal;
