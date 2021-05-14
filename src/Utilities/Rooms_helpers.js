import fetch from 'node-fetch'
import { Alert } from 'react-native'
import Constants from "expo-constants";

const { manifest } = Constants;

//const baseURL = `http://${manifest.debuggerHost.split(':').shift()}:4000`
const baseURL = 'https://conecta4-mobile.herokuapp.com'

/////// METODOS DENTRO DE SALA ////////

/**/
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
        return json.msg;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
        return 0;
    }
}

/* invitacion a sala */
const enviarInvitacionBD = async (idSala, invitador, invitado) => {
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
        return json.msg;
    } catch (error) {
        Alert.alert("No se ha podido envíar la invitación");
        return 0;
    }
}

/**/
const getUsuariosConectados = async (username) => {
    const url = baseURL + '/api/getOnlineUsers'
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
        return json;
    } catch (error) {
        Alert.alert("A ocurrido un error inesperado");
        return null;
    }
}

/**/
const getUsuariosEnSalaBD = async (idSala, username) => { /* username es para no retornar el mismo */
    const url = baseURL + '/api/getUsuariosEnSala'
    const body = {
        "idSala": idSala,
        "username": username
    }
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
        return null;
    }
}

/**/
const salirDeSalaBD = async (idSala, username) => {
    const url = baseURL + '/api/deleteUserFromRoom';
    const body = { "idSala": idSala, "username": username };
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
        return json.deleted;
    } catch (error) {
        Alert.alert("No se ha podido cerrar la sala");
        return 0
    }
}

/* probar */
const borrarSalaBD = async (idSala) => {
    const url = baseURL + '/api/deleteRoom';
    const body = { "idSala": idSala };
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
        return json.deleted;
    } catch (error) {
        Alert.alert("No se ha podido cerrar la sala");
        return 0
    }
}

/**/
const crearSessionBD = async (idSala, jugador1, jugador2) => {
    const url = baseURL + '/api/addSessions';
    const body = { "idSala": idSala, "jugador1": jugador1, "jugador2": jugador2 };
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
        return json.msg;
    } catch (error) {
        Alert.alert("No se pudo crear la sesión");
        return 0;
    }
}

/**/
const eliminarSessionBD = async (idSala, jugador1, jugador2) => {
    const url = baseURL + '/api/deleteSession';
    const body = { "idSala": idSala, "jugador1": jugador1, "jugador2": jugador2 };

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
        return json.msg;
    } catch (error) {
        Alert.alert("No se ha podido eliminar la sesión");
        return 0;
    }
}

/***/
const getInvSesionesBD = async (idSala, jugador) => {
    const url = baseURL + '/api/getInvitacionesSesiones';
    const body = { "idSala": idSala, "jugador": jugador };

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
        Alert.alert("No se ha podido actualizar las invitaciones");
        return 0;
    }
}

/**/
const getSesionActivaBD = async (idSala, jugador1, jugador2) => {
    const url = baseURL + '/api/getSesionActiva'
    const body = { "idSala": idSala, "jugador1": jugador1, "jugador2": jugador2 }
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
        return json.activa;
    } catch (error) {
        return 0;
    }
}

const activarSesionBD = async (estado, idSala, jugador1, jugador2) => {
    const url = baseURL + '/api/activarSesion'
    const body = {
        "estado": estado, "idSala": idSala,
        "jugador1": jugador1, "jugador2": jugador2
    }
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
        console.log(json);
        return json.estado;
    } catch (error) {
        return 0;
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
const obtenerIdSalaBD = async (username) => {
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
        return json.msg;
    } catch (error) {
        Alert.alert("No se ha podido eliminar la invitación");
        return 0;
    }
}

export {
    crearSalaBD,
    anadirJugadorSalaBD,
    enviarInvitacionBD,
    obtenerInvitacionesBD,
    obtenerIdSalaBD,
    borrarSalaBD,
    obtenerInfoUsuarioBD,
    getUsuariosConectados,
    salirDeSalaBD,
    eliminarInvitacionBD,
    getUsuariosEnSalaBD,
    /* sesiones */
    crearSessionBD,
    eliminarSessionBD,
    getInvSesionesBD,
    getSesionActivaBD,
    activarSesionBD
};