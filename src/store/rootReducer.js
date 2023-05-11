import { combineReducers } from 'redux'
import { positionsReducer } from './positions/positions-reducers.js'
import { tagsReducer } from './tags/tags-reducers.js'

export const rootReducer = combineReducers({
  jobs: positionsReducer,
  tags: tagsReducer,
})
