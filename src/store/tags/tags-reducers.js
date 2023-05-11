import { ADD_TAG, CLEAR_TAGS, REMOVE_TAG } from './tags-actions.js'

export const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TAG:
      return !state.includes(action.tag) ? [...state, action.tag] : state
    case REMOVE_TAG:
      return state.filter((item) => item !== action.tag)
    case CLEAR_TAGS:
      return []
    default:
      return state
  }
}
