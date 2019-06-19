import * as io from 'socket.io-client';


export function connectSocket() {
    return dispatch => {
        const socket = io('http://localhost:3000');
        dispatch({
            type: 'CONNECT_SOCKET',
            payload: socket
        })
    }
}
