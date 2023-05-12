import { clientAPI } from '../../api/index.js'

export const ADD_POSITIONS = 'ADD_POSITIONS'
export const SET_ERROR = 'SET_ERROR'
export const SET_LOADING = 'SET_LOADING'
const DATA_JSON = '../data/data.json'

export const addPositions = (jobs) => ({
  type: ADD_POSITIONS,
  jobs,
})
export const setError = (err) => ({
  type: SET_ERROR,
  err,
})
export const setLoading = () => ({
  type: SET_LOADING,
})

export const loadPositions = () => (dispatch) => {
  dispatch(setLoading())

  clientAPI(DATA_JSON)
    .then((data) => {
      const newCards = data.map((job) => {
        return {
          ...job,
          tags: [job.level, job.role, ...job.languages, ...job.tools],
        }
      })
      dispatch(addPositions(newCards))
    })
    .catch((err) => dispatch(setError(err)))
}
