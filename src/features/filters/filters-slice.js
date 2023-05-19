import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: '@@filters',
  initialState: [],
  reducers: {
    addTag: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload)
      }
    },
    removeTag: (state, action) => {
      return state.filter((tag) => tag !== action.payload)
    },
    clearTags: () => [],
  },
})

export const { addTag, clearTags, removeTag } = filtersSlice.actions

export const tagReducer = filtersSlice.reducer

export const selectTags = (state) => state.tags
