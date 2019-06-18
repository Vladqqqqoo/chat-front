export default function authReducer(
    state = {user: '', isAuthorized: false}, action
) {
    switch (action.type) {
        case 'LOG_IN': {
            state = {
                user: action.payload.userId,
                isAuthorized: true
            };
            break;
        }
        case 'LOG_OUT': {
            state = {
                user: '',
                isAuthorized: false
            };
            break;
        }
        case 'SIGN_UP_FULFILLED': {
            break;
        }
        default: {
            //todo: smt with default case
            break;
        }
    }
    return state;
}
