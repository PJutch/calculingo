import { authSlice, initAuth } from "./auth";
import { configureStore } from "@reduxjs/toolkit";
import db from "./db";

export const store = configureStore({
    reducer: {
        [db.reducerPath]: db.reducer,
        [authSlice.name]: authSlice.reducer,
    },
    middleware: (getMiddleware) =>
        getMiddleware().concat(db.middleware)
})

export type StateType = ReturnType<typeof store.getState>;

initAuth(store);
