const initialState = {
    id: [],
    marca: [],
    modelo: [],
    memoria:[],
    lancamento: [],
}


export default function(state = initialState, action) { // reducer sempre recebe estado anterior e uma action
    switch(action.type) {
        case 'ID_ALTERADO':
            return {
                ...state,
                id: action.payload
            }
        case 'MARCA_ALTERADA':
            return {
                ...state,
                marca: action.payload
            }
        case 'MODELO_ALTERADO':
            return {   
                ...state,
                modelo: action.payload
            }
        case 'MEMORIA_ALTERADA':
            return {
                ...state,
                memoria: action.payload
            }
        case 'LANCAMENTO_ALTERADO':
            return {
                ...state,
                lancamento: action.payload
            }
        default:           
            return state
    }
}