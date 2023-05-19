import { useSelector } from 'react-redux'
import { selectTags } from '../filters/filters-slice.js'
import { selectVisiblePositions } from './positions-slice.js'

export const usePositions = () => {
  const currentTags = useSelector(selectTags)
  return useSelector((state) => selectVisiblePositions(state, currentTags))
}
