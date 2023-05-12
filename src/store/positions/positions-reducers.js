import { ADD_POSITIONS, SET_ERROR, SET_LOADING } from './positions-actions.js'

const initialState = {
  status: 'idle',
  list: [],
  error: null,
}

export const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSITIONS:
      return {
        ...state,
        list: action.jobs,
        status: 'fulfilled',
      }
    case SET_ERROR:
      return {
        ...state,
        status: 'rejected',
        error: action.err,
      }
    case SET_LOADING:
      return {
        ...state,
        status: 'loading',
        error: null,
      }
    default:
      return state
  }
}
