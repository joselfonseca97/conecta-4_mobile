import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryContainer: {
        width: wp(100),
        height: hp(80),
        padding: wp(8)
    },
    registroText: {
        color: 'white',
        fontSize: wp(10),
        textAlign: 'center',
        marginBottom: hp(5),
    },
    buttonContainers: {
        marginBottom: hp(1),
        borderRadius: 50,
    },
    inputStyle: {
        marginBottom: hp(5),
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 50,
        textAlign: 'center'
    },
    modal: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'baseline',
        justifyContent: 'space-evenly'
    },
    modalScrollView: {
        position: 'relative',
        flexDirection: 'column',
        flex: 1,
        display: 'flex',
    },
    modalButton: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backGroundImage: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover'
    }
})