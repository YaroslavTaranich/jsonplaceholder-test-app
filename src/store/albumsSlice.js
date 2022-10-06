/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'

const albumsAdapter = createEntityAdapter()

export const getAlbumsByUserId = createAsyncThunk('albums/getByUser', async (userId, API) =>
  fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => API.rejectWithValue(e.message))
)

const albumsSlice = createSlice({
  name: 'albums',
  initialState: albumsAdapter.getInitialState({
    loading: true,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbumsByUserId.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getAlbumsByUserId.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    builder.addCase(getAlbumsByUserId.fulfilled, (state, action) => {
      state.error = null
      state.loading = false
      albumsAdapter.addMany(state, action.payload)
    })
  },
})

const selectAlbums = (state) => state.albums

export const selcetAlbumsByUserId = (userId) =>
  createSelector(selectAlbums, (albums) => {
    const { ids, entities, loading, error } = albums
    return {
      data: ids.reduce((res, id) => {
        if (entities[id].userId === +userId) res.push(entities[id])
        return res
      }, []),
      loading,
      error,
    }
  })

export const selectUserAlbums = (userId) =>
  createSelector(selectAlbums, ({ ids, entities }) => ids.filter((id) => entities[id].userId === +userId))

export default albumsSlice.reducer
