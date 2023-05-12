import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

// Reducers
import { postsReducer } from 'redux/slices/posts'

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

// Dispatch typing
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
