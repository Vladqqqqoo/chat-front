export default function authReducer(
    state = {user: ''}, action
) {
    switch (action.type) {
        case 'SET_USERNAME': {
            state = {
                ...state,
                user: action.payload
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
