import React , { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const removeBlog = async (event) => {
    try {
      if (window.confirm(`Remove blog ${event.title} by ${event.author}`)) {
        blogService
          .remove(event.id)
        setSuccessMessage(
          `Blog ${event.title} was successfully deleted`
        )
        setBlogs(blogs.filter(blog => blog.id !== event.id))
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch(exception) {
      setErrorMessage(
        `Cannot delete blog ${event.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const createNewBlog = async (event) => {
    try {
      const createdBlog = await blogService
        .create(event)

      createdBlog.user = user
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setErrorMessage(null)
      setSuccessMessage(`a new ${event.title} by ${event.author}`)
    } catch(exception) {
      setSuccessMessage(null)
      setErrorMessage(`Cannot add blog ${event.title}`)
    }
    setTimeout(() => {
      setErrorMessage(null)
      setSuccessMessage(null)
    }, 5000)
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(BlogToUpdate)
      setSuccessMessage(
        `Blog ${BlogToUpdate.title} was successfully updated`
      )
      //Makes sure that there is user field after update
      //There is probably better way to do this
      updatedBlog.user = BlogToUpdate.user
      setBlogs(blogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot update blog ${BlogToUpdate.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in <button onClick={handleLogout} type="submit">logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createNewBlog={createNewBlog}/>
          </Togglable>
          {blogs.sort((a , b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
          )}
        </div>
      }
    </div>
  )
}

export default App