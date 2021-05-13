import React from 'react'
import { View, Button, Text, ImageBackground } from 'react-native'
import { Component } from 'react'
import Board from '../Components/PvsP_Board'
import style from '../Styles/PlayerVSpc_styles'
const gameUtil = require('../Utilities/Game')
const backGroundImagen = require('../Assets/game_background.jpg')


export default class PlayerVSpc extends Component {

    constructor(props) {
        super(props)
        this.state = {
            player1: this.props.route.params.usuario,
            player2: 'Computadora',
            winner: false,
            winnerName: '',
            size: this.props.route.params.size,
            matrix: [],
            totalSeconds: 0,
            totalMinutes: 0,
            downSeconds: 10,
            turn: this.props.route.params.usuario,
            turnColor: 1,
        }
        this.counter = null  // timer for playtime
        this.downCounter = null // timer for turns
    }
    componentDidMount() {
        this.createMatrix()
        this.startTotalTimer()
        this.startTurnTimer()
    }
    onFinishGame = () => {
        this.setState({winner:true})
        this.props.navigation.replace('MenuPrincipal', { usuario: this.state.player1 })
    }
    createMatrix = async () => {
        let res = await gameUtil.createMatrix(this.state.size)
        this.setState({ matrix: res.matrix })
    }
    updateMatrix = (indice, color) => {
        let aux = this.state.matrix
        aux[indice] = color
        this.setState({ matrix: aux })
    }

    turnManager = () => {
        if (!this.state.winner) {
            if (this.state.turn == this.state.player1) { // change turn to PC
                this.setState({ turn: this.state.player2, turnColor: 2, downSeconds: 10 })
                this.onPcMove()
            } else if (this.state.turn == this.state.player2) {
                this.setState({ turn: this.state.player1, turnColor: 1, downSeconds: 10 })
            }
        }
    }


    buscarFondo = (index) => {
        let indice = gameUtil.buscarFondo(index, this.state.size, this.state.matrix)
        return indice
    }
    onMakeMove = (index) => {
        console.log("llega index: " + index)
        if (!this.state.winner) {
            if (this.state.turn == this.state.player1) { // if its player1's turn
                this.onPlayerMove(index)
            }
        }else{
            alert("El juego ha concluido, preciona SALIR")
        }
    }
    onPlayerMove = (index) => {
        let pos = this.buscarFondo(index)
        this.updateMatrix(pos, this.state.turnColor)
        this.checkWin(this.state.turn, this.state.turnColor)
        this.checkFullBoard()
        this.turnManager()
    }
    onPcMove = async () => {
        if (!this.state.winner) {
            let pos = await gameUtil.IAMove(this.state.matrix, this.state.size, 2, 1, "L1")
            if (pos != -1) {
                this.updateMatrix(pos, 2)
                this.checkWin(this.state.turn, this.state.turnColor)
                this.checkFullBoard()
                this.turnManager()
            }else{
                console.log("respuesta de IA: "+pos)
            }
        }
    }
    checkWin = async (win, color) => {
        let res = await gameUtil.checkWin(color, this.state.size, this.state.matrix)
        if (res) { // hay ganador
            this.setState({ winner: true, winnerName: win })
            alert("Felicidades " + this.state.winnerName + " has ganado!")
        }
    }
    checkFullBoard() {
        if (gameUtil.checkFullBoard(this.state.matrix, this.state.size)) {
            alert("Juego finalizado en empate!")
            this.onFinishGame()
        }
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
            }
        }, 1000)
    }

    startTurnTimer = () => { //TOTAL PLAYTIME
        this.downCounter = setInterval(() => {
            if (!this.state.winner) { //Time pauses if there is a winner
                if (this.state.downSeconds === 0) {
                    this.turnManager()
                }
                else {
                    this.setState({ downSeconds: this.state.downSeconds - 1 })
                }
            }
        }, 1000)
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
                            <Text style={style.downCounterText}>{this.state.downSeconds}</Text>
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
