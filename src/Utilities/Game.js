import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";
const { manifest } = Constants;
//const uri=`http://${manifest.debuggerHost.split(':').shift()}:4000`

async function createMatrix(n){
    //let response= await fetch(`${uri}/api/creatematrix`,{
        let response= await fetch(`http://localhost:4000/api/creatematrix`,{
        method:'post',
        headers:{ 'Content-type': 'application/json' },
        body:JSON.stringify({size:n})
    })
    if(response.status===200){
        const data = await response.json()
        return data
    }else{
        return false
    }
}
function buscarFondo(index,n,matrix) {
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



export{
    createMatrix,
    buscarFondo
}