import React from 'react'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#5f9ea0',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems:'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#8a2be2",
        marginBottom: 50
    },
    inputView: {
        backgroundColor: "#8fbc8f",
        borderRadius: 25,
        marginBottom: 20,
        alignItems:'center',
        alignContent:'center',
        padding: 20
    },
    inputText: {
        textAlign:'center'
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        marginBottom: 10,
    },
    loginText: {
        color: "white"
    },
    googleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryContainer:{
        flex:1,
        padding:'3%',
        width:'85%',
        maxHeight:'50%',
        justifyContent:'space-evenly'
    },
    sizePicker: {

        width: wp(55),
        height: hp(5),
        alignSelf: "flex-end",
        backgroundColor:'rgba(255,255,255,0.3)'
    }
})
