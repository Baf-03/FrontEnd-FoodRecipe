import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
  token: "" || localStorage.getItem("token"),
  loading: false,
  logininSucess: false,
  data: null,
};

export const LoginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post("https://different-gold-vulture.cyclic.app/api/login", {
        email,
        password,
      });
      if (!response?.data?.status) {
        throw new Error("Status false");
      }
      return response?.data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const LoginSlice = createSlice({
  name: "login/loginUser",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoginSuccess: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.data = action.payload?.data;
       

        state.logininSucess=true
        localStorage.setItem("token",action.payload?.token)
        localStorage.setItem("userid",action.payload?.data?._id)
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        console.error("Signup failed");
        state.logininSucess = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setPassword, setLoginSuccess } = LoginSlice.actions;

export default LoginSlice.reducer;
