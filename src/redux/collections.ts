import { supabase } from "../../supabase/client"
import { EndpointBuilder } from "@reduxjs/toolkit/query";

interface Collection {
    id: string,
    name: string,
    user_id: string | null
}

export function collectionEndpoints(builder: EndpointBuilder<any, "Collection" | "Task" | "Option", "db_api">) {
    return {
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
        createCollection: builder.mutation<Collection, string>({
            queryFn: async (user_id) => {
                const { data: collection, error } = await supabase
                    .from("collections").insert({ name: "Новая коллекция", user_id }).select("*").single();
                if (error) throw error;

                const { data: task, error: taskError } = await supabase
                    .from("tasks").insert({ collection: collection.id, formula: "\\text{examples}", user_id })
                    .select("*").single();
                if (taskError) throw taskError;

                const { error: option1Error } = await supabase
                    .from("options").insert({ task: task.id, formula: "\\frac{x + y}{z + w}", user_id });
                if (option1Error) throw option1Error;

                const { error: option2Error } = await supabase
                    .from("options").insert({ task: task.id, formula: "\\sqrt{x}", user_id });
                if (option2Error) throw option2Error;

                const { error: option3Error } = await supabase
                    .from("options").insert({
                        task: task.id,
                        formula: "\\lim_{n \\to \\infty}{\\frac 1 {2^n}}",
                        user_id
                    });
                if (option3Error) throw option3Error;

                const { error: option4Error } = await supabase
                    .from("options").insert({ task: task.id, formula: "\\int_0^{100}{x dx}", user_id });
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
    };
}
