import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h4>Blogs created</h4>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            <p style={{ display: 'inline-block' }}> : {user.blogs.length}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
