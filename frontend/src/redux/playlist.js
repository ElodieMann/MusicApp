import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: [],
  },
  reducers: {
    addPlaylist: (state, action) => {
      state.playlist = [...state.playlist, action.payload];
    },
    removePlaylist: (state, action) => {
      state.playlist = state.playlist.filter(
        (list) => list.id !== action.payload
      );
    },
    getPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    
  },
});

export const { addPlaylist, removePlaylist, getPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
