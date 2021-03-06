import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {   // where selected avatar is displayed
        flex:1,
        alignItems: 'center',
        marginBottom: hp(5),
    },
    avatarStyle: {  // selected avatar
        width: wp(25),
        height: wp(25),
        borderColor: 'black',
        borderWidth: 2,
        borderRadius:30,
        backgroundColor: 'rgba(255,255,255,0.3)'
        
    },
    modalAvatar: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'contain',
        width: wp(30),
        height: wp(30),
        //borderColor:'purple',
        //borderWidth: 1,
        margin: wp(1),
        backgroundColor:'white',
        backgroundColor:'rgba(128, 255, 255,0.9)'
    },
    modalAvatar_Selected: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'contain',
        width: wp(30),
        height: wp(30),
        borderColor:'green',
        borderWidth: 2,
        margin: wp(1),
        backgroundColor:'rgba(128, 255, 170,0.9)'

    },
    modalAvatarContainer: {
        flex: 1,
        flexDirection: 'row',
    }
})