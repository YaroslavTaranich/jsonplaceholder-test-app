import { useState } from 'react'

import './App.css'
import Images from './components/images'
import Posts from './components/posts'
import Users from './components/users'

function App() {
  const [page, setPage] = useState('image')

  return (
    <main className="App">
      <h1>Test App</h1>
      <button type="button" onClick={() => setPage('image')}>
        IMAGE
      </button>
      <button type="button" onClick={() => setPage('users')}>
        USERS
      </button>
      <button type="button" onClick={() => setPage('posts')}>
        POSTS
      </button>
      {page === 'image' && <Images />}
      {page === 'users' && <Users />}
      {page === 'posts' && <Posts />}
    </main>
  )
}

export default App
