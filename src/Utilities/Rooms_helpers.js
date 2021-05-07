import fetch from 'node-fetch'
import { Alert } from 'react-native'

const baseURL = 'http://10.0.2.2:4000'
//const baseURL = 'http://localhost:4000'

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
        return 0;
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
        return { "error": 0 }
    }
}

/**/
const cerrarSalaBD = async (id) => {
    const url = baseURL + '/api/deleteRoom';
    const body = { "id": id };
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
        Alert.alert("No se ha podido cerrar la sala");
        return 0
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
        return json.msg;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado al crear la sala");
        return 0;
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
        return json.id;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado al obtener id sala");
        return -1;
    }
}

/**/
const obtenerInfoUsuarioBD = async (username) => {
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
        return json; /* { name: <name>, avatar_id: <id> } */
    } catch (error) {
        //Alert.alert("A ocurrido un error inesperado al obtener información del usuario");
        return null
    }
}

/**/
const obtenerInvitacionesBD = async (usuario) => {
    const url = baseURL + '/api/getInvitations'
    const body = { "invitado": usuario };
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
        return json;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
        return null
    }
}

/**/
const eliminarInvitacionBD = async (idSala, invitador, invitado) => {
    const url = baseURL + '/api/deleteInvitation2';
    const body = { "id": idSala, "invitador": invitador, "invitado": invitado };
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json();
        return json.msj;
    } catch (error) {
        Alert.alert("No se ha podido eliminar la invitación");
        return 0;
    }
}

export {
    crearSalaBD,
    anadirJugadorSalaBD,
    enviarInvitacion,
    obtenerInvitacionesBD,
    obtenerIdSala,
    obtenerInfoUsuarioBD,
    getUsuariosConectados,
    cerrarSalaBD,
    eliminarInvitacionBD
};