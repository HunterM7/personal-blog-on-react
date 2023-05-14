import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Utils
import { IUser, EnumStatus, IUserWithToken, ILoginParams } from 'types/index'
import axios from 'utils/axios'

// Async actions
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async function (params: ILoginParams) {
    const { data } = await axios.post<IUserWithToken>('auth/login/', params)

    const { accessToken, refreshToken, ...user } = data

    return user as IUser
  },
)

interface IAuthSliceState {
  user: IUser | null
  status: EnumStatus
}

const initialState: IAuthSliceState = {
  user: null,
  status: EnumStatus.LOADING,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(loginUser.pending, function (state) {
        state.status = EnumStatus.LOADING
        state.user = null
      })
      .addCase(loginUser.fulfilled, function (state, action) {
        state.status = EnumStatus.LOADED
        state.user = action.payload
      })
      .addCase(loginUser.rejected, function (state) {
        state.status = EnumStatus.ERROR
        state.user = null
      })
  },
})

export const authReducer = authSlice.reducer
