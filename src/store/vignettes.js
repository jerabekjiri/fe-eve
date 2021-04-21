import { createSlice } from '@reduxjs/toolkit';
import { fetchVignetteTypes, patchVignetteType } from 'api/vignette-types';

// Reducer
export const slice = createSlice({
    name: 'vignettes',
    initialState: {
        vignettes: [],
        types: [],
        error: false,
        pending: false
    },
    reducers: {},
    extraReducers: {
        // fetch vignette types
        [fetchVignetteTypes.pending]: (state, action) => {
            state.pending = true
        },
        [fetchVignetteTypes.fulfilled]: (state, action) => {
            state.pending = false
            state.types = action.payload
        },
        [fetchVignetteTypes.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || true
        },
        
        // patch vignette types 
        [patchVignetteType.pending]: (state, action) => {
            state.pending = true
        },
        [patchVignetteType.fulfilled]: (state, action) => {
            state.pending = false
            state.types = action.payload
        },
        [patchVignetteType.rejected]: (state, action) => {
            state.pending = false
            state.error = action.payload || true
        }

    }
});

// Selectors
export const vignetteTypes = state => state.vignettes;
export const vignetteTypeById = (state, id) => state.vignettes.types.find(type => type.id === id)

export default slice.reducer;
  