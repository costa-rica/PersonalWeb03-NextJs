import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "./features/userSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist user slice
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  })
  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

// Create persistor
export const persistor = (store: AppStore) => persistStore(store)
