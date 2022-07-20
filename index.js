// import getRoverCam from './getRoverCam.js'

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

console.log(getDate(10))
