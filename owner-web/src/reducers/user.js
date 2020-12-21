
const initialState = {
    currentUser: {}
}

const userReducer = (state = initialState, action) => {
    console.log("User reducer");
    switch (action.type) {
        case 'ADD_USER': {
            return {
                ...state,
                currentUser: action.payload
            }
        }
        case 'LOG_OUT': {
            return {
                ...state,
                currentUser: action.payload
            }
        }
        default: return state
    }
}

export default userReducer;