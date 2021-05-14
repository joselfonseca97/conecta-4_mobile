import React, { Component } from 'react';
import { View, Text, Button, Picker, Alert } from 'react-native';
import style from '../Styles/MenuPrincipal_styles'
import RadioForm from 'react-native-simple-radio-button';
import { TouchableHighlight } from 'react-native-gesture-handler';
const utils = require('../Utilities/Usuarios')

var radio_props = [
  { label: 'Jugador vs Computadora', value: 0 },
  { label: 'Jugador vs Jugador', value: 1 }
];


class MenuPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.route.params.usuario,
      spinner: false,
      value: 0,
      PickerSelectedVal: ''
    };
  }

  onLogOut = async () => {
    utils.setOfflinePlayer(this.state.username)
    this.props.navigation.navigate('Login')
  }
  startGame = () => {
    if (this.state.PickerSelectedVal) {
      let tam;
      switch (this.state.PickerSelectedVal) {
        case "7x7":
          tam = 7
          break
        case "8x8":
          tam = 8
          break
        case "9x9":
          tam = 9
          break
        default:
          tam = 10
      }
      if (this.state.value === 0) { // Play against PC
        this.props.navigation.navigate('PlayerVSpc', { usuario: this.state.username, size: tam })
      } else { //Play player vs player
        this.props.navigation.navigate('PlayerVSplayer', { usuario: this.state.username, size: tam })
      }
    } else {
      alert("seleccione tamaño")
    }
  }

  testNewGame=()=>{
    //console.log(this.state.username)
    this.props.navigation.navigate('OnlineGame',{ username: this.state.username, tamano: 7});
  }
  render() {

    return (
      <View style={style.mainContainer}>
        <Button title='a' onPress={this.testNewGame}/>
        <Text style={style.logo} >BIENVENIDO!</Text>
        <View style={style.secondaryContainer}>
          <View style={style.radioStyle}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => { this.setState({ value: value }) }}
            />
          </View>
          <View style={style.sizePicker}><Picker
            selectedValue={this.state.PickerSelectedVal}
            onValueChange={(itemValue, itemIndex) => this.setState({ PickerSelectedVal: itemValue })} style={style.combo}>
            <Picker.Item label="Seleccionar Tamaño de Tablero" value="select" />
            <Picker.Item label="7x7" value="7x7" />
            <Picker.Item label="8x8" value="8x8" />
            <Picker.Item label="9x9" value="9x9" />
            <Picker.Item label="10x10" value="10x10" />
          </Picker></View>
          <View style={style.mainButtonsContainer}>
            <TouchableHighlight style={{ marginBottom: '2%' }}>
              <Button
                onPress={this.startGame}
                title={"Iniciar Juego"}>
              </Button></TouchableHighlight>

            <Button
              onPress={() => this.props.navigation.navigate('RoomConfig', { usuario: this.state.username })}
              title={'Salas'}>
            </Button>
          </View>
          <View style={style.backButtonContainer}>
            <Button
              title='Regresar'
              color='#bd0212'
              onPress={this.onLogOut} />
          </View>
        </View>
      </View>
    );
  }
}

export default MenuPrincipal;
