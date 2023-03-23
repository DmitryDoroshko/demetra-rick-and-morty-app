import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {rickAndMortyApi} from "../services/rick-and-morty.service";
import {setupListeners} from "@reduxjs/toolkit/query";
import rickAndMortyReducer, {RickAndMortyState} from "./rick-and-morty/rickAndMortySlice";

export const store = configureStore({
  reducer: {
    rickAndMortyReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

setupListeners(store.dispatch);

export type AppThunk = ThunkAction<void, RickAndMortyState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;