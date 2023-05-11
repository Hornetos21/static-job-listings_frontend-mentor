export const selectAllPositions = (state) => state.jobs

export const selectVisiblePositions = (state, tags = []) => {
  if (!tags.length) return state.jobs

  return state.jobs.filter((job) =>
    tags.every((filter) => job.tags.includes(filter))
  )
}
