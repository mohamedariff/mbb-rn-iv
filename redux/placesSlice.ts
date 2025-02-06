import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchGooglePlace, getCoordinatesByPlaceId } from '../utils'

type Place = {
  value: string
  label: string
}

type Coordinates = {
  lat: number
  lng: number
}

interface PlacesState {
  places: Place[]
  selectedCoordinates: Coordinates & { name?: string }
  loading: boolean
  error: string | null
  searchHistory: Place[]
}

const initialState: PlacesState = {
  places: [],
  selectedCoordinates: {
    lat: 4.637235377222436,
    lng: 101.05972492375584
  },
  loading: false,
  error: null,
  searchHistory: []
}

export const fetchPlacePredictions = createAsyncThunk(
  'places/fetchPredictions',
  async (query: string) => {
    const response = await fetchGooglePlace(query)
    return response.map((place: any) => ({
      value: place.place_id,
      label: place.description
    }))
  }
)

export const fetchCoordinates = createAsyncThunk(
  'places/fetchCoordinates',
  async (placeId: string) => await getCoordinatesByPlaceId(placeId)
)

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearPlaces: (state) => {
      state.places = []
    },
    addToHistory: (state, action) => {
      const exists = state.searchHistory.some(
        (place) => place.value === action.payload.value
      )
      if (!exists) {
        state.searchHistory = [
          action.payload,
          ...state.searchHistory.slice(0, 9)
        ]
      }
    },
    clearHistory: (state) => {
      state.searchHistory = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlacePredictions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlacePredictions.fulfilled, (state, action) => {
        state.loading = false
        state.places = action.payload
      })
      .addCase(fetchPlacePredictions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch predictions'
      })
      .addCase(fetchCoordinates.fulfilled, (state, action) => {
        state.selectedCoordinates = action.payload
      })
  }
})

export const { clearPlaces, addToHistory, clearHistory } = placesSlice.actions
export default placesSlice.reducer
