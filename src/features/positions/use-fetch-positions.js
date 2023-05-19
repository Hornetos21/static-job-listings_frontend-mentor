import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loadPositions } from './positions-slice.js'

export const useFetchPositions = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPositions())
  }, [dispatch])
}
