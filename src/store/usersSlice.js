/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

export const getUsers = createAsyncThunk('users/getUsers', async (arg, API) =>
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => API.rejectWithValue(e.message))
)

export const usersAdapter = createEntityAdapter()

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getUsers.pending, (state) => {
      state.loading = true
      state.error = null
    })
    bulider.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = true
      state.error = null
      usersAdapter.setAll(state, action.payload)
    })
    bulider.addCase(getUsers.rejected, (state, action) => {
      state.loading = true
      state.error = action.payload
    })
  },
})

export default usersSlice.reducer

const selectUsers = (state) => state.users

export const usersSelector = usersAdapter.getSelectors()

export const getUserById = (id) => createSelector(selectUsers, (state) => usersSelector.selectById(state, id))

export const getAllUsers = createSelector(selectUsers, (state) => usersSelector.selectAll(state))

export const getAllIdsEntities = createSelector(selectUsers, (state) => ({
  userIds: usersSelector.selectEntities(state),
  userEntites: usersSelector.selectEntities(state),
}))
