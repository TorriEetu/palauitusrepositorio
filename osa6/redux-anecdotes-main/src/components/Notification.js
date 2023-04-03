import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  //Probably really bad way to do this
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification && <div style={style}>{notification}</div>
}

export default Notification