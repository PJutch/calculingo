import { supabase } from "../../supabase/client"
import { EndpointBuilder } from "@reduxjs/toolkit/query"

interface Option {
    id: string,
    formula: string,
    is_right: boolean
    task: string
    user_id: string | null
}

export function optionEndpoints(builder: EndpointBuilder<any, "Collection" | "Task" | "Option", "db_api">) {
    return {
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
    };
};
