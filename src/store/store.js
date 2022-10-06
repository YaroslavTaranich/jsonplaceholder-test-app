import { configureStore } from '@reduxjs/toolkit'

import { reducer as todosReduser } from './TodosSlice'
import usersReduser from './usersSlice'
import commentsReduser from './commentsSlice'
import postsReduser from './postsSlice'
import albumsReducer from './albumsSlice'
import photosReduser from './photosSlice'

const store = configureStore({
  reducer: {
    posts: postsReduser,
    users: usersReduser,
    comments: commentsReduser,
    todos: todosReduser,
    albums: albumsReducer,
    photos: photosReduser,
  },
})

export default store
