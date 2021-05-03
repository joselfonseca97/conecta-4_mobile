import React from 'react'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#5f9ea0',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#8a2be2",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#8fbc8f",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black"
        
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    },
    googleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})