import fetch from 'node-fetch'
import { Alert } from 'react-native'

//const baseURL = 'http://10.0.2.2:4000' 
const baseURL = 'http://localhost:4000'

/////// METODOS DENTRO DE SALA ////////

/* probar */
const anadirJugadorSalaBD = async (idSala, jugador) => {
    const url = baseURL + '/api/addPlayersRoom';
    const body = {
        "idSala": idSala,
        "jugador": jugador,
        "abandono": false
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        return json.msj;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
    }
}

/**/
const enviarInvitacion = async (idSala, invitador, invitado) => {
    const url = baseURL + '/api/addInvitacion';
    const body = { "idSala": idSala, "invitador": invitador, "invitado": invitado };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        return json.msj;
    } catch (error) {
        Alert.alert("No se ha podido envíar la invitación");
    }
}

/**/
const getUsuariosConectados = async () => {
    const url = baseURL + '/api/getOnlineUsers'
    try {
        const response = await fetch(url);
        let json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
    }
}

/////// METODOS FUERA DE SALA ////////

/**/
const crearSalaBD = async (anfitrion) => {
    const url = baseURL + '/api/addRoom';
    const body = {
        "anfitrion": anfitrion,
        "activa": true
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json(); // json={ msj: <1|0> }
        return json.msj;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
    }
}

/**/
const obtenerIdSala = async (username) => {
    const url = baseURL + '/api/getLastIdRoom'
    const body = { "username": username };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        console.log(json.id)
        return json.id;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
    }
}

/**/
const obtenerInfoUsuario = async (username) => {
    const url = baseURL + '/api/getUserInfo'
    const body = { "username": username };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        console.log(json)
        return json; /* { name: <name>, avatar_id: <id> } */
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
    }
}

const obtenerInvitacion = (jugador) => {
    const url = baseURL + '/api/getInvitation'
    const body = { "toplayer": jugador };
    var counter = setInterval(async () => {
        console.log("verificando si existen solicitudes...");
    }, 1000);
}

export {
    crearSalaBD,
    anadirJugadorSalaBD,
    enviarInvitacion,
    obtenerInvitacion,
    obtenerIdSala,
    obtenerInfoUsuario,
    getUsuariosConectados
};