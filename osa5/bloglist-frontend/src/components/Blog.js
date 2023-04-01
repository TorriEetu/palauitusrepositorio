import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = (props) => {
  const blog = props.blog
  const [, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const visibilityToggle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const upvote = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const remove = () => {
    props.removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonLabel = visible ? 'hide' : 'view'
  console.log(blog.user.name)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={visibilityToggle}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={upvote}>like</button> </p>
        <p>{blog.user.username}</p>
        <button onClick={remove}>Remove</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog