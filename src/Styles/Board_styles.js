import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    a : {
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain'
    },
    b: {
        borderColor:'green',
        borderWidth:2,
        width:50,
        height:50
    }
})