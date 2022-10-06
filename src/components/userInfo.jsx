import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUserById } from '../store/usersSlice'
import styles from '../css/posts.module.css'

function UserInfo({ userId }) {
  const user = useSelector(getUserById(userId))
  if (!user) return <h2>loading</h2>
  return (
    <div className={styles.authtor}>
      <img
        className={styles.avatar}
        src={`https://avatars.dicebear.com/api/gridy/${user.username}.svg`}
        alt={`${user.name}'s logo`}
      />
      <Link to={`/users/${userId}`} className={styles.username}>
        {user.username}
      </Link>
      <span className={styles.mailto}>
        Mail: <a href={`mailto:${user.email}`}>{user.name}</a>
      </span>
    </div>
  )
}

export default UserInfo
