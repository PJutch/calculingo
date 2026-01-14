import { authSlice, initAuth } from "./auth";
import { solutionSlice } from './solution';
import { configureStore } from "@reduxjs/toolkit";
import db from "./db";

export const store = configureStore({
    reducer: {
        [db.reducerPath]: db.reducer,
        [authSlice.name]: authSlice.reducer,
        [solutionSlice.name]: solutionSlice.reducer,
    },
    middleware: (getMiddleware) =>
        getMiddleware().concat(db.middleware)
})

export type StateType = ReturnType<typeof store.getState>;

initAuth(store);
