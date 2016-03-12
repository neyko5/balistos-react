function chat(state = {
  messages: []
}, action){
    switch(action.type){
        case "SET_MESSAGES":
            return {
              ...state,
              messages: action.messages
            }
        case "RECIEVE_MESSAGE":
            const msg = {message: action.message, id_user: 1}
            return {
              ...state,
              messages: [...state.messages, msg]
            }
        default:
          return state;
    }
}

module.exports = chat;