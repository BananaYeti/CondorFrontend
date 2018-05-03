export const actionTypes = {
    LOGIN:'LOGIN',
    LOGOUT:'LOGOUT'
}

export const login = (username, token) => ({
    type:actionTypes.LOGIN,
    username,
    token
});

export const logout = () => ({
    type:actionTypes.LOGOUT
});
