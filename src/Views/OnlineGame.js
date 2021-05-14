import React from 'react'
import { Component } from 'react';
import { View, Text, ImageBackground, Button } from 'react-native'
import Board from '../Components/PvsP_Board'
const gameUtil = require('../Utilities/Game')
import style from '../Styles/playerVSplayer_styles'
const backGroundImagen = require('../Assets/game_background.jpg')


export default class OnlineGame extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idGame: 0,
            player1: '',
            player2: '',
            turn: '',
            myColor: 0,
            myName: this.props.route.params.username,
            turnColor: 0,
            matrix: '',
            n: 7,
            iFinished: false,
            totalMinutes: 0,
            totalSeconds: 0,
            downSeconds: 10,
            winner: false,
            matrixNum: []
        }
    }
    componentDidMount() {
        this.getConfigurationGame()
    }

    updateMatrixNum = (indice, color) => {
        let aux = this.state.matrixNum
        aux[indice] = color
        this.setState({ matrixNum: aux })
    }
    buscarFondo = (index) => {
        let indice = gameUtil.buscarFondo(index, this.state.size, this.state.matrix)
        return indice
    }

    createMatrix = async () => {
        let res = await gameUtil.createMatrix(this.state.n)
        this.setState({ matrixNum: res.matrix })

    }
    getConfigurationGame = async () => {
        let idGame = await gameUtil.getLastIdGame(this.state.myName)
        this.setState({ idGame: idGame.id })
        let initialData = await gameUtil.getInitialInfo(idGame.id)
        this.setState({ player1: initialData.player1 })
        this.setState({ player2: initialData.player2 }),
            this.setState({ turnColor: initialData.turnColor }),
            this.setState({ matrix: initialData.matrix }),
            this.setState({ n: initialData.n })

        //color
        if (this.state.myName == initialData.player1) {
            this.setState({ myColor: initialData.colorP1 })
        } else {
            this.setState({ myColor: initialData.colorP2 })
        }
        //turn
        if (initialData.turnColor == this.state.myColor) {
            this.setState({ turn: this.state.myName })
        } else {
            if (initialData.player1 == this.state.myName) {
                this.setState({ turn: initialData.player2 })
            } else {
                this.setState({ turn: initialData.player1 })
            }
        }
        this.createMatrix()
        this.startTotalTimer()
        this.startTurnTimer()
        this.updateTurn()
    }
    updateTurn=()=> {
        let autoUpdate = setInterval(async () => {
            if (this.state.winner) {
                clearInterval(autoUpdate)
                return
            }

            let winner = await gameUtil.thereIsAWinner(this.state.idGame)

            let msj = ''

            if (winner == "abandone") {
                await gameUtil.finishGame(this.state.idGame)
                this.setState({ winner: true })

                if (this.setState.player1 === this.state.myName) {
                    msj = this.state.player2
                } else {
                    msj = this.state.player1
                }
                alert(msj + " abandonó la partida")
                return
            }
            if (winner == "empate") {
                this.setState({ winner: true })
                await gameUtil.finishGame(this.state.idGame)
                alert("Juego finalizado en empate")
                return
            }
            if (winner !== "no") {
                this.setState({ winner: true })
                await gameUtil.finishGame(this.state.idGame)

                if (winner == this.state.myName) {
                    alert("Felicidades " + winner + " ha ganado la partida")
                } else {
                    alert("Usted ha perdido la partida")
                }
                return
            }

            let data = await gameUtil.getTurnAndStillPlaying(this.state.idGame)
            console.log(data.turnColor)
            //let turnDB = data.turnColor
            //if (this.state.turnColor !== turnDB) {
               // this.changeTurnLocally()
            //}

        }, 5000)
    }

    changeTurnLocally() {
        (this.state.turnColor == this.state.player1) ? this.setState({ turn: this.state.player2 }) : this.setState({ turn: this.player1 })
            (this.state.turnColor == 1) ? this.setState({ turnColor: 2 }) : this.setState({ turnColor: 1 })
        this.setState({ downSeconds: 10 })
    }
    startTotalTimer = () => { //TOTAL PLAYTIME
        let counter = setInterval(() => {
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
        let downCounter = setInterval(async () => {
            if (!this.state.winner) { //Time pauses if there is a winner
                if (this.state.downSeconds === 0) {
                    await gameUtil.changeTurnDB(this.state.idGame)
                }
                else {
                    this.setState({ downSeconds: this.state.downSeconds - 1 })
                }
            }
        }, 1000)
    }

    onMakeMove = async (index) => {
        if (!this.state.winner) {
            let fondo = gameUtil.buscarFondo(index, this.state.n, this.state.matrixNum)
            //this.update(index)
        }
    }

    update = async (index) => {
        let bool = await this.insertChecker(index)
        if (bool && !this.state.winner) {
            let data = await gameUtil.getMatrix(this.state.idGame)
            let win = await gameUtil.checkWin(this.state.myColor, this.state.n, this.state.matrixNum)
            if (win) {
                this.setState({ winner: true })
            }
        }
    }
    async insertChecker(index) {
        if (this.state.winner) {
            alert("Juego finalizado")
            return false;
        }
        if (index === -1) {
            alert("Columna llena")
            return false;
        }

        this.isBlock = true;
        var idGame = this.state.idGame
        // Validates if it is the turn of the local player
        if (this.state.turnColor === this.state.myColor) {
            this.changeTurnLocally();
            // insert checker in the index, automatically changes the turnColor in DB
            await gameUtil.insertCheckerDB(idGame, index);
            this.isBlock = false;
            return true;
        }
        alert("Es el turno de " + this.state.turn)
        return false
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
                            <Board matrix={this.state.matrixNum} size={this.state.n} onMakeMove={this.onMakeMove} />
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