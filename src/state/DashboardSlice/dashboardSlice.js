import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
};

export const getRecipes = createAsyncThunk(
  'dashboard/dashBoardSlice',
  async ({token}) => {

    try {
        const response = await axios.get(
            "https://backend-food-recipe-eight.vercel.app/api/getrecipe",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

      if(!response?.data?.status){
        alert('something went wrong on ourside')
        return
      }
      return response.data
      
    } catch (error) {
      throw error.message;
    }
  }
);

const dashBoardSlice = createSlice({
  name: 'dashboard/dashBoardSlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.loading = true; 
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false; 
        state.data= action.payload?.data
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false; 
        console.error("Signup failed");
      });
  },
});

export const {setData } = dashBoardSlice.actions;

export default dashBoardSlice.reducer;
