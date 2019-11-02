import * as types from '../types'
import axios from '../../utils/axios'

export const handleRooms = () => ({
  type: types.ROOMS,
  payload: axios.get(`/rooms`)
})