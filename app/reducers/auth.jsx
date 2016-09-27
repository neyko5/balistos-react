function auth(state = {
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    logged_in: localStorage.getItem('token')?true:false,
    user_id: parseInt(localStorage.getItem('user_id')) || null
}, action){
    switch(action.type){
        case "AUTH_SET_FROM_STORAGE":
            return {
                ...state,
                token: action.token,
                username: action.username,
                user_id: action.user_id,
                logged_in: true
            };
        case "LOG_OUT":
          localStorage.clear();
          return {};
        case "SET_LOGIN_ERROR":
            return {
                login_error: action.message,
                register_error: undefined
            }
        case "SET_REGISTER_ERROR":
            return {
                register_error: action.message,
                login_error: undefined
            }
        case "POST_LOGIN":
            return {
            ...state,
                username: action.username,
                token: action.token,
                user_id: action.user_id,
                logged_in: true,
                register_error: undefined,
                login_error: undefined
            }
        default:
          return state;
    }
}

module.exports = auth;
