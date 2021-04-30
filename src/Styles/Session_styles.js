import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
        flex: 1,
        padding: hp(3),
        marginBottom: hp(1),
        backgroundColor: "aliceblue",
    },
    btnPlay: {
        alignItems: 'center',
        width: wp(90),
        marginBottom: hp(1),
    },
    lblTittle: {
        fontSize: wp(7),
        fontWeight: "bold",
    },
    lblJugadores: {
        padding: wp(3),
        fontWeight: "bold",
        fontSize: wp(5),
    },
    lstHistorial: {
        marginBottom: hp(1),
        padding:wp(3),
        fontSize:wp(5),
        backgroundColor: '#fff'
    },
    lblHistorial:{
        fontWeight: "bold",
        fontSize: wp(4),
    }

})