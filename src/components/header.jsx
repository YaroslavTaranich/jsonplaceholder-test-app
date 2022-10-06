import { useNavigate } from 'react-router'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="app-header">
      <h1>Test App</h1>
      <button type="button" onClick={() => navigate('image')}>
        IMAGE
      </button>
      <button type="button" onClick={() => navigate('posts')}>
        POSTS
      </button>
      <button type="button" onClick={() => navigate('users')}>
        USERS
      </button>
      <button type="button" onClick={() => navigate('todos')}>
        TODOS
      </button>
    </header>
  )
}

export default Header
