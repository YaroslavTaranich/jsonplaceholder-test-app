/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'

const photosAdapter = createEntityAdapter()

const fetchPhotosByAlbum = (albumId) =>
  fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then((res) => res.json())
    .then((data) => data)

export const getPhotoByAlbumId = createAsyncThunk('photos/getByAlbum', async (albumId, API) =>
  fetchPhotosByAlbum(albumId)
    .then((res) => res)
    .catch((e) => API.rejectWithValue(e.message))
)

export const getPhotoByManyAlbumsIds = createAsyncThunk('photos/getManyAlbums', async (ArrayAlbumIds, API) =>
  Promise.all(ArrayAlbumIds.map((id) => fetchPhotosByAlbum(id)))
    .then((res) => res)
    .catch((e) => API.rejectWithValue(e.message))
)

const photosSlice = createSlice({
  name: 'photos',
  initialState: photosAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotoByAlbumId.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getPhotoByAlbumId.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    builder.addCase(getPhotoByAlbumId.fulfilled, (state, action) => {
      state.error = null
      state.loading = false
      photosAdapter.addMany(state, action.payload)
    })
    builder.addCase(getPhotoByManyAlbumsIds.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getPhotoByManyAlbumsIds.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    builder.addCase(getPhotoByManyAlbumsIds.fulfilled, (state, action) => {
      state.error = null
      state.loading = false
      const loaded = action.payload.reduce((res, el) => [...res, ...el], [])
      photosAdapter.addMany(state, loaded)
    })
  },
})

export default photosSlice.reducer

const selectPhotos = (state) => state.photos

export const selcetPhotosByAlbumId = (albumId) =>
  createSelector(selectPhotos, (albums) => {
    const { ids, entities, loading, error } = albums
    return {
      data: ids.reduce((res, id) => {
        if (entities[id].albumId === +albumId) res.push(entities[id])
        return res
      }, []),
      loading,
      error,
    }
  })
