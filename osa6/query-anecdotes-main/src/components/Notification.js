import { useEffect } from 'react'
import { useNotificationValue , useNotificationDispatch } from '../NotificationCondex'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5
}
const Notification = () => {
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    setTimeout(() => dispatch({ type: '' }),5000)
  }, [dispatch])


  const notification = useNotificationValue()
  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
