/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

export const getComments = createAsyncThunk('comments/getComments', async (arg, API) =>
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => API.rejectWithValue(e.message))
)

export const commentsAdapter = createEntityAdapter()

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getComments.pending, (state) => {
      state.loading = true
      state.error = null
    })
    bulider.addCase(getComments.fulfilled, (state, action) => {
      state.loading = true
      state.error = null
      commentsAdapter.setAll(state, action.payload)
    })
    bulider.addCase(getComments.rejected, (state, action) => {
      state.loading = true
      state.error = action.payload
    })
  },
})

export default commentsSlice.reducer

const selectComents = (state) => state.comments

export const comentsSelector = commentsAdapter.getSelectors()

export const getCommetsByPostId = (postId) =>
  createSelector(selectComents, (state) => {
    const { ids, entities } = state
    return ids.reduce((res, id) => {
      if (entities[id].postId === postId) res.push(entities[id])
      return res
    }, [])
  })
