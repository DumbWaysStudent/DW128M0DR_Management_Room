import * as types from './../types'

const initialState = {
  data : [],
  isLoading : true,
  error: null
}

export const customers = (state = initialState, action) => {
  switch (action.type) {
      case types.CUSTOMERS_FULFILLED:
          return {
            ...state, 
            data: action.payload.data
          }
      case "SET_CUSTOMERS":
          return {
            ...state,
            data:action.payload
          }
      case "SEARCH_CUSTOMERS":
        return {
          ...state,
          data:action.payload
        }
      default:
          return state
  }
  // return state
}