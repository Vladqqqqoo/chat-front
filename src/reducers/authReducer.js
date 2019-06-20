export default function authReducer(
    state = {username: '', isAuthorized: !!localStorage.getItem('ACCESS_TOKEN')}, action
    // state = {username: '', isAuthorized: false, }, action
) {
    switch (action.type) {
        case 'LOG_IN': {
            state = {
                ...state,
                username: action.payload.userId,
                isAuthorized: true
            };
            break;
        }
        case 'LOG_OUT': {
            state = {
                ...state,
                username: '',
                isAuthorized: action.payload
            };
            break;
        }
        default: {
            //todo: smt with default case
            break;
        }
    }
    return state;
}
