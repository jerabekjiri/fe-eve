import axios from './config'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVignetteTypes = createAsyncThunk(
    'vignetteTypes/fetchVignetteTypes',
    async (data, { rejectWithValue }) => {
        
        try {
            
            const response = await axios.get('vignettes/types')
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }
        
})

export const patchVignetteType = createAsyncThunk(
    'vignetteTypes/patchVignetteType',
    async (vignetteType, { rejectWithValue }) => {
        
        try {
            
            const response = await axios.patch(`vignettes/types/${vignetteType.id}/edit`, vignetteType)
            return response.data;
        
        } catch (err) {
            return rejectWithValue(err.response.error)
        }
        
})


