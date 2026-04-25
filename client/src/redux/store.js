import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    user: userReducer
});

const persistConfig = {
    key: "root",
    storage: {
        getItem: (key) => Promise.resolve(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null),
        setItem: (key, value) => Promise.resolve(localStorage.setItem(key, JSON.stringify(value))),
        removeItem: (key) => Promise.resolve(localStorage.removeItem(key))
    },
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export const persistor = persistStore(store);