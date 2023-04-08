import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  return (
    <div style={{ display: 'inline-block' }}>
      {user.name} logged in{' '}
      <button onClick={handleLogout} type='submit'>
        logout
      </button>
    </div>
  )
}

export default Logout
