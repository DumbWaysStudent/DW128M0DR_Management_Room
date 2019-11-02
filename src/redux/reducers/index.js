import { combineReducers } from 'redux'

import {login} from './login'
import {rooms} from './rooms'
import {customers} from './customers'
import {checkin} from './checkin'

const rootReducers = combineReducers({
    rooms,
    customers,
    checkin
})

export default rootReducers