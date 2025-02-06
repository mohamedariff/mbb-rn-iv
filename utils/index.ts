import axios from 'axios'
import { Toast } from '@ant-design/react-native'

const key = process.env.EXPO_PUBLIC_PLACES_KEY

export const fetchGooglePlace = async (input: string) => {
  const endpoint =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json'

  try {
    const response = await axios.get(endpoint, { params: { input, key } })
    if (response.data.status !== 'OK') {
      return Toast.fail(response.data.error_message)
    }
    return response.data.predictions
  } catch (error) {
    console.error('Error fetching autocomplete data:', error)
    throw error
  }
}

export const getCoordinatesByPlaceId = async (placeId: string) => {
  const endpoint = 'https://maps.googleapis.com/maps/api/place/details/json'
  try {
    const response = await axios.get(endpoint, {
      params: { place_id: placeId, key }
    })

    // The geometry property is found in `response.data.result.geometry`
    const result = response.data.result

    if (result?.geometry?.location) {
      const { lat, lng } = result.geometry.location
      return { lat, lng, name: result.formatted_address }
    } else {
      throw new Error('Coordinates not found in the response.')
    }
  } catch (error) {
    console.error('Error fetching place details:', error)
    throw error
  }
}
