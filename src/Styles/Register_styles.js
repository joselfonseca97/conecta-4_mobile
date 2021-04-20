import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    secondaryContainer: {
        width: wp(90),
        height: hp(80),
        borderColor: 'blue',
        borderWidth: 1,
        padding: wp(8)
    },
    registroText: {
        color: 'white',
        fontSize: wp(10),
        textAlign: 'center',
        marginBottom: hp(5),
    },
    loginButton: {
        marginBottom: hp(1),
        backgroundColor: 'red'
    },
    inputStyle: {
        marginBottom: hp(5),
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius:50,
        textAlign:'center'
    },
    modal: {
        flex:1,
        backgroundColor: 'red',
        alignItems:'baseline',
        justifyContent:'space-evenly'
    },
    modalScrollView:{
        position:'relative',
        flexDirection:'column',
        flex:1,
        display:'flex',
    },
    modalButton: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})