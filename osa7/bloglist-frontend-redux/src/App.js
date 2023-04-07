import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('wrong credentials', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const removeBlog = async (event) => {
    try {
      if (window.confirm(`Remove blog ${event.title} by ${event.author}`)) {
        await blogService.remove(event.id)
        setBlogs(blogs.filter((blog) => blog.id !== event.id))
        dispatch(createNotification(`Blog ${event.title} was successfully deleted`, 5))
      }
    } catch (exception) {
      dispatch(createNotification(`Cannot delete blog ${event.title}`, 5))
    }
  }

  const createNewBlog = async (event) => {
    try {
      const createdBlog = await blogService.create(event)

      createdBlog.user = user
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(createNotification(`a new ${event.title} by ${event.author}`, 5))
    } catch (exception) {
      dispatch(createNotification(`Cannot add blog ${event.title}`, 5))
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(BlogToUpdate)
      dispatch(createNotification(`Blog ${BlogToUpdate.title} was successfully updated`, 5))
      //Makes sure that there is user field after update
      //There is probably better way to do this
      updatedBlog.user = BlogToUpdate.user
      setBlogs(blogs.map((blog) => (blog.id !== BlogToUpdate.id ? blog : updatedBlog)))
    } catch (exception) {
      dispatch(createNotification(`Cannot update blog ${BlogToUpdate.title}`, 5))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && (
        <Togglable buttonLabel='log in' id='ToggleButton'>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout} type='submit'>
              logout
            </button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createNewBlog={createNewBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                user={user}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
