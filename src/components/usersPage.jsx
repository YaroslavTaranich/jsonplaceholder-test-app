import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getAllUsers } from '../store/usersSlice'
import styles from '../css/users.module.css'

import AllUserInfo from './allUserIfo'

function UsersPage() {
  const users = useSelector(getAllUsers)
  const navigate = useNavigate()

  return (
    <section className={styles.users}>
      {users.map((user) => (
        <div className={styles.user_info} key={user.username}>
          <AllUserInfo user={user} />
          <div className={styles.user_links}>
            <button type="button" className={styles.user_button} onClick={() => navigate(`/users/${user.id}`)}>
              {user.username} Page
            </button>
            <button type="button" className={styles.user_button} onClick={() => navigate(`/users/${user.id}/albums`)}>
              {user.username} Albums
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default UsersPage
