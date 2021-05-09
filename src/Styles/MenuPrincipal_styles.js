import React from 'react'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
     mainContainer: {
          flex: 1,
          backgroundColor: '#66cdaa',
          alignItems: 'center',
          justifyContent: 'center',
     },
     logo: {
          fontWeight: "bold",
          fontSize: 50,
          color: "#8a2be2",
     },
     combo: {
          justifyContent: 'center',
          backgroundColor: '#ffe4c4',
          width: 250,
          height: 30
     },
     secondaryContainer: {
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent:'space-around',
          width: '85%',
          maxHeight: '50%',
          padding: '5%',
     },
     radioStyle: {
          width: '100%'
     },
     sizePicker: {
          width: '100%',
          backgroundColor:'rgba(255,255,255,0.3)'
     },
     mainButtonsContainer: {
          justifyContent:'space-between',
          width: '100%'
     },
     backButtonContainer: {
          width: '30%',
          alignSelf:'flex-start'
     }
})