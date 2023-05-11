export const selectAllPositions = (state) => state.jobs

export const selectVisiblePositions = (state, tags = []) => {
  return !tags.length
    ? state.jobs
    : state.jobs.filter((job) =>
        tags.every((filter) => job.tags.includes(filter))
      )
}
