import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, voteBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useNavigate, useParams } from 'react-router-dom'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id))
  const user = useSelector((state) => state.login)

  if (!blog) {
    return null
  }

  const upvote = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    console.log(updatedBlog)
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
        navigate('/')
      }
    } catch (exception) {
      dispatch(createNotification(`Cannot delete blog ${blog.title}`, 5))
    }
  }

  return (
    <div>
      <div>
        {blog.title} {blog.author}{' '}
      </div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes} <button onClick={upvote}>like</button>{' '}
      </p>
      {blog.user && <p>added by {blog.user.username}</p>}
      {blog.user.name === user.name && (
        <button id='delete-btn' onClick={remove}>
          delete
        </button>
      )}
    </div>
  )
}

export default Blog
