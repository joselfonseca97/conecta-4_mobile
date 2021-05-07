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
        backgroundColor: 'navy',
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
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'orangered',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%'
    },
    /* imagen texto Sala de juego */
    image: {
        alignSelf: 'center',
        marginTop: wp('0%'),
        //marginBottom: hp('5%'),
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