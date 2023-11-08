import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from './playlist'

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
})