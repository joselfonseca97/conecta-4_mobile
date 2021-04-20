import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        borderColor: 'blue',
        borderWidth: 2,
        alignItems: 'center',
        marginBottom: hp(5)
    },
    avatarStyle: {
        width: wp(25),
        height: wp(25),
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    modalAvatar: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'contain',
        width: wp(25),
        height: wp(25),
        borderColor: 'blue',
        borderWidth: 1,
        margin: wp(1)
    },
    modalAvatarContainer: {
        flex: 1,
        flexDirection: 'row',
    }
})