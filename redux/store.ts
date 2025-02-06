import { configureStore } from '@reduxjs/toolkit'
import placesReducer from './placesSlice'

const store = configureStore({
  reducer: {
    places: placesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
