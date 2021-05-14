import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
//const uri=`http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC
const uri = 'https://conecta4-mobile.herokuapp.com'

async function getUsers() {
    let response = await fetch(`${uri}/api/getUsuarios`) // FOR TESTING ON MOBILe
    let data = await response.json()
    return data
}

async function addUser(info) {
    const res = await fetch(`${uri}/api/addUsuario`, {   // for mobile testing
        method:'post',
        headers:{ 'Content-type': 'application/json' },
        body:JSON.stringify(info)
    })
    const data = await res.json()

    if (data.msg === 1) {
        return true
    } return false
}
async function setOnlinePlayer (username) {
    const response = await fetch(`${uri}/api/setOnlineUser`,
        {
            method: "post",
            body: JSON.stringify({ "username": username }),
            headers: { 'Content-type': 'application/json' }
        }
    );
    const data = await response.json();
}

async function setOfflinePlayer (username) {
    const response = await fetch(`${uri}/api/setOfflineUser`,
        {
            method: "post",
            body: JSON.stringify({ "username": username }),
            headers: { 'Content-type': 'application/json' }
        }
    );
    const data = await response.json();
}



export {
    getUsers,
    addUser,
    setOnlinePlayer,
    setOfflinePlayer
}