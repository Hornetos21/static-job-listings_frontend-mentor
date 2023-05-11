import { ADD_POSITIONS } from './positions-actions.js'

export const positionsReducer = (state = [], action) => {
  if (action.type === ADD_POSITIONS) return action.jobs
  return state
}
