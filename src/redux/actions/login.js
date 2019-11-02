import * as types from '../types'
import axios from '../../utils/axios'

export const handleLogin = () => ({
  type: types.LOGIN,
  payload: axios.get(`/signin`)
})