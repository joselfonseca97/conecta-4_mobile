import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component, Fragment } from 'react'
import { View, Image, Text, FlatList, Square } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
const fichaRoja = require('../Assets/fichaRoja.png')
const fichaAmarilla = require('../Assets/fichaAmarilla.png')
const fichaVacia = require('../Assets/fichaVacia.png')
var tam = 0

export default class PvsP_Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matrix: [0, 0, 2, 0, 0, 0, 0, 0, 1],
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
    imageStyleContainer = (options) => {
        return {
            width: 35,
            height: 35
        }
    }

    render() {
        return (
            this.state.matrix.map((ima, index) => {
                if (index % this.state.size === 0) {
                    return (
                        <View style={{flexDirection: 'row'}}>
                            {
                                new Array(this.state.size).fill(0).map((im, i) => {
                                    if (this.state.matrix[index + i] === 0) {
                                        return (<TouchableHighlight pos={index + i} key={(index * i) + (300 * i)} onPress={this.a} style={this.imageStyleContainer()}>
                                            <Image
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                                                source={fichaVacia}
                                            />
                                        </TouchableHighlight>)
                                    } else if (this.state.matrix[index + i] === 1) {
                                        return (<TouchableHighlight pos={index + i} key={(index * i) + (300 * i)} onPress={this.a} style={this.imageStyleContainer()}>
                                            <Image
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                                                source={fichaRoja}
                                            />
                                        </TouchableHighlight>)
                                    } else {
                                        return (<TouchableHighlight pos={index + i} key={(index * i) + (300 * i)} onPress={this.a} style={this.imageStyleContainer()}>
                                            <Image
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                                                source={fichaAmarilla}
                                            />
                                        </TouchableHighlight>)
                                    }
                                })
                            }
                        </View>
                    )
                }
            }
            )
        )
    }
}