import React, { Component } from 'react'
import { View, Text, Button, ImageBackground } from 'react-native'
import style from '../Styles/playerVSplayer_styles'
import Board from '../Components/PvsP_Board'
const fichaVacia = require('../Assets/fichaVacia.png')
const gameUtil = require('../Utilities/Game')
const backGroundImagen = require('../Assets/game_background.jpg')
const backImage = require('../Images/Ingame-Background.jpg')

export default class playerVSplayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player1: this.props.route.params.usuario,
            player2: "Jugador_2",
            winner: false,
            totalMinutes: 0,
            totalSeconds: 0,
            downSecond: 10,
            turn: this.props.route.params.usuario,
            turnColor: 1,
            matrix: [],
            size: this.props.route.params.size,
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
        console.log("res: " + res)
        this.setState({ matrix: res.matrix })
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
                    this.turnManager()
                }
                else {
                    this.setState({ downSecond: this.state.downSecond - 1 })
                }
            } else {
                console.log("Tiempo detenido")
            }
        }, 1000)
    }

    turnManager = () => {
        if (!this.state.winner) {
            if (this.state.turn == this.state.player1) {
                this.setState({ turn: this.state.player2, turnColor: 2 });
                this.setState({ downSecond: 10 })
            } else if (this.state.turn == this.state.player2) {
                this.setState({ turn: this.state.player1, turnColor: 1 });
                this.setState({ downSecond: 10 })
            }
        }
    }
    onFinishGame = () => {
        this.props.navigation.goBack()
    }
    buscarFondo = (index) => {
        let indice = gameUtil.buscarFondo(index, this.state.size, this.state.matrix)
        return indice
    }
    onMakeMove = (index) => {
        if (!this.state.winner) {
            let pos = this.buscarFondo(index)
            this.updateMatrix(pos, this.state.turnColor)
            this.checkWin()
            this.checkFullBoard()
            this.turnManager()
        }
    }
    updateMatrix = (indice, color) => {
        let aux = this.state.matrix
        aux[indice] = color
        this.setState({ matrix: aux })
    }
    checkWin = async () => {
        let res = await gameUtil.checkWin(this.state.turnColor, this.state.size, this.state.matrix)
        if (res) { // hay ganador
            this.setState({ winner: true, winnerName: this.state.turn })
            alert("Felicidades " + this.state.winnerName + " has ganado!")
            this.onFinishGame()
        }
    }
    checkFullBoard = () => {
        if (gameUtil.checkFullBoard(this.state.matrix, this.state.size)) {
            alert("Juego finalizado en empate!")
            this.onFinishGame()
        }
    }
    render() {
        return (
            <ImageBackground source={backGroundImagen} style={style.backGroundImage}>
                <View style={style.mainContainer}>
                    <View style={style.contentContainer}>
                        <View style={{ alignItems: 'center', marginBottom: 15 }}>
                            <Text style={style.turnText}>Turno de {this.state.turn}</Text>
                            <Text>{this.state.totalMinutes + ":" + this.state.totalSeconds}</Text>
                        </View>
                        <View style={style.boardContainer}>
                            <Board matrix={this.state.matrix} size={this.state.size} onMakeMove={this.onMakeMove} />
                        </View>
                        <View>
                            <Text style={style.downCounterText}>{this.state.downSecond}</Text>
                        </View>
                    </View>
                    <View style={style.backBtn}>
                        <Button title={"Salir"} color='red' onPress={this.onFinishGame} />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}
