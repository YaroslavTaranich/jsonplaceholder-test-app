/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

export const getPostsByPage = createAsyncThunk('posts/getPosts', async (page, API) =>
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => API.rejectWithValue(e.message))
)

export const getPostsByUserId = createAsyncThunk('posts/getPostsByUserId', async ({ userId, page }, API) =>
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=5&_page=${page}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => API.rejectWithValue(e.message))
)

export const postsAdapter = createEntityAdapter()

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    fetchStatus: 'loading',
    loadBy: null,
    error: null,
    page: 1,
  }),
  reducers: {
    setNextPage: (state) => {
      state.page += 1
    },
    clearPosts: (state, action) => {
      state.page = 1
      state.fetchStatus = 'clear'
      state.loadBy = action.payload
      state.error = null
      postsAdapter.removeAll(state)
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(getPostsByPage.pending, (state) => {
      state.fetchStatus = 'loading'
      state.error = null
    })
    bulider.addCase(getPostsByPage.fulfilled, (state, action) => {
      state.error = null
      if (action.payload.length === 0) {
        state.fetchStatus = 'all'
      } else {
        postsAdapter.addMany(state, action.payload)
        state.fetchStatus = 'idle'
      }
    })
    bulider.addCase(getPostsByPage.rejected, (state, action) => {
      state.fetchStatus = 'error'
      state.error = action.payload
    })
    bulider.addCase(getPostsByUserId.pending, (state) => {
      state.fetchStatus = 'loading'
      state.error = null
    })
    bulider.addCase(getPostsByUserId.fulfilled, (state, action) => {
      state.error = null
      if (action.payload.length === 0) {
        state.fetchStatus = 'all'
      } else {
        postsAdapter.addMany(state, action.payload)
        state.fetchStatus = 'idle'
      }
    })
    bulider.addCase(getPostsByUserId.rejected, (state, action) => {
      state.fetchStatus = 'error'
      state.error = action.payload
    })
  },
})

export const { setNextPage, clearPosts } = postsSlice.actions

export default postsSlice.reducer

const selectPosts = (state) => state.posts

export const postsInfo = createSelector(selectPosts, (posts) => {
  const { fetchStatus, loadBy, error, page } = posts
  return {
    fetchStatus,
    loadBy,
    error,
    page,
  }
})

export const postsSelectpors = postsAdapter.getSelectors(selectPosts)

// export const getPostsByUser
