import { createApi } from "@reduxjs/toolkit/query/react"
import { supabase } from "../../supabase/client"

interface Collection {
    id: string,
    name: string,
}

export const collectionsApi = createApi({
    reducerPath: 'collections_api',
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
                    .from("collections").insert({name: "Новая коллекция"}).select("*").single();
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
    })
});

export const {
    useGetCollectionsQuery,
    useGetCollectionQuery,
    useCreateCollectionMutation,
    useDeleteCollectionMutation,
    useSetCollectionNameMutation,
} = collectionsApi;
