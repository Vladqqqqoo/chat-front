const initialState = {
    userId: localStorage.getItem('USER_ID'),
    userName: localStorage.getItem('USER_NAME'),
    isAuthorized: !!localStorage.getItem('ACCESS_TOKEN')
};

export default function authReducer(
    state = initialState, action
) {
    switch (action.type) {
        case 'LOG_IN': {
            state = {
                ...state,
                userName: action.payload.userName,
                userId: action.payload.userId,
                isAuthorized: true
            };
            break;
        }
        case 'LOG_OUT': {
            state = {
                ...state,
                userId: '',
                userName: '',
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
