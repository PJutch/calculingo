import { createApi } from "@reduxjs/toolkit/query/react"
import { supabase } from "../../supabase/client"
import { collectionEndpoints } from "./collections";
import { taskEndpoints } from "./tasks";
import { optionEndpoints } from "./options";

const db = createApi({
    reducerPath: 'db_api',
    tagTypes: ["Collection", "Task", "Option"],
    baseQuery: () => {
        console.log("Base query called");
        return { data: null }
    },
    endpoints: (builder) => ({
        ...collectionEndpoints(builder),
        ...taskEndpoints(builder),
        ...optionEndpoints(builder),
    })
});

export default db;
