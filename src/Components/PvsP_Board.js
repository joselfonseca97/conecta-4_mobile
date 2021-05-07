import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component, Fragment } from 'react'
import { View, Image, Text, FlatList } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
const fichaRoja = require('../Assets/fichaRoja.png')
const fichaAmarilla = require('../Assets/fichaAmarilla.png')
const fichaVacia = require('../Assets/fichaVacia.png')

var tam = 0
export default class PvsP_Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matrix: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            size: 3,
            ancho: 10
        }
    }
    //componentWillReceiveProps(nextProps) {
    //this.setState({ matrix: nextProps.matrix })
    //this.setState({ size: nextProps.size })
    //console.log(nextProps.size)
    //}
    componentDidMount() {
        this.setState({ ancho: (wp(100) / this.state.size) })
        tam = wp(100) / this.state.size
    }
    a = () => {
        console.log("hi")
    }
    imageStyleContainer = (options)=> {
        return {
            borderColor: 'green',
            borderWidth: 2,
            width: 35,
            height: 35
        }
    }
    render() {
        return (
            this.state.matrix.map((ima, index) => {
                if (ima == 0) { //if empty
                    if ((index+1) % this.state.size === 0) {
                        return (
                            <Fragment>
                                <TouchableHighlight onPress={this.a} style={this.imageStyleContainer()}>
                                    <Image
                                        style={{
                                            flex: 1,
                                            width: null,
                                            height: null,
                                            resizeMode: 'contain'
                                        }}
                                        source={fichaVacia}
                                    />
                                </TouchableHighlight>
                                <View style={{borderWidth:2,borderColor:'red'}}></View>
                                <Text>hbhb{'\n'}muhjv</Text>
                            </Fragment>
                        )
                    } else {
                        return (
                            <TouchableHighlight onPress={this.a} style={this.imageStyleContainer()}>
                                <Image
                                    style={{
                                        flex: 1,
                                        width: null,
                                        height: null,
                                        resizeMode: 'contain'
                                    }}
                                    source={fichaVacia}
                                />
                            </TouchableHighlight>
                        )
                    }
                }
            })
        )
    }
}