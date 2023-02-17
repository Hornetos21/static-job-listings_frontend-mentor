// const getData = async () => {
//   const request = await fetch('./js/data.json')
//   const data = await request.json()

//   console.log(data)
// }
// getData()

fetch('./js/data.json')
  .then((response) => response.json())
  .then((json) =>
    console.log(
      json.forEach((card) => {
        let arr = []
        for (let key in card) {
          return arr.push(key)
        }
        return arr
      })
    )
  )
