import React, { Component } from 'react'
import { View, Text, Button, Image } from 'react-native'
const gameUtil = require('../Utilities/Game')
import style from '../Styles/playerVSplayer_styles'
import Board from '../Components/PvsP_Board'
import { TouchableHighlight } from 'react-native-gesture-handler'
const fichaVacia = require('../Assets/fichaVacia.png')

export default class playerVSplayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player1: "",
            player2: "",
            winner: false,
            totalMinutes: 0,
            totalSeconds: 0,
            downSecond: 10,
            turn: "",
            turnColor: "",
            matrix: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            size: 3,
            winnerName: ""
        }
        this.counter = null  // timer for playtime
        this.downCounter = null // timer for turns
    }
    componentDidMount() {
        this.createMatrix()
        this.startTotalTimer()
        this.startTurnTimer()
    }

    createMatrix = async () => {
        let res = await gameUtil.createMatrix(this.state.size)
        this.setState({ matrix: res })
    }

    startTotalTimer = () => { //TOTAL PLAYTIME
        this.counter = setInterval(() => {
            if (!this.state.winner) { //Time pauses if there is a winner

                if (this.state.totalSeconds === 59) {
                    this.setState({ totalMinutes: this.state.totalMinutes + 1 })
                    this.setState({ totalSeconds: 0 })
                }
                else {
                    this.setState({ totalSeconds: this.state.totalSeconds + 1 })
                }
            } else {
                console.log("Tiempo detenido")
            }
        }, 1000)
    }

    startTurnTimer = () => { //TOTAL PLAYTIME
        this.downCounter = setInterval(() => {
            if (!this.state.winner) { //Time pauses if there is a winner

                if (this.state.downSecond === 0) {
                    //cambiar turno
                    //reiniciar 
                }
                else {
                    this.setState({ downSecond: this.state.downSecond - 1 })
                }
            } else {
                console.log("Tiempo detenido")
            }
        }, 1000)
    }

    buscarFondo = (index) => {
        indice = gameUtil.buscarFondo(index, this.state.size, this.state.matrix)
        return indice
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <View style={{marginBottom:4}}>
                    <Button
                        title="for Testing"
                        onPress={() => console.log(this.state.matrix)}
                    />
                </View>
                <View style={{borderColor:'red',borderWidth:1,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                    <Board matrix={this.state.matrix} size={this.state.size} />
                </View>
               {/*  <Text>{this.state.totalMinutes + ":" + this.state.totalSeconds}</Text>
                <Text>{this.state.downSecond}</Text> */}
            </View>
        )
    }
}
