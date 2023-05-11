export const ADD_TAG = 'ADD_TAG'
export const REMOVE_TAG = 'REMOVE_TAG'
export const CLEAR_TAGS = 'CLEAR_TAGS'

export const addTag = (tag) => ({
  type: ADD_TAG,
  tag,
})

export const deleteTag = (tag) => ({
  type: REMOVE_TAG,
  tag,
})

export const clearTags = {
  type: CLEAR_TAGS,
}
