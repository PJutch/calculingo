import { createApi } from "@reduxjs/toolkit/query/react"
import { supabase } from "../supabase/client"
import { configureStore } from "@reduxjs/toolkit";

interface Collection {
    id: string,
    name: string,
}

interface Task {
    id: string,
    formula: string,
    collection: string
}

interface Option {
    id: string,
    formula: string,
    is_right: boolean
    task: string
}

export const supabaseApi = createApi({
    reducerPath: 'api',
    tagTypes: ["Collection", "Task", "Option"],
    baseQuery: () => {
        console.log("Base query called");
        return { data: null }
    },
    endpoints: builder => ({
        getCollections: builder.query<Collection[], void>({
            queryFn: async () => {
                const { data, error } = await supabase
                    .from("collections").select("*").order("created_at").order("id");
                if (error) throw error;
                return { data };
            },
            providesTags: ["Collection"]
        }),
        getCollection: builder.query<Collection, string>({
            queryFn: async (id) => {
                const { data, error } = await supabase
                    .from("collections").select("*").eq("id", id).single();
                if (error) throw error;
                return { data };
            },
            providesTags: ["Collection"]
        }),
        createCollection: builder.mutation<Collection, void>({
            queryFn: async () => {
                const { data, error } = await supabase
                    .from("collections").insert({}).select("*").single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Collection"]
        }),
        setCollectionName: builder.mutation<Collection, { id: string, name: string }>({
            queryFn: async ({ id, name }) => {
                const { data, error } = await supabase
                    .from("collections").update({ name }).eq("id", id).select("*").single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Collection"]
        }),
        getTasks: builder.query<Task[], string>({
            queryFn: async (collection) => {
                const { data, error } = await supabase
                    .from("tasks").select("*").eq("collection", collection).order("created_at").order("id");
                if (error) throw error;
                return { data };
            },
            providesTags: ["Task"]
        }),
        getTask: builder.query<Task, string>({
            queryFn: async (id) => {
                const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single();
                if (error) throw error;
                return { data };
            },
            providesTags: ["Task"]
        }),
        createTask: builder.mutation<Task, void>({
            queryFn: async () => {
                const { data, error } = await supabase.from("tasks").insert({}).select("*").single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Task"]
        }),
        setTaskFormula: builder.mutation<Task, { id: string, formula: string }>({
            queryFn: async ({ id, formula }) => {
                const { data, error } = await supabase
                    .from("tasks").update({ formula }).eq("id", id).select("*").single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Task"]
        }),
        getOptions: builder.query<Option[], string>({
            queryFn: async (task) => {
                const { data, error } = await supabase
                    .from("options").select("*").eq("task", task).order("created_at").order("id");
                if (error) throw error;
                return { data };
            },
            providesTags: ["Option"],
        }),
        getOption: builder.query<Option, string>({
            queryFn: async (id) => {
                const { data, error } = await supabase
                    .from("options").select("*").eq("id", id).single();
                if (error) throw error;
                return { data };
            },
            providesTags: ["Option"],
        }),
        getCollectionOptions: builder.query<Option[], string>({
            queryFn: async (collection) => {
                const { data: tasks, error: taskError } = await supabase
                    .from("tasks").select("id").eq("collection", collection);
                if (taskError) throw taskError;

                const { data, error } = await supabase
                    .from("options").select("*").in("task", tasks.map(task => task.id))
                    .order("created_at").order("id");
                if (error) throw error;
                return { data };
            },
            providesTags: ["Option", "Task"],
        }),
        createOption: builder.mutation<Option, void>({
            queryFn: async () => {
                console.log("created option");
                const { data, error } = await supabase
                    .from("options").insert({}).select("*").single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Option"]
        }),
        setOptionFormula: builder.mutation<Option, { id: string, formula: string }>({
            queryFn: async ({ id, formula }) => {
                const { data, error } = await supabase
                    .from("options").update({ formula }).eq("id", id).select().single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Option"]
        }),
        setOptionIsRight: builder.mutation<Option, { id: string, is_right: boolean }>({
            queryFn: async ({ id, is_right }) => {
                const { data, error } = await supabase
                    .from("options").update({ is_right }).eq("id", id).select().single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Option"]
        })
    })
});

export const {
    useGetCollectionsQuery,
    useGetCollectionQuery,
    useCreateCollectionMutation,
    useSetCollectionNameMutation,
    useGetTasksQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useSetTaskFormulaMutation,
    useGetOptionsQuery,
    useGetOptionQuery,
    useGetCollectionOptionsQuery,
    useCreateOptionMutation,
    useSetOptionFormulaMutation,
    useSetOptionIsRightMutation,
} = supabaseApi;

export const store = configureStore({
    reducer: {
        [supabaseApi.reducerPath]: supabaseApi.reducer,
    },
    middleware: (getMiddleware) =>
        getMiddleware().concat(supabaseApi.middleware)
})
