const initialState = {
    room: '',
    socket: null,
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
