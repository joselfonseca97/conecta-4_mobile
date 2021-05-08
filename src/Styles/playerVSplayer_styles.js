import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boardContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        alignSelf: "stretch",
        padding: 1,
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
    TotalTimeText: {
        color: "white",
        fontSize: 25,
    },
    contentContainer: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
    },
    backBtn: {
        marginTop: 10,
        borderColor: 'red',
        borderWidth: 2,
        alignSelf: 'stretch',
    },
    backGroundImage: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    downCounterText:{
        color:'red',
        fontWeight:'bold',
        fontSize:25
    }

})