import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/client";

export const generateSolution = createAsyncThunk<string, { task: string }>("solution/generate",
    async ({ task }, { rejectWithValue }) => {
        const { data, error } = await supabase.functions.invoke("llm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task })
        });
        if (error) return rejectWithValue({ message: error?.message });
        return data.llmReply;
    });

export type SolutionState =
    { solution: string | null, error: null } |
    { solution: null, error: SerializedError };

export const solutionSlice = createSlice({
    name: "solution",
    initialState: { solution: null, error: null } as SolutionState,
    reducers: {
        resetSolution: (state) => {
            state.solution = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => builder
        .addCase(generateSolution.fulfilled, (state, action: { payload: string }) => {
            state.solution = action.payload;
            state.error = null;
        })
        .addCase(generateSolution.rejected, (state, action: { error: SerializedError }) => {
            state.solution = null;
            state.error = action.error;
        })
});
