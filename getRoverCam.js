import * as dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const getRoverCam = (params) => {

  // Fetch Params
  const config = {
    key:    process.env.NASA_KEY,
    url:    'https://api.nasa.gov/mars-photos/api/v1/rovers',
    rover:  params.rover,
    camera: params.camera,
    date:   params.date
  }

  // Prepared API String
  const apiString = `${config.url}/${config.rover}/photos?api_key=${config.key}&camera=${config.camera}&earth_date=${config.date}`

  return (
    fetch(apiString).then(res => res.json())
    .then(res => {
      const len = res.photos.length
      let photoCount = []
      let photoRes = []

      if (len > 0) {

        // Specify All Images (Up to 3)
        if (len <= 3) {
          for (let i=0; len>i; i++)
          photoCount.push(i)
        }

        // Specify 3 Images (First, Middle, Last)
        if (len > 3) {
          photoCount.push(0)
          photoCount.push(Math.floor(len/2))
          photoCount.push(len-1)
        }

        // Push Specified Images to Array
        photoCount.map(x => {
          photoRes.push(res.photos[x].img_src)
        })
      }

      // Return Images or Empty Array
      return photoRes
    })
    .catch(err => {
      return err
    })
  )
}

export default getRoverCam