import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
const uri=`http://${manifest.debuggerHost.split(':').shift()}:4000`

async function getUsers() {
    //let response =await fetch('http://localhost:4000/api/getUsuarios')  //FOR TESTING ON PC
    let response = await fetch(`${uri}/api/getUsuarios`) // FOR TESTING ON MOBILe
    let data = await response.json()
    return data
}

async function addUser(info) {
    const res = await fetch(`${uri}/api/addUsuario`, {
        method:'post',
        headers:{ 'Content-type': 'application/json' },
        body:JSON.stringify(info)
    })
    const data = await res.json()

    if (data.msg === 1) {
        return true
    } return false
}


export {
    getUsers,
    addUser
}