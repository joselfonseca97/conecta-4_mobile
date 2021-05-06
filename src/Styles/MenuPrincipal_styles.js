import React from 'react'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
     mainContainer: {
          flex: 1,
          backgroundColor: '#66cdaa',
          alignItems: 'center',
          justifyContent: 'center'
     },
     logo: {
          fontWeight: "bold",
          fontSize: 50,
          color: "#8a2be2",
          marginBottom: 40
      },
     combo: {
          justifyContent: 'center',
          backgroundColor: '#ffe4c4',
          width: 250,
          height:30
        }
})