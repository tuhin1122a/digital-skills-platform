import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
// import thunk from "redux-thunk"  <-- এখানে আর লাগবে না
import testAnswersReducer from '@/features/testAnswers/testAnswersSlice';



const rootReducer = combineReducers({
  testAnswers: testAnswersReducer,
})

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["testAnswers"], // চাইলে দিতে পারো persist করার জন্য
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
