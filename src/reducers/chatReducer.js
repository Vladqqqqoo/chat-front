export default function chatReducer(state = {
    username: '',
    room: '',
    socket: '',
}, action) {
    switch (action.type) {
        case 'CONNECT_SOCKET': {
            state = {
                ...state,
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
