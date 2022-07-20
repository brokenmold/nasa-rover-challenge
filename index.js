import getRoverCam from './getRoverCam.js'

// Get Formatted Date
const getDate = (offset) => {

  // Get Date
  let date = new Date()

  // Offset Date
  date.setDate(date.getDate()-(offset+1))

  // Prepare Date Parts
  const datePart = {
    year:  date.getFullYear(),
    month: date.getMonth()+1,
    day:   date.getDate()
  }

  // Return Formatted Date
  return `${datePart.year}-${datePart.month}-${datePart.day}`
}


// Get Rover Photos & Parse JSON
const getPhotos = async (rover, camera, days) => {
  let data = []

  // Iterate Day Count
  for (let i=0; days>i; i++) {

    // Prepare Params & Get Date to Fetch
    const params = {rover: rover, camera: camera, date: getDate(i)}

    // Fetch From NASA API by Date
    const photos = await getRoverCam(params)

    // Map Image Url Strings
    const mapPhotos = photos.map(x => {
      return '"'+x+'"'
    })

    // Prepare Results
    const string = '{"'+ params.date +'":['+ mapPhotos +']}'
    const json = JSON.parse(string)

    // Push Day to Array
    data.push(json)
  }

  // Return JSON
  return data
}

// Get Curiosity Navcam Photos
// Last 10 Days >> 3 Photos Per Day
const curiosity = await getPhotos('curiosity', 'NAVCAM', 10)

// Log Output
console.log(curiosity)