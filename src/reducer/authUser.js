let initialState = {
    user: {
        email: "",
        password: "",
        isAuthenticated: false
    },
    error: ""
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            console.log('LOGIN')
            console.log('action.payload:', action.payload)
            state.user.email = action.payload.email
            state.user.password = action.payload.password
            state.user.isAuthenticated = true
            state.error = ''
            break;
        case "LOGIN_FAIL":
            state.error = action.payload
            break;
        default:
            return { ...state }
    }
    return { ...state }
}

export default reducer