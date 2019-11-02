import * as types from './../types'

const initialState = {
  data : [],
  isLoading : true,
  error: null
}

export const login = (state = initialState, action) => {
  switch (action.type) {
      case 'LOGIN_FULFILLED':
          state = {
            ...state, 
            data : action.payload.data
          }
          break
      default:
          state
          break
  }
  return state
}