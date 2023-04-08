import { createRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Logout from './components/Logout'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.login)
  const blogFormRef = createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
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
          <Routes>
            <Route path='/' element={<BlogList />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
