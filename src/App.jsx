import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router'

import { getUsers } from './store/usersSlice'
import { getComments } from './store/commentsSlice'
import './App.css'
import Images from './components/images'
import Posts from './components/posts'
import Todos from './components/todos'
import Header from './components/header'
import UsersPage from './components/usersPage'
import UserPage from './components/userPage'
import { getPostsByPage, postsSelectpors } from './store/postsSlice'
import UserAlbumsPage from './components/UserAlbumsPage'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getComments())
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Images />} />
        <Route path="image" element={<Images />} />
        <Route path="todos" element={<Todos />} />
        <Route path="posts" element={<Posts selector={postsSelectpors.selectAll} actionCreator={getPostsByPage} />} />
        <Route path="users">
          <Route index element={<UsersPage />} />
          <Route path=":id">
            <Route index element={<UserPage />} />
            <Route path="albums" element={<UserAlbumsPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
