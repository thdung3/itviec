function login(user) {
    return { type: "LOGIN", payload: user }
}

function loginFail(message) {
    return { type: "LOGIN_FAIL", payload: message }
}

function loginMiddleware(user) {
    return (dispatch) => {
        try {
            if (!user.email || !user.password) {
                dispatch(loginFail("Login fail"))
            } else {
                dispatch(login(user))
            }
        } catch (err) {

        }
    }
}

export default loginMiddleware