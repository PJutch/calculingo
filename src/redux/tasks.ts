import { createApi } from "@reduxjs/toolkit/query/react"
import { supabase } from "../../supabase/client"

interface Task {
    id: string,
    formula: string,
    collection: string
    user_id: string | null
}

export const tasksApi = createApi({
    reducerPath: 'tasks_api',
    tagTypes: ["Collection", "Task", "Option"],
    baseQuery: () => {
        console.log("Base query called");
        return { data: null }
    },
    endpoints: builder => ({
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
        createTask: builder.mutation<Task, {collection: string, user_id: string}>({
            queryFn: async ({collection, user_id}) => {
                const { data: taskData, error } = await supabase
                    .from("tasks").insert({ collection, user_id }).select("*").single();
                if (error) throw error;

                for (let i = 0; i < 4; ++i) {
                    const { data: optionData, error: optionError } = await supabase
                        .from("options").insert({ task: taskData.id, user_id }).select("*").single();
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
    })
});

export const {
    useGetTaskQuery,
    useGetTasksQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useSetTaskFormulaMutation
} = tasksApi;
