export function logIn(user) {
    return {
        type: 'LOG_IN',
        payload: user
    }
}

export function logOut() {
    return {
        type: 'LOG_OUT',
        payload: false
    }
}
