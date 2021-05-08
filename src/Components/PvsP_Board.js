import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component, Fragment } from 'react'
import { View, Image, Text, FlatList, Square } from 'react-native'
import { TouchableHighlight,TouchableOpacity } from 'react-native-gesture-handler'
const fichaRoja = require('../Assets/fichaRoja.png')
const fichaAmarilla = require('../Assets/fichaAmarilla.png')
const fichaVacia = require('../Assets/fichaVacia.png')

export default class PvsP_Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matrix: [],
            size: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ matrix: nextProps.matrix })
        this.setState({ size: nextProps.size })
    }
    componentDidMount() {
        this.setState({ size: this.props.size, matrix: this.props.matrix })
    }
    pressHandler(index) {
        this.props.onMakeMove(index)
    }

    render() {
        return (
            this.state.matrix.map((ima, index) => {
                if ((index % this.state.size === 0)) {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            {
                                new Array(this.state.size).fill(0).map((im, i) => {
                                    if (this.state.matrix[index + i] === 0) {
                                        return (<TouchableOpacity  key={i+1000} onPress={this.pressHandler.bind(this, index + i)} style={this.imageStyleContainer()}>
                                            <Image
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                                                source={fichaVacia}
                                            />
                                        </TouchableOpacity>)
                                    } else if (this.state.matrix[index + i] === 1) {
                                        return (<TouchableOpacity key={i+2000} onPress={this.pressHandler.bind(this, index + i)} style={this.imageStyleContainer()}>
                                            <Image
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                                                source={fichaRoja}
                                            />
                                        </TouchableOpacity>)
                                    } else {
                                        return (<TouchableOpacity  key={i+3000} onPress={this.pressHandler.bind(this, index + i)} style={this.imageStyleContainer()}>
                                            <Image
                                                style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                                                source={fichaAmarilla}
                                            />
                                        </TouchableOpacity>)
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
    imageStyleContainer = (options) => {
        let tam = (wp(90) / this.state.size)
        return {
            width: tam,
            height: tam,
            borderRadius:10,
            borderColor:'red',
            borderWidth:0.5
        }
    }
}