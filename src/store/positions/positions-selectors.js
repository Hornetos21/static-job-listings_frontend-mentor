export const selectVisiblePositions = (state, tags = []) => {
  return !tags.length
    ? state.jobs.list
    : state.jobs.list.filter((job) =>
        tags.every((filter) => job.tags.includes(filter))
      )
}
