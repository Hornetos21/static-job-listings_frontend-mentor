import { configureStore } from '@reduxjs/toolkit'
import { tagReducer } from './features/filters/filters-slice.js'
import { positionReducer } from './features/positions/positions-slice.js'

export const store = configureStore({
  reducer: {
    jobs: positionReducer,
    tags: tagReducer,
  },
  devTools: true,
})
