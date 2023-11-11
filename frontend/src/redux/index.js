import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // par défaut, il utilise localStorage
import thunk from 'redux-thunk'; // si vous utilisez le middleware thunk
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
