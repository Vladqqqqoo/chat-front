export default function chatReducer(state = {
    user: '',
    room: ''
}, action) {
    switch (action.type) {
        case 'CONNECT': {
            state = {
                ...state,
                socket: action.payload
            }
        }
    }
}
