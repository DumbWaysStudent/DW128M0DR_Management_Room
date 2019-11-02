import * as types from './../types'

const initialState = {
  data : [],
  isLoading : true,
  error: null
}

export const rooms = (state = initialState, action) => {
  switch (action.type) {
      case types.ROOMS_FULFILLED:
          state = {
            ...state, 
            data: action.payload.data
          }
          break
      default:
          state
          break
  }
  return state
}