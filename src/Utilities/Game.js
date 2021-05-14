import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000`

async function createMatrix(n) {
    let response = await fetch(`${uri}/api/creatematrix`, {
        //let response= await fetch(`http://localhost:4000/api/creatematrix`,{
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ size: n })
    })
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        return false
    }
}
function buscarFondo(index, n, matrix) {
    var total = (n * n) - 1; // total number of index

    // validate if current position is not used
    if (matrix[index] === 0) {
        while (matrix[index] === 0) {
            // validate if it's the last row
            if (index + n > total) {
                break;
            }
            // Validates if there is a file bellow
            if (matrix[index + n] !== 0) {
                break;
            }
            index += n; // Goes dowm in the matrix
        }
    } else {
        while (matrix[index] !== 0) {
            // validate if it's the first row
            if ((index - n) < 0) {
                break;
            }
            // Validates if there is not a file above
            if ((matrix[(parseInt(index) - n)] === 0)) {
                return (index - n);
            }
            index -= n; // Goes dowm in the matrix
        }
    }
    if (matrix[index] !== 0) {
        return -1; // The column is full
    }
    return index;
}
async function checkWin(color, size, matrix) {
    let res = await fetch(`${uri}/api/validateWin`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            size: size,
            matrix: matrix,
            color: color
        })
    })
    const data = await res.json()
    if (data.msg != 0) { //hay ganador
        return true
    } else {
        return false
    }
}

function checkFullBoard(matrix, size) {
    let tam = 0
    matrix.map((index) => {
        if (index != 0) {
            tam = tam + 1
        }
    })
    if (tam == size * size) {
        return true
    } else {
        return false
    }
}
async function IAMove(matrix, n, cpuColor, rivalColor, level) {
    let res = await fetch(`${uri}/api/nextMoveIA`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            matrix: matrix,
            n: parseInt(n),
            cpuColor: cpuColor,
            rivalColor: rivalColor,
            level: level
        })
    })
    let data = await res.json()
    return data.msg
}

async function getLastIdGame(name) {
    let res = await fetch(`${uri}/api/getLastIdGame`, {
        method: 'post',
        body: JSON.stringify({ "player": name }),
        headers: { 'Content-type': 'application/json' }
    })
    let data = await res.json()
    return data
}
async function getInitialInfo(idGame) {
    let res = await fetch(`${uri}/api/getInitialInfo`, {
        method: 'post',
        body: JSON.stringify({
            'idGame': idGame
        }),
        headers: { 'Content-type': 'application/json' }
    })
    let data = await res.json()
    return data
}
async function changeTurnDB(idGame) {
    await fetch(`${uri}/api/changeTurn`, {
        method: 'post',
        body: JSON.stringify({ 'idGame': idGame }),
        headers: { 'Content-type': 'application/json' }
    })
}

async function getMatrix(idGame) {
    let res = await fetch(`${uri}/api/getMatrix`, {
        method: 'post',
        body: JSON.stringify({ 'idGame': idGame }),
        headers: { 'Content-type': 'application/json' }
    })
    let data = await res.json()
    return data
}
async function thereIsAWinner(idGame) {
    let res = await fetch(`${uri}/api/thereIsAWinner`, {
        method: 'post',
        body: JSON.stringify({ 'idGame': idGame }),
        headers: { 'Content-type': 'application/json' }
    })
    let data = await res.json()
    return data.winner
}
async function finishGame(idGame) {
    let res = await fetch(`${uri}/api/finishgame`, {
        method: 'post',
        body: JSON.stringify({ 'idGame': idGame }),
        headers: { 'Content-type': 'application/json' }
    })
}
async function getTurnAndStillPlaying(idGame) {
    let res = await fetch(`${uri}/api/getTurnAndStillPlaying`, {
        method: 'post',
        body: JSON.stringify({ 'idGame': idGame }),
        headers: { 'Content-type': 'application/json' }
    })
    let data = await res.json()
    //let dato= data.turnColor
    return data
}

async function insertCheckerDB(idGame, index) {
    await fetch(`${uri}/api/insertChecker`, {
        method: 'post',
        body: JSON.stringify({
            "idGame": idGame,
            "index": index
        }),
        headers: { 'Content-type': 'application/json' }
    })
}
async function setWinnerDB(idGame, name) {
    await fetch(`${uri}/api/setWinner`, {
        method: 'post',
        body: JSON.stringify({
            "idGame": idGame,
            "name": name
        }),
        headers: { 'Content-type': 'application/json' }
    })
}

export {
    createMatrix,
    buscarFondo,
    checkWin,
    checkFullBoard,
    IAMove,
    getLastIdGame,
    getInitialInfo,
    changeTurnDB,
    getMatrix,
    thereIsAWinner,
    getTurnAndStillPlaying,
    insertCheckerDB,
    finishGame,
    setWinnerDB

}