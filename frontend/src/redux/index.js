import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  
import thunk from 'redux-thunk';  
import { combineReducers } from '@reduxjs/toolkit';


import playlistReducer from './playlist';
import userSliceReducer from './userId';

const persistConfig = {
  key: 'root',
  storage,
};


const rootReducer = combineReducers({
  playlist: playlistReducer,
  userId: userSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],  
});

export const persistor = persistStore(store);
