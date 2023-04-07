import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { authorChange, titleChange, urlChange } from '../reducers/blogFormReducer'
import { createNotification } from '../reducers/notificationReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const title = useSelector((state) => state.form.title)
  const author = useSelector((state) => state.form.author)
  const url = useSelector((state) => state.form.url)

  const handleTitleChange = (event) => {
    dispatch(titleChange(event.target.value))
  }
  const handleAuthorChange = (event) => {
    dispatch(authorChange(event.target.value))
  }
  const handleUrlChange = (event) => {
    dispatch(urlChange(event.target.value))
  }

  const addBlog = (event) => {
    event.preventDefault()
    try {
      const createNewBlog = {
        title: title,
        author: author,
        url: url,
      }
      dispatch(createBlog(createNewBlog))
      dispatch(createNotification(`a new ${event.title} by ${event.author}`, 5))
    } catch (exception) {
      dispatch(createNotification(`Cannot add blog ${event.title}`, 5))
    }
    blogFormRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <div>
          Title: <input id='title' onChange={handleTitleChange} />
        </div>
        <div>
          Author: <input id='author' onChange={handleAuthorChange} />
        </div>
        <div>
          Url: <input id='url' onChange={handleUrlChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </div>
    </form>
  )
}

export default BlogForm
