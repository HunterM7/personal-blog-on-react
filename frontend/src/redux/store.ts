import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

// Reducers
import { postsReducer, authReducer } from 'redux/slices'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
})

// RootState
export type TRootState = ReturnType<typeof store.getState>

// Dispatch typing
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Selector typing
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

export default store
