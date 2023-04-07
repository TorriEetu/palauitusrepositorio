import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const dispatch = useDispatch()
  const blog = props.blog
  const [visible, setVisible] = useState(false)
  const visibilityToggle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const upvote = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      dispatch(voteBlog(updatedBlog))
      dispatch(createNotification(`Blog ${updatedBlog.title} was successfully updated`, 5))
    } catch (exception) {
      dispatch(createNotification(`Cannot update blog ${updatedBlog.title}`, 5))
    }
  }

  const remove = () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(deleteBlog(blog))
        dispatch(createNotification(`Blog ${blog.title} was successfully deleted`, 5))
      }
    } catch (exception) {
      dispatch(createNotification(`Cannot delete blog ${blog.title}`, 5))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  console.log(blog)
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={visibilityToggle}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={upvote}>like</button>{' '}
        </p>
        {blog.user && <p>{blog.user.username}</p>}
        {blog.user.name === props.user.name && (
          <button id='delete-btn' onClick={remove}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
