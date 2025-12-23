import { collectionsApi } from "./collections";
import { optionsApi } from "./options";
import { tasksApi } from "./tasks";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [collectionsApi.reducerPath]: collectionsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [optionsApi.reducerPath]: optionsApi.reducer,
    },
    middleware: (getMiddleware) =>
        getMiddleware().concat(collectionsApi.middleware).concat(tasksApi.middleware).concat(optionsApi.middleware)
})
