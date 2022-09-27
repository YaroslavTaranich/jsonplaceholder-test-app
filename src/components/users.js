import withData from '../HOC/withData'

function Users({ data, status, error }) {
  if (status === 'error') return <h1> ERROR! {error}</h1>
  if (status === 'loading') return <h1>LOADING!</h1>
  return (
    <ul className="users">
      {data.map((user) => (
        <li className="user-elem" key={user.id}>
          {user.id}. {user.name}
          <a href={user.website}>website</a>
        </li>
      ))}
    </ul>
  )
}

export default withData(Users, 'users')
