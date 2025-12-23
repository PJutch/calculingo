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
                const { data: collection, error } = await supabase
                    .from("collections").insert({}).select("*").single();
                if (error) throw error;

                const { data: task, error: taskError } = await supabase
                    .from("tasks").insert({collection: collection.id, formula: "\\text{examples}"}).select("*").single();
                if (taskError) throw taskError;

                const { error: option1Error } = await supabase
                    .from("options").insert({task: task.id, formula: "\\frac{x + y}{z + w}"});
                if (option1Error) throw option1Error;

                const { error: option2Error } = await supabase
                    .from("options").insert({task: task.id, formula: "\\sqrt{x}"});
                if (option2Error) throw option2Error;

                const { error: option3Error } = await supabase
                    .from("options").insert({task: task.id, formula: "\\lim_{n \\to \\infty}{\\frac 1 {2^n}}"});
                if (option3Error) throw option3Error;

                const { error: option4Error } = await supabase
                    .from("options").insert({task: task.id, formula: "\\int_0^{100}{x dx}"});
                if (option4Error) throw option4Error;

                return { data: collection };
            },
            invalidatesTags: ["Collection"]
        }),
        deleteCollection: builder.mutation<null, string>({
            queryFn: async (id) => {
                const { error } = await supabase
                    .from("collections").delete().eq("id", id);
                if (error) throw error;
                return { data: null };
            },
            invalidatesTags: ["Collection"],
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
        createTask: builder.mutation<Task, string>({
            queryFn: async (collection) => {
                const { data: taskData, error } = await supabase
                    .from("tasks").insert({ collection }).select("*").single();
                if (error) throw error;

                for (let i = 0; i < 4; ++i) {
                    const { data: optionData, error: optionError } = await supabase
                        .from("options").insert({ task: taskData.id }).select("*").single();
                    if (optionError) throw optionError;
                }

                return { data: taskData };
            },
            invalidatesTags: ["Task"]
        }),
        deleteTask: builder.mutation<null, string>({
            queryFn: async (id) => {
                const { error } = await supabase
                    .from("tasks").delete().eq("id", id);
                if (error) throw error;
                return { data: null };
            },
            invalidatesTags: ["Task"],
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
        createOption: builder.mutation<Option, Partial<Option>>({
            queryFn: async (option) => {
                const { data, error } = await supabase
                    .from("options").insert(option).select("*").single();
                if (error) throw error;
                return { data };
            },
            invalidatesTags: ["Option"]
        }),
        deleteOption: builder.mutation<null, string>({
            queryFn: async (id) => {
                const { error } = await supabase
                    .from("options").delete().eq("id", id);
                if (error) throw error;
                return { data: null };
            },
            invalidatesTags: ["Option"],
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
    useDeleteCollectionMutation,
    useSetCollectionNameMutation,
    useGetTasksQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useSetTaskFormulaMutation,
    useGetOptionsQuery,
    useGetOptionQuery,
    useGetCollectionOptionsQuery,
    useCreateOptionMutation,
    useDeleteOptionMutation,
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
