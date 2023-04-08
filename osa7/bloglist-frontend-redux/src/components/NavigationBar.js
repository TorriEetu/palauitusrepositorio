import { Link } from 'react-router-dom'
import Logout from './Logout'

const NavigationBar = () => {
  const blogStyle = {
    paddingLeft: 10,
    border: 'solid',
    'background-color': 'lightgrey',
    borderWidth: 1,
    marginBottom: 1,
    display: 'block',
  }
  return (
    <div style={blogStyle}>
      <Link style={{ paddingRight: 5 }} to={'/'}>
        blogs
      </Link>
      <Link style={{ paddingRight: 5 }} to={'/users'}>
        users
      </Link>
      <Logout />
    </div>
  )
}
export default NavigationBar
