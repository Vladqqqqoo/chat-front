export function setTokens(tokens) {
    localStorage.setItem('ACCESS_TOKEN', tokens.jwt);
    localStorage.setItem('REFRESH_TOKEN', tokens.refreshToken);
    localStorage.setItem('ID_USER', tokens.userId);
}
