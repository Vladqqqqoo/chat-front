const accessToken='ACCESS_TOKEN';
const refreshToken='REFRESH_TOKEN';
const idUser='ID_USER';

export default class LocalStorageService {
    static setTokens(tokens) {
        localStorage.setItem(accessToken, tokens.jwt);
        localStorage.setItem(refreshToken, tokens.refreshToken);
        localStorage.setItem(idUser, tokens.userId);
    }

    static removeTokens(){
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        localStorage.removeItem(idUser);
    }
}

