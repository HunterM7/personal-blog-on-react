import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Types
import { IPost, EnumStatus } from 'types/index'

// Utils
import axios from 'utils/axios'

// Async actions
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async function () {
    const { data } = await axios.get<IPost[]>('posts')

    return data
  },
)

export const fetchTags = createAsyncThunk('posts/fetchTags', async function () {
  const { data } = await axios.get<string[]>('tags')

  return data
})

interface IPostsSliceState {
  posts: {
    items: IPost[] | null
    status: EnumStatus
  }
  tags: {
    items: string[] | null
    status: EnumStatus
  }
}

const initialState: IPostsSliceState = {
  posts: {
    items: null,
    status: EnumStatus.LOADING,
  },
  tags: {
    items: null,
    status: EnumStatus.LOADING,
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      // Fetching posts
      .addCase(fetchPosts.pending, function (state) {
        state.posts.items = null
        state.posts.status = EnumStatus.LOADING
      })
      .addCase(fetchPosts.fulfilled, function (state, action) {
        state.posts.items = action.payload
        state.posts.status = EnumStatus.LOADED
      })
      .addCase(fetchPosts.rejected, function (state) {
        state.posts.items = null
        state.posts.status = EnumStatus.ERROR
      })
      // Fetching tags
      .addCase(fetchTags.pending, function (state) {
        state.tags.items = null
        state.tags.status = EnumStatus.LOADING
      })
      .addCase(fetchTags.fulfilled, function (state, action) {
        state.tags.items = action.payload
        state.tags.status = EnumStatus.LOADED
      })
      .addCase(fetchTags.rejected, function (state) {
        state.tags.items = null
        state.tags.status = EnumStatus.ERROR
      })
  },
})

export const postsReducer = postsSlice.reducer
