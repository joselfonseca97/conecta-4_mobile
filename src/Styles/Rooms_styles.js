import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    // View Room configurations
    texto: {
        alignSelf: 'center',
        marginTop: wp('30%'),
        marginBottom: wp('3%'),
        fontSize: wp('6'),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
    },
    texto2: {
        alignSelf: 'center',
        marginBottom: wp('2%'),
        marginTop: wp('15%'),
        fontSize: wp('6'),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        padding: wp(2),
        backgroundColor: 'deepskyblue',
        marginTop: wp('3'),
        marginLeft: wp('25%'),
        marginRight: wp('25%'),
        borderRadius: 30
    },
    buttonText: {
        color: 'white',
        fontSize: wp('4'),
        fontWeight: 'bold'
    },
    scrollViewStyle: {
        backgroundColor: 'gainsboro',
        marginTop: wp('3%'),
        marginBottom: wp('55%'),
        marginRight: wp('10%'),
        marginLeft: wp('10%'),
        borderRadius: 15
    }, 
    inputStyle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    



    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    userText: {
        fontFamily: 'notoserif',
        fontSize: 20,
        marginLeft: 10,
        textAlign: 'left',
        color: 'white',
        backgroundColor: 'gray'
    },
    // Texto sala de juegos
    mainText: {
        fontFamily: 'monospace',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: 'sienna',
        color: 'white'
    },
    imageTable: {
        /* width: 100,
        height: 100, */
        marginBottom: 15,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    imageAvatarPrincipal: {
        height: 75,
        width: 75,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 5,
        marginBottom: 0,
        marginTop: 10,
        backgroundColor: 'azure'
    },
    textAvatarPrincipal: {
        fontFamily: 'notoserif',
        marginLeft: 15
    },
    imageAvatar: {
        height: 75,
        width: 75,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 50,
        marginBottom: 0,
        marginTop: 10,
        backgroundColor: 'azure'
    },
    textAvatar: {
        fontFamily: 'notoserif',
        textAlign: 'center'
    }
})