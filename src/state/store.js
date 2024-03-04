import { configureStore } from '@reduxjs/toolkit'

import SignupReducer from './SignupSlice'
import LoginReducer from './LoginSlice'
import DashBoardReducer from './DashboardSlice/dashboardSlice'

export const store = configureStore({
  reducer: {SignupReducer,LoginReducer,DashBoardReducer},
})