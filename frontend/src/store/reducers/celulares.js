const initialState = {
    celulares: [{}]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "CELULAR_ALTERADO":
            return {
                celulares : action.payload
            }
        default:
            return state
    }
}