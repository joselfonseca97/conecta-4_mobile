import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'sienna',
    },
    userText: {
        fontFamily: 'notoserif',
        fontSize: 20,
        marginLeft: 10,
        textAlign: 'left',
        color: 'white',
        backgroundColor: 'gray'
    },
    // Texto sala de juegos
    mainText: {
        fontFamily: 'monospace',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: 'sienna',
        color: 'white'
    },
    imageTable: {
        /* width: 100,
        height: 100, */
        marginBottom: 15,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    imageAvatarPrincipal: {
        height: 75,
        width: 75,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 5,
        marginBottom: 0,
        marginTop: 10,
        backgroundColor: 'azure'
    },
    textAvatarPrincipal: {
        fontFamily: 'notoserif',
        marginLeft: 15
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