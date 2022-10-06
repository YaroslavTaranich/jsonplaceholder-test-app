import { Link } from 'react-router-dom'

import styles from '../css/users.module.css'

function AllUserInfo({ user }) {
  return (
    <>
      <header className={styles.header}>
        <Link to={`/users/${user.id}`}>
          <img
            className={styles.avatar}
            src={`https://avatars.dicebear.com/api/gridy/${user.username}.svg`}
            alt={`${user.name}'s logo`}
          />
          <span className={styles.username}>{user.username}</span>
        </Link>
        <ul className={styles.contacts}>
          <li className={styles.link}>
            Name: <span>{user.name}</span>
          </li>
          <li className={styles.link}>
            Mail: <a href={`mailto:${user.email}`}>{user.email}</a>
          </li>
          <li className={styles.link}>
            WebSite: <a href={`${user.website}`}>{user.website}</a>
          </li>
          <li className={styles.link}>
            Phone: <a href={`tel:${user.phone}`}>{user.phone}</a>
          </li>
        </ul>
      </header>
      <div className={styles.address}>
        <ul>
          <p>Home Address: </p>
          <li>
            street: <span>{user.address.street}</span>
          </li>
          <li>
            suite: <span>{user.address.suite}</span>
          </li>
          <li>
            city: <span>{user.address.city}</span>
          </li>
          <li>
            zipcode: <span>{user.address.zipcode}</span>
          </li>
        </ul>
        <ul>
          <p>Company Info: </p>
          <li>
            name: <span>{user.company.name}</span>
          </li>
          <li>
            catchPhrase: <span>{user.company.catchPhrase}</span>
          </li>
          <li>
            bs: <span>{user.company.bs}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AllUserInfo
