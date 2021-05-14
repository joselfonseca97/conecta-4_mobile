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
    scrollViewStyle2: {
        backgroundColor: 'yellowgreen',
        marginRight: wp('5%'),
        marginLeft: wp('5%'),
        marginBottom: wp('2'),
        borderRadius: 2,
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
        height: hp('12%'),
        width: wp('22%'),
        marginLeft: 25,
        borderRadius: 10,
        marginTop: wp('12'),
        backgroundColor: 'yellow'
    },
    textAvatarPrincipal: { /* texto nombre usuario */
        fontFamily: 'notoserif',
        fontSize: 33,
        top: hp('-9'),
        left: wp('35'),
        color: 'white',  
    },
    codigoSala: {
        fontFamily: 'notoserif',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'orangered',
        left: wp('35'),
        top: hp('-9'),
        marginRight: hp('30'),
    },
    /* imagen texto Sala de juego */
    image: {
        alignSelf: 'center',
        top: -45,
        //marginBottom: hp('1%'),
    },
    viewScrollOnRoom:{
        backgroundColor: 'gainsboro',
        borderRadius: 10,
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        top: -40,
    },
    viewScrollOnline:{
        top: hp('30%'),
        backgroundColor: 'gainsboro',
        borderRadius: 10,
        marginLeft: wp('5%'),
        marginRight: wp('5%') 
    },
    scrollViewUsuariosConectados: {
        backgroundColor: 'yellowgreen',
        alignSelf: 'center',
        marginTop: wp('2%'),
        marginBottom: wp('2%'),
        width: wp('80%'),
        height: hp('15%'),
        borderRadius: 2
    },
    viewScrollOnSession: {
        backgroundColor: 'gainsboro',
        borderRadius: 10,
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        top: -40,
        marginTop: hp('2'),
        height: hp('28')
    }, 
    /* avatars usuarios conectados */
    imageAvatar: {
        height: 75,
        width: 75,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 50,
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
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: wp('2%'),
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
    },
    button2: { /* boton en sala actualizar */
        alignItems: 'center',
        padding: wp(1),
        backgroundColor: 'green',
        marginLeft: wp('23%'),
        marginRight: wp('23%'),
        borderRadius: 15,
        marginBottom: wp('3%'),
        /* shadow */
        elevation: 15, // Android
        
    },
    buttonText2: {
        color: 'black',
        fontSize: wp('4'),
        fontWeight: 'bold'
    },
})