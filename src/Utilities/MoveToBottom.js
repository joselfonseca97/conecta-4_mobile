import React from 'react'
import { View, StyleSheet } from 'react-native'

function MoveToBottom(component) {
    return (
        <View style={style.container}>
            {component}
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})

export default MoveToBottom