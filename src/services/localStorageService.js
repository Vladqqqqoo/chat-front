const accessToken='ACCESS_TOKEN';
const refreshToken='REFRESH_TOKEN';
const userId='USER_ID';
const userName='USER_NAME';

export default class LocalStorageService {
    static setTokens(tokens) {
        console.log(tokens);
        localStorage.setItem(accessToken, tokens.jwt);
        localStorage.setItem(refreshToken, tokens.refreshToken);
        localStorage.setItem(userId, tokens.userId);
        localStorage.setItem(userName, tokens.userName);
    }

    static removeTokens(){
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        localStorage.removeItem(userId);
        localStorage.removeItem(userName);
    }
}

