import { createAsyncThunk, createSlice, SerializedError, Store } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/client";
import { Session, User } from "@supabase/supabase-js"

const refetchAuth = createAsyncThunk("auth/refetch", async (_, { rejectWithValue }) => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (session === null) return rejectWithValue({ error });
    return { session };
})

export const signIn = createAsyncThunk("auth/sign-in", async ({ email, password }, { rejectWithValue }) => {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({ email, password });
    if (session === null) return rejectWithValue({ message: error?.message });
    return { session };
})

export const signUp = createAsyncThunk("auth/sign-up", async ({ email, password }, { rejectWithValue }) => {
    const { data: { session }, error } = await supabase.auth.signUp({ email, password });
    if (session === null) return rejectWithValue({ message: error?.message });
    return { session };
})

export const signOut = createAsyncThunk("auth/sign-out", async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();
    if (error !== null) return rejectWithValue({ message: error?.message });
})

type AuthState = {
    user: User,
    session: Session,
    error: null,
} | {
    user: null,
    session: null,
    error: SerializedError,
} | {
    user: null,
    session: null,
    error: null
}

function updateAuthSucceed(state: AuthState, action: { payload: { session: Session } }) {
    state.session = action.payload.session;
    state.user = action.payload.session.user;
    state.error = null;
}

function updateAuthFailed(state: AuthState, action: { error: SerializedError }) {
    state.session = null;
    state.user = null;
    state.error = action.error;
}

function updateAuthClear(state: AuthState) {
    state.session = null;
    state.user = null;
    state.error = null;
}

export const authSlice = createSlice({
    name: "auth", initialState: { user: null, session: null, error: null } as AuthState,
    reducers: {
        setAuth: updateAuthSucceed,
        clearAuth: updateAuthClear,
    },
    extraReducers: (builder) => builder
        .addCase(refetchAuth.fulfilled, updateAuthSucceed)
        .addCase(refetchAuth.rejected, updateAuthFailed)
        .addCase(signIn.fulfilled, updateAuthSucceed)
        .addCase(signIn.rejected, updateAuthFailed)
        .addCase(signUp.fulfilled, updateAuthSucceed)
        .addCase(signUp.rejected, updateAuthFailed)
        .addCase(signOut.fulfilled, updateAuthClear)
        .addCase(signOut.rejected, updateAuthFailed)
});

export function initAuth(store: Store) {
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            store.dispatch(authSlice.actions.setAuth({ session }));
        } else {
            store.dispatch(authSlice.actions.clearAuth());
        }
    })
}
