import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import chatReducer from './chatSlice';
import starredReducer from './starredSlice';
import { StorageInstance } from '../utils/responsiveFunction';

const storageAdapter = {
  getItem: async (key: string) => {
    const value = await StorageInstance.getStringAsync(key);
    return value ?? null;
  },
  setItem: (key: string, value: string) =>
    StorageInstance.setStringAsync(key, value),
  removeItem: (key: string) => StorageInstance.removeItem(key),
};

const appReducer = combineReducers({
  chatData: chatReducer,
  starredItems: starredReducer,
});

const persistenceConfig = {
  key: 'appState',
  storage: storageAdapter,
};

const enhancedReducer = persistReducer(persistenceConfig, appReducer);

export const appStore = configureStore({
  reducer: enhancedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const appPersistor = persistStore(appStore);

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
