import { createStore } from 'redux'
import rootReducers from './reducers'
import {middleware} from './middelware'

const store = createStore(
    rootReducers, middleware 
)

export default store