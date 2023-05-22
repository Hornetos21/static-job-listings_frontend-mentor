import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const DATA_JSON = '/data/data.json'

const initialState = {
  status: 'idle',
  list: [],
  error: null,
}

export const loadPositions = createAsyncThunk(
  '@@positions/load-all',
  async () => {
    const res = await fetch(DATA_JSON)
    const data = await res.json()
    return data.map((job) => {
      return {
        ...job,
        tags: [job.level, job.role, ...job.languages, ...job.tools],
      }
    })
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().jobs

      if (status === 'loading') {
        return false
      }
    },
  }
)

const positionsSlice = createSlice({
  name: '@@jobs',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPositions.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadPositions.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error.message
      })
      .addCase(loadPositions.fulfilled, (state, action) => {
        state.status = 'idle'
        state.list = action.payload
      })
  },
})

export const positionReducer = positionsSlice.reducer
export const selectVisiblePositions = (state, tags = []) => {
  return !tags.length
    ? state.jobs.list
    : state.jobs.list.filter((job) =>
        tags.every((filter) => job.tags.includes(filter))
      )
}
