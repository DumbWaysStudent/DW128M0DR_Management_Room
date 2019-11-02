import * as types from '../types'
import axios from '../../utils/axios'

export const handleCustomers = () => ({
  type: types.CUSTOMERS,
  payload: axios.get(`/customers`)
})

export const addCustommers = () => ({
  type: types.ADD_CUSTOMERS,
  payload: axios({
    method: 'POST',
    url: '/customer',
    // headers: { 'Authorization': `Bearer ${this.state.token}` },
    data
  })
})