import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  loading: false,
  data: null,
  token: null,
  name: "",
  password: "",
  email: "",
  loginsuccess: false // Initialize signupsuccess as false
};

export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async ({ email, password, name }) => {
    try {
      const response = await axios.post('https://backend-food-recipe-eight.vercel.app/api/signup', { email, password,name });
      
      if(response?.data?.status){ 
        console.log("Signup successful");
        return response.data; 
      } else {
        console.log("Signup failed");
        throw new Error("Signup failed");
      }
    } catch (error) {
      throw error.message;
    }
  }
);

const SignupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoginSuccess: (state, action) => {
      state.loginsuccess = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true; 
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false; 
        console.log("Signup successful");
        state.signupsuccess = true; 
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false; 
        console.error("Signup failed");
        state.signupsuccess = false;
      });
  },
});

export const { setName, setEmail, setPassword, setSignUpSuccess } = SignupSlice.actions;

export default SignupSlice.reducer;
