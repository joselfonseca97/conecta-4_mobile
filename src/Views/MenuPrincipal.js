import React, { Component } from 'react';
import { View, Text, Button, Picker, Alert } from 'react-native';
import style from '../Styles/MenuPrincipal_styles'
import RadioForm from 'react-native-simple-radio-button';

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

  startGame = () => {
    if (this.state.PickerSelectedVal) {
      if (this.state.value === 0) { // Play against PC

      } else { //Play player vs player
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
        this.props.navigation.navigate('PlayerVSplayer', { usuario: this.state.username,size:tam })
      }
    } else {
      alert("seleccione tamaño")
    }
  }

  render() {

    return (
      <View style={style.mainContainer}>
        <Text style={style.logo} >BIENVENIDO</Text>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => { this.setState({ value: value }) }}
        />

        <Text> </Text>

        <Picker
          selectedValue={this.state.PickerSelectedVal}
          onValueChange={(itemValue, itemIndex) => this.setState({ PickerSelectedVal: itemValue })} style={style.combo}>
          <Picker.Item label="Seleccionar Tamaño de Tablero" value="select" />
          <Picker.Item label="7x7" value="7x7" />
          <Picker.Item label="8x8" value="8x8" />
          <Picker.Item label="9x9" value="9x9" />
          <Picker.Item label="10x10" value="10x10" />
        </Picker>

        <Text></Text>

        <Button
          onPress={this.startGame}
          title={"Iniciar Juego"}>
        </Button>

        <Text></Text>

        <Button
          onPress={() => this.props.navigation.navigate('RoomConfig', { usuario: this.state.username })}
          title={'Salas'}>
        </Button>

        <View>
          <Button title='Go back' onPress={() => this.props.navigation.navigate('Login')} />
        </View>

      </View>
    );
  }
}

export default MenuPrincipal;
