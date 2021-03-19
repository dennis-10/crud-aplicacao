import { createStore, combineReducers } from 'redux'

import celular from './reducers/celular'
import celulares from './reducers/celulares'

//store
const reducers = combineReducers({
    celular: celular,
    celulares: celulares
})


// Gera store dos reducers
function storeConfig() {
    return createStore(reducers)
}

export default storeConfig