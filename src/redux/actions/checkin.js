import * as types from '../types'
import axios from '../../utils/axios'

export const handleCheckin = () => ({
  type: types.CHECKIN,
  payload: axios.get(`/checkin`)
})