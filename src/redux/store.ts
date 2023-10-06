import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartReducer from "./features/cartSlice";
import productReducer from "./features/productSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import localforage from "localforage";

const rootReducer = combineReducers({
  cart: CartReducer,
  product: productReducer,
});

const persistConfig = {
  key: "root",
  storage: localforage,
  throttle: 50,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
