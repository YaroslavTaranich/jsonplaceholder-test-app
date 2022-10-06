/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

export const getTodosByPage = createAsyncThunk('users/getTodos', async (page, API) =>
  fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => API.rejectWithValue(e.message))
)

export const getUserTodos = createAsyncThunk('users/getUserTodos', async (userId, API) =>
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => API.rejectWithValue(e.message))
)

const todosAdapter = createEntityAdapter()

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState({
    loading: false,
    error: null,
    page: 1,
  }),
  reducers: {
    todoAddOne: todosAdapter.addOne,
    todoAddMany: todosAdapter.addMany,
    todoUpdate: todosAdapter.updateOne,
    todoRemove: todosAdapter.removeOne,
    todoNextPage: (state) => {
      state.page += 1
    },
    todoPrevPage: (state) => {
      state.page -= 1
    },
    toggleComplited: (state, action) => {
      state.entities[action.payload].completed = !state.entities[action.payload].completed
    },
  },
  extraReducers: {
    [getTodosByPage.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getTodosByPage.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      todosAdapter.setAll(state, action.payload)
    },
    [getTodosByPage.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.selected = null
    },
    [getUserTodos.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getUserTodos.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      todosAdapter.setAll(state, action.payload)
    },
    [getUserTodos.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { todoAddOne, todoRemove, todoNextPage, todoPrevPage, toggleComplited } = todosSlice.actions
export const { reducer } = todosSlice

export const globalazedSelectors = todosAdapter.getSelectors((state) => state.todos)
export const simpleSelectors = todosAdapter.getSelectors()

export const selectPage = (state) => state.todos.page
export const selectLoading = (state) => state.todos.loading

export const selectTodos = (state) => state.todos

export const getTodosData = createSelector(selectTodos, (state) => ({
  allTodos: simpleSelectors.selectAll(state),
  loading: state.loading,
  error: state.error,
  page: state.page,
}))
