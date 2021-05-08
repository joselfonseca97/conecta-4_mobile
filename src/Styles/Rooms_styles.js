import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    // View Room configurations
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
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
        borderRadius: 30,
        /* shadow */
        elevation: 15, // Android
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
        backgroundColor: '#0D47A1',
    },
    imageAvatarPrincipal: {
        height: hp('15%'),
        width: wp('25%'),
        marginLeft: 25,
        //marginRight: 10,
        borderRadius: 10,
        marginTop: wp('16'),
        backgroundColor: 'yellow'
    },
    textAvatarPrincipal: { /* texto nombre usuario */
        fontFamily: 'notoserif',
        fontSize: 35,
        top: hp('-6'),
        left: wp('40'),
        color: 'white',  
    },
    codigoSala: {
        fontFamily: 'notoserif',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'orangered',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%',
        marginBottom: '6%'
    },
    /* imagen texto Sala de juego */
    image: {
        alignSelf: 'center',
        marginTop: wp('0%'),
        //marginBottom: hp('1%'),
    },
    viewScrollOnRoom:{
        backgroundColor: 'gray',
        borderRadius: 15,
        marginLeft: wp('5%'),
        marginRight: wp('5%') 
    },
    viewScrollOnline:{
        top: hp('30%'),
        backgroundColor: 'gray',
        borderRadius: 15,
        marginLeft: wp('5%'),
        marginRight: wp('5%') 
    },
    scrollViewUsuariosConectados: {
        backgroundColor: 'yellowgreen',
        alignSelf: 'center',
        marginTop: wp('5%'),
        marginBottom: wp('4%'),
        width: wp('80%'),
        height: hp('15%'),
        borderRadius: 3
    }, 
    /* avatars usuarios conectados */
    imageAvatar: {
        height: 75,
        width: 75,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 50,
        marginBottom: 0,
        marginTop: 10,
        backgroundColor: 'midnightblue'
    },
    textAvatar: {
        fontFamily: 'notoserif',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    texto2: { /* texto: lista de jugadores en linea */
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: wp('2%'),
        marginBottom: wp('2%'),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
    },
    button2: { /* botones en sala */
        alignItems: 'center',
        padding: wp(2),
        backgroundColor: 'green',
        marginLeft: wp('23%'),
        marginRight: wp('23%'),
        borderRadius: 15,
        marginBottom: wp('4%'),
        /* shadow */
        elevation: 15, // Android
        
    },
    buttonText2: {
        color: 'black',
        fontSize: wp('4'),
        fontWeight: 'bold'
    },
})