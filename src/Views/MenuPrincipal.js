import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from '../Styles/MenuPrincipal_styles'

class MenuPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
         <View style={style.mainContainer}>
        <Text> MenuPrincipal </Text>
      </View>
    );
  }
}

export default MenuPrincipal;
