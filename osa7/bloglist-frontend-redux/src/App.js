import { createRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Logout from './components/Logout'
import blogService from './services/blogs'

const App = () => {
  const user = useSelector((state) => state.login)
  const blogFormRef = createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && (
        <Togglable buttonLabel='log in' id='ToggleButton'>
          <LoginForm />
        </Togglable>
      )}
      {user && (
        <div>
          <Logout />
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
