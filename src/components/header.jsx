import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="app-header">
      <Link to="/">Test App</Link>
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
