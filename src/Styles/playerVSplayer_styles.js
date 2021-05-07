import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'red'
    },
    boardContainer: {
        flex: 1,
        flexDirection:'column',
        borderColor: 'green',
        borderWidth: 1,
        display:'flex',
        alignItems:'center',
        alignContent:'center',
        justifyContent: 'center',
        maxHeight:wp(100),
        maxHeight:hp(100),
        width:wp(100),
        height:hp(100),
        //flexWrap:'wrap',
        //alignItems: 'flex-start',
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
    text: {
        color: "white",
        fontSize: 32
    }

})