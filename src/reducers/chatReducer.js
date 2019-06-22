import * as io from "socket.io-client";

const initialState = {
    room: '',
    socket: io('http://localhost:3000'),
    socketIsConnected: false
};

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'CONNECT_SOCKET': {
            state = {
                ...state,
                socketIsConnected: true,
                socket: action.payload
            };
            break;
        }
        default: {
            // console.log('default'); todo: smt with default
            break;
        }
    }
    return state
}
