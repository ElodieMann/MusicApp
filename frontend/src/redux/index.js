import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from './playlist'
import userSliceReducer from './userId'

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    userId: userSliceReducer
  },
})