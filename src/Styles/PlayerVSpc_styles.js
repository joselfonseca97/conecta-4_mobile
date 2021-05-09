import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        borderColor: 'red',
        borderWidth: 1,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backGroundImage: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    downCounterText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 25
    },
    backBtn: {
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 2,
        alignSelf: 'stretch',
    },
    contentContainer: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
    },
    TotalTimeText: {
        color: "white",
        fontSize: 25,
    },
    content: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    turnText: {
        color: "white",
        fontSize: 25,
    },
    boardContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

})